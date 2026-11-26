(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');
    });
    nav.addEventListener('click',function(e){
      if(e.target.closest('a') && !e.target.closest('.drop-btn')){
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        document.querySelectorAll('.nav-item.open').forEach(function(item){
          item.classList.remove('open');
          var d=item.querySelector('.drop-btn');if(d)d.setAttribute('aria-expanded','false');
        });
      }
    });
  }

  // Services dropdown toggle (needed on touch / mobile)
  document.querySelectorAll('.nav-item.has-drop').forEach(function(item){
    var dropBtn=item.querySelector('.drop-btn');
    if(!dropBtn)return;
    dropBtn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      var open=item.classList.toggle('open');
      dropBtn.setAttribute('aria-expanded',open?'true':'false');
      document.querySelectorAll('.nav-item.has-drop').forEach(function(other){
        if(other!==item){
          other.classList.remove('open');
          var od=other.querySelector('.drop-btn');if(od)od.setAttribute('aria-expanded','false');
        }
      });
    });
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.nav-item.has-drop')){
      document.querySelectorAll('.nav-item.has-drop.open').forEach(function(item){
        item.classList.remove('open');
        var d=item.querySelector('.drop-btn');if(d)d.setAttribute('aria-expanded','false');
      });
    }
  });

  // Sticky header shrink + scroll-to-top
  var chrome=document.querySelector('.site-chrome');
  var scrollBtn=document.createElement('button');
  scrollBtn.type='button';
  scrollBtn.className='scroll-top';
  scrollBtn.setAttribute('aria-label','Scroll to top');
  scrollBtn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  scrollBtn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  document.body.appendChild(scrollBtn);

  // Hysteresis avoids sticky-header shake when height/scale toggles near the threshold
  var scrolled=false;

  // Lock chrome height while at top so hero overlay padding doesn't jump when header shrinks
  function setChromeH(){
    if(!chrome||scrolled)return;
    document.documentElement.style.setProperty('--chrome-h',chrome.offsetHeight+'px');
  }
  function onScroll(){
    var y=window.scrollY||0;
    if(!scrolled && y>60)scrolled=true;
    else if(scrolled && y<20)scrolled=false;
    if(chrome)chrome.classList.toggle('is-scrolled',scrolled);
    if(!scrolled)setChromeH();
    scrollBtn.classList.toggle('show',y>400);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',function(){if(!scrolled)setChromeH();},{passive:true});
  setChromeH();
  onScroll();

  // Open/closed status (Mon-Fri 8:00-17:00, Central Time)
  try{
    var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var d={};parts.forEach(function(p){d[p.type]=p.value});
    var mins=(parseInt(d.hour,10)%24)*60+parseInt(d.minute,10);
    var wk=['Mon','Tue','Wed','Thu','Fri'].indexOf(d.weekday)>-1;
    var open=wk&&mins>=480&&mins<1020;
    document.querySelectorAll('.status').forEach(function(s){
      s.classList.toggle('open',open);
      var t=s.querySelector('.txt');if(t)t.textContent=open?'Open Now - Closes 5:00 PM':'Closed Now - Open Mon-Fri 8 AM-5 PM';
    });
    var map={Mon:'mon',Tue:'tue',Wed:'wed',Thu:'thu',Fri:'fri',Sat:'sat',Sun:'sun'};
    var row=document.querySelector('[data-day="'+map[d.weekday]+'"]');if(row)row.classList.add('today');
  }catch(e){}

  // Add phone icon to tel links that don't already show one
  var phoneSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>';
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    if(a.querySelector('svg'))return;
    if(a.closest('.foot-contact,.info-list,.topbar,.callbar'))return;
    a.insertAdjacentHTML('afterbegin',phoneSvg);
    a.classList.add('tel-ic');
  });

  // About page stats: count up when section scrolls into view
  var statNums=document.querySelectorAll('.stat b[data-count]');
  if(statNums.length){
    var statsSection=statNums[0].closest('section')||statNums[0].parentElement;
    var statsDone=false;
    function runStats(){
      if(statsDone)return;
      statsDone=true;
      statNums.forEach(function(el){
        var target=parseInt(el.getAttribute('data-count'),10)||0;
        var suffix=el.getAttribute('data-suffix')||'';
        var duration=target===0?400:1400;
        var start=null;
        function frame(now){
          if(start===null)start=now;
          var t=Math.min(1,(now-start)/duration);
          var eased=1-Math.pow(1-t,3);
          el.textContent=Math.round(target*eased)+suffix;
          if(t<1)requestAnimationFrame(frame);
          else el.textContent=target+suffix;
        }
        requestAnimationFrame(frame);
      });
    }
    if('IntersectionObserver' in window){
      var statsIo=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            runStats();
            statsIo.disconnect();
          }
        });
      },{threshold:0.4,rootMargin:'0px 0px -10% 0px'});
      statsIo.observe(statsSection);
    }else{
      runStats();
    }
  }

  // Contact form validation + redirect to thank-you
  var form=document.getElementById('contact-form');
  if(form){
    var err=document.getElementById('form-error');
    var required=['name','phone','email','vehicle','service'];
    function clearErrors(){
      form.querySelectorAll('.field.is-invalid').forEach(function(el){el.classList.remove('is-invalid')});
      if(err)err.classList.remove('show');
    }
    required.forEach(function(name){
      var input=form.elements[name];
      if(!input)return;
      input.addEventListener('input',function(){
        var field=input.closest('.field');
        if(field && input.value.toString().trim())field.classList.remove('is-invalid');
        if(form.querySelectorAll('.field.is-invalid').length===0 && err)err.classList.remove('show');
      });
      input.addEventListener('change',function(){
        var field=input.closest('.field');
        if(field && input.value.toString().trim())field.classList.remove('is-invalid');
        if(form.querySelectorAll('.field.is-invalid').length===0 && err)err.classList.remove('show');
      });
    });
    form.addEventListener('submit',function(e){
      e.preventDefault();
      clearErrors();
      var invalid=[];
      required.forEach(function(name){
        var input=form.elements[name];
        if(!input)return;
        var val=(input.value||'').toString().trim();
        if(!val){
          var field=input.closest('.field');
          if(field)field.classList.add('is-invalid');
          invalid.push(input);
        }else if(name==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){
          var field=input.closest('.field');
          if(field)field.classList.add('is-invalid');
          invalid.push(input);
        }
      });
      if(invalid.length){
        if(err){
          err.textContent=invalid.some(function(el){return el.name==='email' && el.value.trim()})
            ?'Please enter a valid email address.'
            :'Please complete the required fields so we can get back to you: Name, Phone number, Vehicle and service needed. The message field is optional.';
          err.classList.add('show');
        }
        invalid[0].focus();
        return;
      }
      window.location.href='thank-you.html';
    });
  }
})();
