import { Outlet, Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Summarize</Link>
          </li>
          <li>
            <Link to="/whitelist">Whitelist</Link>
          </li>
          <li>
            <Link to="/blacklist">Blacklist</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Nav;
