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
  const [websiteData, setWebsiteData] = useState({});

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
      fetch("http://localhost:5000/get-summary?url=" + privacy).then((data) => data.json()).then((json_data) => {
        console.log(json_data)
        setWebsiteData(prev => ({...prev,
          url: privacy,
          privacy: {
            url: privacy,
            summary: json_data.summary
          }
        }))
      })
    }
  }, [privacy]);

  useEffect(() => {
    if (terms) {
      // make fetch call to api to get current website data
      fetch("http://localhost:5000/get-summary?url=" + terms).then((data) => data.json()).then((json_data) => {
        console.log(json_data)
        setWebsiteData(prev => ({...prev,
          url: terms,
          terms: {
            url: terms,
            summary: json_data.summary
          }
        }))
      })
    }
  }, [terms]);

  // const websiteData = {
  //   url: "",
  //   privacy: {
  //     url: "",
  //     summary: ["text", "privacy", "data", "data", "data"]
  //   },
  //   terms: {
  //     url: "",
  //     summary: ["terms", "and", "conditions", "terms", "and", "conditions"]
  //   }
  // };

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
