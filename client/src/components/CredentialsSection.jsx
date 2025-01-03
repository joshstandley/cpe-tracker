import React, { useState } from "react";
import "../styles/credentialsSection.css";

function CredentialsSection() {
  const [credentialType, setCredentialType] = useState("");
  const [credentials, setCredentials] = useState([]);

  const credentialOptions = ["CPA", "EA", "ABA"]; // Add more as needed

  const handleAddCredential = () => {
    if (credentialType && !credentials.includes(credentialType)) {
      setCredentials([...credentials, credentialType]);
      setCredentialType(""); // Clear the selection
    }
  };

  const handleRemoveCredential = (type) => {
    setCredentials(credentials.filter((cred) => cred !== type));
  };

  return (
    <div className="credentials-section">
      <h2>Manage Your Credentials</h2>
      <div className="add-credential">
        <select
          value={credentialType}
          onChange={(e) => setCredentialType(e.target.value)}
        >
          <option value="">Select a credential</option>
          {credentialOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleAddCredential}>Add Credential</button>
      </div>
      <ul className="credentials-list">
        {credentials.map((type, index) => (
          <li key={index}>
            {type}{" "}
            <button onClick={() => handleRemoveCredential(type)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CredentialsSection;
