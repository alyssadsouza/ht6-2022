import { useEffect, useState } from 'react';
import AgreeMessage from "../components/Agreement/AgreeMessage";
import AgreePrompt from "../components/Agreement/AgreePrompt";
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../components/TermsAndConditions/TermsAndConditions';
import './List.css';

function Whitelist() {

  const websiteData = {
    url: "",
    privacy: {
      url: "",
      summary: ["text", "privacy"]
    },
    terms: {
      url: "",
      summary: ["terms", "and", "conditions", "terms", "and", "conditions"]
    }
  };

  const userApi = {
    whitelisted: ["google", "twitter"],
    blacklisted: ["meta", "facebook"],
  };

  const [userData, setUserData] = useState({});

  useEffect(() => setUserData(userApi), []);

  useEffect(() => {
    // update userApi
    // setUserData(userApi);
  }, [userData]);

  const alreadyVisited = () => {
    return (
      userData?.whitelisted?.includes(websiteData?.url) ||
      userData?.blacklisted?.includes(websiteData?.url)
    );
  };

  const isBlacklisted = () => {
    return userData?.blacklisted?.includes(websiteData?.url);
  }
  console.debug('userData', userData);


  return (
    <div className="List Whitelist flex-col">
    <div className="List TitleSummary">
      <h3>Your Whitelisted Sites </h3>
      <b>These are the websites whose terms and conditions you have agreed to</b>
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
<div className="removeIcon">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
<div className="blacklistIcon">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</div>
</div>
      </div>
    </div>
    </div>
  );
}

export default Whitelist;
