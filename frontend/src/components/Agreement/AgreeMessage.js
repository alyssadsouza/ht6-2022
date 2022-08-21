import "./AgreeMessage.css";

function AgreeMessage({ blacklisted }) {
  return (
    <div className="AgreeMessage flex-row">
      {blacklisted ? (
        <div className="msg disagree-msg flex-col">
          <h4>You have not approved this website's terms and conditions!</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon cancel-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ) : (
        <div className="msg agree-msg flex-col">
          <h4>
            You have already approved this website's terms and conditions!
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon agree-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default AgreeMessage;
