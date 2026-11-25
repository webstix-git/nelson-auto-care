import { routes } from "@/lib/routes";
import { PhoneIcon, MailIcon } from "./Icons";

export default function Callbar() {
  return (
    <div className="callbar">
      <a href="tel:+16085191437">
        <PhoneIcon />
        Call Now
      </a>
      <a href={routes.contact}>
        <MailIcon />
        Request Service
      </a>
    </div>
  );
}
