import { routes } from "@/lib/routes";
import { FootPhoneIcon, FootPinIcon, FootClockIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-hazard" aria-hidden="true">
        <div className="foot-hazard-stripes"></div>
      </div>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/images/logo.png" alt={"Nelson\u2019s Auto Care"} width="141" height="47" />
            <p className="tagline">Service is the Difference.</p>
            <p>Quality auto repair and maintenance services in La Crosse, WI.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="foot-links">
              <li>
                <a href={routes.home}>Home</a>
              </li>
              <li>
                <a href={routes.about}>About Us</a>
              </li>
              <li>
                <a href={routes.services}>Services</a>
              </li>
              <li>
                <a href={routes.brakeService}>Brake Service</a>
              </li>
              <li>
                <a href={routes.contact}>Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Our Services</h4>
            <ul className="foot-links">
              <li>
                <a href={`${routes.services}#maintenance`}>Routine Maintenance</a>
              </li>
              <li>
                <a href={`${routes.services}#brakes`}>Brake Services</a>
              </li>
              <li>
                <a href={`${routes.services}#suspension`}>Suspension Services</a>
              </li>
              <li>
                <a href={`${routes.services}#alignments`}>Wheel Alignments</a>
              </li>
              <li>
                <a href={`${routes.services}#inspections`}>Pre-Purchase Inspections</a>
              </li>
              <li>
                <a href={`${routes.services}#state`}>State Inspections</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="foot-contact">
              <li>
                <span className="ic" aria-hidden="true">
                  <FootPhoneIcon />
                </span>
                <div>
                  <a href="tel:+16085191437">608-519-1437</a>
                </div>
              </li>
              <li>
                <span className="ic" aria-hidden="true">
                  <FootPinIcon />
                </span>
                <div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=4131+Mormon+Coulee+Ct+La+Crosse+WI+54601"
                    target="_blank"
                    rel="noopener"
                  >
                    4131 Mormon Coulee Ct.
                    <br />
                    La Crosse, WI 54601
                  </a>
                </div>
              </li>
              <li>
                <span className="ic" aria-hidden="true">
                  <FootClockIcon />
                </span>
                <div>
                  Mon - Fri: 8AM - 5PM
                  <br />
                  Sat - Sun: Closed
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>
            © 2026 Nelson Auto Care. All rights reserved.
            <span className="sep">|</span>
            <a href={routes.siteMap}>Site Map</a>
            <span className="sep">|</span>
            <a href={routes.privacyPolicy}>Privacy Policy</a>
            <span className="sep">|</span>
            <a href={routes.aiPolicy}>AI Policy</a>
            <span className="sep">|</span>
            <a href={routes.aiReadiness}>AI Readiness Service Index</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
