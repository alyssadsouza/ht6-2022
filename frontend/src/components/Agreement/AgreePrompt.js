import './AgreePrompt.css';

function AgreePrompt({website, userData, setUserData}) {
  
  const blacklist = () => {
    const newData = {...userData};
    newData?.blacklisted.push(website);
    setUserData(newData);
  };

  const whitelist = () => {
    const newData = {...userData};
    newData?.whitelisted.push(website);
    setUserData(newData);
  };

  return(
     <div className="AgreePrompt">
        <h3>Does this sound good to you?</h3>
        <div className="agree-prompt flex-row">
          <button onClick={blacklist} className="btn cancel-btn">No, go back</button>
          <button onClick={whitelist} className="btn agree-btn">Yup!</button>
        </div>
     </div>
     );
}

export default AgreePrompt;
