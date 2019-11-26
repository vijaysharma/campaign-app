import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faPauseCircle,
  faComment,
  faEdit,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import "./campaignHistory.css";
const CampaignHistory = ({ campaign }) => {
  return (
    <div className="campaign-history">
      <h5>
        <FontAwesomeIcon icon={faHistory}></FontAwesomeIcon>History
      </h5>
      <div className="campaign-history-timeline">
        <b>{campaign.title}</b>
        <ul>
          {campaign.history.map((hs, index) => {
            return (
              <li key={index}>
                {hs.title === "Created" && (
                  <span>
                    <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                    Campaign <b>created</b>
                  </span>
                )}
                {hs.title === "Paused" && (
                  <span>
                    <FontAwesomeIcon
                      icon={faPauseCircle}
                      style={{ color: "#ffcc00" }}
                    ></FontAwesomeIcon>
                    Campaign <b>{hs.title}</b>
                  </span>
                )}
                {hs.title === "Comment" && (
                  <span>
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#4a90e9" }}
                    ></FontAwesomeIcon>
                    <b>{hs.title}</b> Added
                  </span>
                )}
                {hs.title === "Renamed" && (
                  <span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ color: "#4a90e9" }}
                    ></FontAwesomeIcon>
                    Campaign <b>{hs.title}</b>
                  </span>
                )}

                <p>
                  by <span className="user">{hs.by}</span>
                </p>
                {hs.title === "Comment" && <b>"{hs.comment}"</b>}
                {hs.title === "Renamed" && (
                  <span>
                    <s>{hs.oldCampaignTitle}</s> <b>{hs.newCampaignTitle}</b>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CampaignHistory;
