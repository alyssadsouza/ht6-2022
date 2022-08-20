import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';

function Blacklist() {
  return (
    <div className="List Blacklist flex-col">
    <div className="List TitleSummary">
      <h3>Your Blacklisted Sites </h3>
      <b>These are the websites whose terms and conditions you have not agreed to</b>
    </div>
    <div className="List SitesContainer">
      <div className="List SiteNameContainer flex-row">
        <b>site name</b>
        <div className="List SiteNameContainerIcons flex-row">
          <div className="List searchIcon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
</div>
<div className="List whitelistIcon">
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
<div className="List removeIcon">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</div>
</div>
      </div>
    </div>
    <div className="List login">
      <Link to="/login">
    <b>Login</b>
    </Link>
    </div>
    </div>
  );
}

export default Blacklist;
