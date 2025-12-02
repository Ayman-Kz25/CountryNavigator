import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

export default function FactCard({ country, fact, flag }) {
  return (
    <div className="fact-card">
        <img src={flag} alt={`${country} flag`} className="fact-flag" />
      <h3 className="fact-country">
        {"  "}{country}</h3>
      <p className="fact-text">
        <FontAwesomeIcon className="icon" icon="fas fa-star" />
        {"  "}{fact}</p>
    </div>
  );
}
