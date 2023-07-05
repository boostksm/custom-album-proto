import { Link } from "react-router-dom";

const PageNav = () => {
  return (
    <nav className="pageNav">
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/album/corner-records/tunnel">album</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
