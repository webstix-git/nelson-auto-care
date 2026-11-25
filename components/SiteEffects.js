"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PHONE_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>';

export default function SiteEffects({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [];

    const btn = document.querySelector(".menu-btn");
    const nav = document.getElementById("nav");
    let backdrop = document.querySelector(".nav-backdrop");
    let createdBackdrop = false;
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      backdrop.setAttribute("aria-hidden", "true");
      document.body.appendChild(backdrop);
      createdBackdrop = true;
    }
    const setNavOpen = (open) => {
      if (!nav || !btn) return;
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    };
    if (btn && nav) {
      const onMenu = (e) => {
        e.stopPropagation();
        setNavOpen(!nav.classList.contains("open"));
      };
      btn.addEventListener("click", onMenu);
      cleanups.push(() => btn.removeEventListener("click", onMenu));

      const onNavClick = (e) => {
        if (e.target.closest("a") && !e.target.closest(".drop-btn")) {
          setNavOpen(false);
          document.querySelectorAll(".nav-item.open").forEach((item) => {
            item.classList.remove("open");
            const d = item.querySelector(".drop-btn");
            if (d) d.setAttribute("aria-expanded", "false");
          });
        }
      };
      nav.addEventListener("click", onNavClick);
      cleanups.push(() => nav.removeEventListener("click", onNavClick));

      const onBackdrop = () => setNavOpen(false);
      backdrop.addEventListener("click", onBackdrop);
      cleanups.push(() => {
        backdrop.removeEventListener("click", onBackdrop);
        setNavOpen(false);
        if (createdBackdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      });
    }

    const dropHandlers = [];
    document.querySelectorAll(".nav-item.has-drop").forEach((item) => {
      const dropBtn = item.querySelector(".drop-btn");
      if (!dropBtn) return;
      const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const open = item.classList.toggle("open");
        dropBtn.setAttribute("aria-expanded", open ? "true" : "false");
        document.querySelectorAll(".nav-item.has-drop").forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            const od = other.querySelector(".drop-btn");
            if (od) od.setAttribute("aria-expanded", "false");
          }
        });
      };
      dropBtn.addEventListener("click", onDrop);
      dropHandlers.push([dropBtn, onDrop]);
    });
    cleanups.push(() => {
      dropHandlers.forEach(([el, fn]) => el.removeEventListener("click", fn));
    });

    const onDocClick = (e) => {
      if (!e.target.closest(".nav-item.has-drop")) {
        document.querySelectorAll(".nav-item.has-drop.open").forEach((item) => {
          item.classList.remove("open");
          const d = item.querySelector(".drop-btn");
          if (d) d.setAttribute("aria-expanded", "false");
        });
      }
    };
    document.addEventListener("click", onDocClick);
    cleanups.push(() => document.removeEventListener("click", onDocClick));

    const chrome = document.querySelector(".site-chrome");
    let scrollBtn = document.querySelector(".scroll-top");
    let createdScrollBtn = false;
    if (!scrollBtn) {
      scrollBtn = document.createElement("button");
      scrollBtn.type = "button";
      scrollBtn.className = "scroll-top";
      scrollBtn.setAttribute("aria-label", "Scroll to top");
      scrollBtn.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
      document.body.appendChild(scrollBtn);
      createdScrollBtn = true;
    }
    const onScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    scrollBtn.addEventListener("click", onScrollTop);
    cleanups.push(() => {
      scrollBtn.removeEventListener("click", onScrollTop);
      if (createdScrollBtn && scrollBtn.parentNode) scrollBtn.parentNode.removeChild(scrollBtn);
    });

    let scrolled = false;
    function setChromeH() {
      if (!chrome || scrolled) return;
      document.documentElement.style.setProperty("--chrome-h", chrome.offsetHeight + "px");
    }
    function onScroll() {
      const y = window.scrollY || 0;
      if (!scrolled && y > 60) scrolled = true;
      else if (scrolled && y < 20) scrolled = false;
      if (chrome) chrome.classList.toggle("is-scrolled", scrolled);
      if (!scrolled) setChromeH();
      scrollBtn.classList.toggle("show", y > 400);
    }
    const onResize = () => {
      if (!scrolled) setChromeH();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    setChromeH();
    onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });

    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(new Date());
      const d = {};
      parts.forEach((p) => {
        d[p.type] = p.value;
      });
      const mins = (parseInt(d.hour, 10) % 24) * 60 + parseInt(d.minute, 10);
      const wk = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(d.weekday) > -1;
      const open = wk && mins >= 480 && mins < 1020;
      document.querySelectorAll(".status").forEach((s) => {
        s.classList.toggle("open", open);
        const t = s.querySelector(".txt");
        if (t)
          t.textContent = open
            ? "Open Now - Closes 5:00 PM"
            : "Closed Now - Open Mon-Fri 8 AM-5 PM";
      });
      const map = { Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat", Sun: "sun" };
      const row = document.querySelector('[data-day="' + map[d.weekday] + '"]');
      if (row) row.classList.add("today");
    } catch (e) {}

    document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
      if (a.querySelector("svg")) return;
      if (a.closest(".foot-contact,.info-list,.topbar,.callbar")) return;
      a.insertAdjacentHTML("afterbegin", PHONE_SVG);
      a.classList.add("tel-ic");
    });

    const statNums = document.querySelectorAll(".stat b[data-count]");
    if (statNums.length) {
      const statsSection = statNums[0].closest("section") || statNums[0].parentElement;
      let statsDone = false;
      function runStats() {
        if (statsDone) return;
        statsDone = true;
        statNums.forEach((el) => {
          const target = parseInt(el.getAttribute("data-count"), 10) || 0;
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = target === 0 ? 400 : 1400;
          let start = null;
          function frame(now) {
            if (start === null) start = now;
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(frame);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(frame);
        });
      }
      if ("IntersectionObserver" in window) {
        const statsIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                runStats();
                statsIo.disconnect();
              }
            });
          },
          { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
        );
        statsIo.observe(statsSection);
        cleanups.push(() => statsIo.disconnect());
      } else {
        runStats();
      }
    }

    const form = document.getElementById("contact-form");
    if (form) {
      const err = document.getElementById("form-error");
      const required = ["name", "phone", "email", "vehicle", "service"];
      function clearErrors() {
        form.querySelectorAll(".field.is-invalid").forEach((el) => el.classList.remove("is-invalid"));
        if (err) err.classList.remove("show");
      }
      const fieldListeners = [];
      required.forEach((name) => {
        const input = form.elements[name];
        if (!input) return;
        const onInput = () => {
          const field = input.closest(".field");
          if (field && input.value.toString().trim()) field.classList.remove("is-invalid");
          if (form.querySelectorAll(".field.is-invalid").length === 0 && err) err.classList.remove("show");
        };
        input.addEventListener("input", onInput);
        input.addEventListener("change", onInput);
        fieldListeners.push([input, onInput]);
      });
      const onSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        const invalid = [];
        required.forEach((name) => {
          const input = form.elements[name];
          if (!input) return;
          const val = (input.value || "").toString().trim();
          if (!val) {
            const field = input.closest(".field");
            if (field) field.classList.add("is-invalid");
            invalid.push(input);
          } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            const field = input.closest(".field");
            if (field) field.classList.add("is-invalid");
            invalid.push(input);
          }
        });
        if (invalid.length) {
          if (err) {
            err.textContent = invalid.some((el) => el.name === "email" && el.value.trim())
              ? "Please Fill In All Required Fields And Enter A Valid Email."
              : "Please Fill In All Required Fields.";
            err.classList.add("show");
          }
          invalid[0].focus();
          return;
        }
        window.location.href = "/thank-you";
      };
      form.addEventListener("submit", onSubmit);
      cleanups.push(() => {
        form.removeEventListener("submit", onSubmit);
        fieldListeners.forEach(([el, fn]) => {
          el.removeEventListener("input", fn);
          el.removeEventListener("change", fn);
        });
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return children;
}
