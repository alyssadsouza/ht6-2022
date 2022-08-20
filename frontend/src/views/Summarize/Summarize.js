import { useEffect, useState } from 'react';
import AgreeMessage from "../../components/Agreement/AgreeMessage";
import AgreePrompt from "../../components/Agreement/AgreePrompt";
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions';
import './Summarize.css';

function Summarize() {
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
