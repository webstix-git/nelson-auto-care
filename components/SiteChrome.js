"use client";

import { usePathname } from "next/navigation";
import { navItems, routes } from "@/lib/routes";
import { PhoneIcon } from "./Icons";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=4131+Mormon+Coulee+Ct+La+Crosse+WI+54601";

export default function SiteChrome() {
  const pathname = usePathname();

  function isCurrent(key, href) {
    if (key === "home") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="site-chrome">
      <div className="topbar">
        <div className="container">
          <div className="group topbar-end">
            <a href={MAP_URL} target="_blank" rel="noopener">
              Get Directions
            </a>
            <span className="pipe" aria-hidden="true">
              |
            </span>
            <span className="status">
              <span className="dot"></span>
              <span className="txt">Closed Now - Open Mon-Fri 8 AM-5 PM</span>
            </span>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container">
          <a className="brand" href={routes.home} aria-label="Nelson's Auto Care home">
            <img src="/images/logo.png" alt={"Nelson\u2019s Auto Care"} width="180" height="60" />
          </a>
          <button className="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav">
            <span></span>
          </button>
          <nav className="nav" id="nav" aria-label="Main">
            {navItems.map((item) => {
              if (item.drop) {
                return (
                  <div className="nav-item has-drop" key={item.key}>
                    <a
                      className="link"
                      href={item.href}
                      {...(isCurrent(item.key, item.href) ? { "aria-current": "page" } : {})}
                    >
                      {item.label}
                    </a>
                    <button
                      type="button"
                      className="drop-btn"
                      aria-label="Services submenu"
                      aria-expanded="false"
                      aria-controls="services-drop"
                    ></button>
                    <ul className="drop-menu" id="services-drop">
                      {item.drop.map((d) => (
                        <li key={d.href}>
                          <a href={d.href}>{d.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <a
                  key={item.key}
                  className="link"
                  href={item.href}
                  {...(isCurrent(item.key, item.href) ? { "aria-current": "page" } : {})}
                >
                  {item.label}
                </a>
              );
            })}
            <a className="btn sm" href="tel:+16085191437">
              <PhoneIcon />
              Call 608-519-1437
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}
