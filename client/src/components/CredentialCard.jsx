import React, { useState } from "react";
import "../styles/credentialCard.css";

const CredentialCard = ({ credential }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="credential-card">
      <div className="card-header">
        <h3>{credential.name}</h3>
        <p>
          Completed: {credential.completedHours || 0} /{" "}
          {credential.requiredHours || "TBD"} hours
        </p>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                credential.completedHours
                  ? (credential.completedHours / credential.requiredHours) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
        <button onClick={toggleExpand}>
          {expanded ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {expanded && (
        <div className="card-details">
          {credential.cpeTypes && credential.cpeTypes.length > 0 ? (
            credential.cpeTypes.map((type) => (
              <div key={type.name} className="cpe-type-progress">
                <h4>{type.name}</h4>
                <p>
                  {type.completedHours || 0} / {type.requiredHours || "TBD"} hours
                </p>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        type.completedHours
                          ? (type.completedHours / type.requiredHours) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p>No CPE types logged yet. Add credits to get started!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CredentialCard;
