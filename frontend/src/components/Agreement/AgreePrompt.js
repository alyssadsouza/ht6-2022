import "./AgreePrompt.css";

function AgreePrompt(props) {
  const { website, pushWhitelist, pushBlacklist } =
    props;

  return (
    <div className="AgreePrompt">
      <h3>Does this sound good to you?</h3>
      <div className="agree-prompt flex-row">
        <button onClick={() => pushBlacklist(website)} className="btn cancel-btn">
          No, go back
        </button>
        <button onClick={() => pushWhitelist(website)} className="btn agree-btn">
          Yup!
        </button>
      </div>
    </div>
  );
}

export default AgreePrompt;
