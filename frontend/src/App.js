/*global chrome*/
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from './views/Layout';
import Summarize from './views/Summarize/Summarize';
import Whitelist from './views/Whitelist';
import Blacklist from './views/Blacklist';
import Login from "./views/Login";
import Register from "./views/Register";
import './App.css';

function App() {
  const userID = 0;
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Summarize userID={userID} />} />
          <Route path="whitelist" element={<Whitelist userID={userID} />} />
          <Route path="blacklist" element={<Blacklist userID={userID} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

export default App;
