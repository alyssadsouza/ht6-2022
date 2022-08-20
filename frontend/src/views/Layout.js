import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  return (
    <div className="App flex-col">
      <div className="App-content flex-col">
        <Outlet />
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
