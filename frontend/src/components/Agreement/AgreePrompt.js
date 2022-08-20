function AgreePrompt({website, userData, setUserData}) {
  
  const blacklist = () => {
    const newData = {...userData};
    newData?.blacklist.push(website);
    setUserData(newData);
  };

  const whitelist = () => {
    const newData = {...userData};
    newData?.whitelist.push(website);
    setUserData(newData);
  };

  return(
     <div className="AgreePrompt">
        <h3>Does this sound good to you?</h3>
        <div className="flex-row">
          <button onClick={blacklist} className="cancel-button">No, go back</button>
          <button onClick={whitelist} className="cancel-button">Yup!</button>
        </div>
     </div>
     );
}

export default AgreePrompt;
