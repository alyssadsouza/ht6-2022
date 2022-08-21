/*global chrome*/
import { useEffect, useState } from "react";
import AgreeMessage from "../../components/Agreement/AgreeMessage";
import AgreePrompt from "../../components/Agreement/AgreePrompt";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import "./Summarize.css";

import { getPrivacyURL, getTermsURL } from "../../content_scripts/getURL";

export async function getUser(userID, setUserData) {
  try {
    const data = await fetch(`/api/users/${userID}`);
    const userData = await data.json();
    setUserData(userData);
  } catch (err) {
    console.debug("Error fetching user:", err);
  }
}

export async function pushWhitelist(url) {
  return fetch(`/api/users/whitelist/${userID}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => {
      console.debug("PUT user success: ", res);
      getUser(userID, setUserData);
      return res;
    })
    .catch((err) => {
      console.warn("Error submitting PUT request for user: ", err);
      return err;
    });
}

export async function pullWhitelist(url) {
  return fetch(`/api/users/whitelist/${userID}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => {
      console.debug("DELETE whitelist success: ", res);
      getUser(userID, setUserData);
      return res;
    })
    .catch((err) => {
      console.warn("Error submitting DELETE request for whitelist: ", err);
      return err;
    });
}

export async function pushBlacklist(url) {
  return fetch(`/api/users/blacklist/${userID}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => {
      console.debug("PUT user success: ", res);
      getUser(userID, setUserData);
      return res;
    })
    .catch((err) => {
      console.warn("Error submitting PUT request for user: ", err);
      return err;
    });
}

export async function pullBlacklist(url) {
  return fetch(`/api/users/blacklist/${userID}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then((res) => {
      console.debug("DELETE blacklist success: ", res);
      getUser(userID, setUserData);
      return res;
    })
    .catch((err) => {
      console.warn("Error submitting DELETE request for blacklist: ", err);
      return err;
    });
}

function Summarize({userID}) {
  const [userData, setUserData] = useState({});
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");

  useEffect(() => {
    getUser(userID, setUserData);
  }, []);

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
  };
  // console.debug('userData', userData);

  async function parseContent(parsingFunc, setter) {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      localStorage.setItem('current_website', tab[0].url);
      chrome.scripting.executeScript(
        {
          target: { tabId: tab[0].id },
          func: parsingFunc,
        },
        (func) => setter(func[0].result)
      );
    });
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
      summary: ["text", "privacy", "data", "data", "data"],
    },
    terms: {
      url: "",
      summary: ["terms", "and", "conditions", "terms", "and", "conditions"],
    },
  };

  return (
    <div className="Summarize flex-col">
      {alreadyVisited() && <AgreeMessage blacklisted={isBlacklisted()} />}
      <PrivacyPolicy content={websiteData?.privacy} />
      <TermsAndConditions content={websiteData?.terms} />
      {!alreadyVisited() && (privacy || terms) (
        <AgreePrompt
          website={localStorage.getItem('current_website')}
          pushWhitelist={pushWhitelist}
          pushBlacklist={pushBlacklist}
        />
      )}
    </div>
  );
}

export default Summarize;
