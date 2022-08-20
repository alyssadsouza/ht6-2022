import './AgreeMessage.css';

function AgreeMessage({blacklisted}) {
  return (
    <div className="AgreeMessage">
      {blacklisted ? (
        <div className="disagree-msg">
          <h3>You have not approved this website's terms and conditions!</h3>
        </div>
      ) : (
        <div className="agree-msg">
          <h3>You have already approved this website's terms and conditions!</h3>
        </div>
      )}
    </div>
  );
}

export default AgreeMessage;
