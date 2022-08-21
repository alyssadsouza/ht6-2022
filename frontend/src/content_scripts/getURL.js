export const getURL = (urls) => {
  const ans = Array.from(document.querySelectorAll("a")).find((link) => {
    return urls.includes(link.innerHTML.toLowerCase());
  });
  console.debug("returning", ans?.href);
  return ans?.href;
};
// not being able to use getURL in these for some reason they show up as w in extension
export const getPrivacyURL = () => {
  // return getURL(['privacy policy', 'privacy']);
  const urls = ["privacy policy", "privacy"];
  const ans = Array.from(document.querySelectorAll("a")).find((link) => {
    return urls.includes(link.innerHTML.toLowerCase());
  });
  console.debug("returning", ans?.href);
  return ans?.href;
};

export const getTermsURL = () => {
  // return getURL(['terms of service', 'terms', 'terms and conditions']);
  const urls = ["github's terms of service","terms of service", "terms", "terms and conditions"];
  const ans = Array.from(document.querySelectorAll("a")).find((link) => {
    return urls.includes(link.innerHTML.toLowerCase());
  });
  console.debug("returning", ans?.href);
  return ans?.href;
};
