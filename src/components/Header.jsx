import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Navbar from "./Navbar.jsx";

function Header() {
  return (
    <div className="header-container">
      <div onClick={()=>location.reload()} className="logo">
        <FontAwesomeIcon icon="fas fa-globe" />
      </div>
      <h1 className="title">Country Navigator</h1>
      <Navbar />
    </div>
  );
}

export default Header;
