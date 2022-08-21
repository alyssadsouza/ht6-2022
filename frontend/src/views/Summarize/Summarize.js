/*global chrome*/
import { useEffect, useState } from 'react';
import AgreeMessage from "../../components/Agreement/AgreeMessage";
import AgreePrompt from "../../components/Agreement/AgreePrompt";
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions';
import './Summarize.css';

import { getPrivacyURL, getTermsURL } from '../../content_scripts/getURL';

function Summarize() {

  const [userData, setUserData] = useState({});
  const [privacy, setPrivacy] = useState('');
  const [terms, setTerms] = useState('');

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
  // console.debug('userData', userData);
  
  async function parseContent(parsingFunc, setter) {
  
    await chrome.tabs.query({active: true, currentWindow: true}, 
      (
        tab => {
          chrome.scripting.executeScript(
            {
              target: {tabId: tab[0].id},
              func: parsingFunc,
            },
            func => setter(func[0].result)
          )}
    ));
    
  }

  useEffect(() => {
    parseContent(getPrivacyURL, setPrivacy);
    parseContent(getTermsURL, setTerms);
  }, []);

  useEffect(() => {
    if (privacy) {
      // make fetch call to api to get current website data
    }
  }, [privacy]);

  useEffect(() => {
    if (terms) {
      // make fetch call to api to get current website data
    }
  }, [terms]);

  const websiteData = {
    url: "",
    privacy: {
      url: "",
      summary: ["text", "privacy", "data", "data", "data"]
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

  return (
    <div className="Summarize flex-col">
      {alreadyVisited() && (
        <AgreeMessage blacklisted={isBlacklisted()} />
      )}
      <PrivacyPolicy content={websiteData?.privacy} />
      <TermsAndConditions content={websiteData?.terms} />
      {!alreadyVisited() && (
        <AgreePrompt website={websiteData?.url} userData={userData} setUserData={setUserData} />
      )}
    </div>
  );
}

export default Summarize;
