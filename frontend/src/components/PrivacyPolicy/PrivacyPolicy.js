import DataCollected from "./DataCollected";
import './PrivacyPolicy.css';

function PrivacyPolicy({ content }) {
  return (
    <div className="PrivacyPolicy">
      {!content?.summary?.length ? (
        <h3>There doesn't seem to be a Privacy Policy on this website...</h3>
      ) : (
        <>
          <h3>This website collects the following:</h3>
          <div className="data-tab flex-col">
            {content?.summary?.map((data) => (
              <DataCollected key={data} data={data} />
            ))}
          </div>
          <p>Read more details in their <a href={content?.url}>Privacy Policy</a>.</p>
        </>
      )}
    </div>
  );
}

export default PrivacyPolicy;
