import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
library.add(fas, far, fab);

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon="fas fa-bars" />
      </button>

      <nav className={`sidebar ${open ? "show-nav" : "hide-nav"}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <FontAwesomeIcon icon="fas fa-circle-xmark" />
        </button>
        <div className="nav-list">
          <Link className="nav-link" to="/" onClick={()=>setOpen(false)}>
            Home
          </Link>
          <Link className="nav-link" to="/insight" onClick={()=>setOpen(false)}>
            Insights Panel
          </Link>       
          <Link className="nav-link" to="/explore" onClick={()=>setOpen(false)}>
            Explore Countries
          </Link>
          <Link className="nav-link" to="/facts" onClick={()=>setOpen(false)}>
            Fun Facts
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
