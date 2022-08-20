import { useState } from "react";
import './TermsAndConditions.css';

function TermsAndConditions({ content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="TermsAndConditions">
      {!content?.summary?.length ? (
        <h3>
          There doesn't seem to be any Terms of Service on this website...
        </h3>
      ) : (
        <>
          <div className="flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              )}
            </svg>
            <h2>
              By using this company's services, you agree to the following...
            </h2>
          </div>
          {open && (
            <div>
              {content?.summary?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          <p>
            Read more details in their{" "}
            <a href={content?.url}>Terms of Service</a>.
          </p>
        </>
      )}
    </div>
  );
}

export default TermsAndConditions;
