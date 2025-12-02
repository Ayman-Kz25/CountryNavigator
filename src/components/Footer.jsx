import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import BackToTop from "./BackToTop";

function Footer() {
  return (
    <footer className="footer">
      <BackToTop />
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Country Navigator - Built with{" "}
        <FontAwesomeIcon icon="fab fa-react" /> By Ayman Kz
      </p>
    </footer>
  );
}

export default Footer;
