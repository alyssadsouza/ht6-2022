import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";

const Layout = () => {
  return (
    <div className="App flex-col">
      <h1 className="App-title">Terms & Procrastination</h1>
      <div className="App-content flex-col">
        <Outlet />
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
