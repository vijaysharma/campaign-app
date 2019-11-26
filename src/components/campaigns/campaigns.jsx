import React from "react";
import Campaign from "./../campaign/campaign";
const Campaigns = ({
  campaigns,
  indexOfFirstCampaign,
  onSelect,
  onPause,
  onComment,
  onToggleComment,
  onRename,
  onDelete,
  onRenamed
}) => {
  return (
    <>
      <ul className="list-group">
        {campaigns.map((campaign, i) => (
          <Campaign
            key={campaign.id}
            listNumber={indexOfFirstCampaign + i + 1}
            campaign={campaign}
            onSelect={onSelect}
            onPause={onPause}
            onComment={onComment}
            onToggleComment={onToggleComment}
            onRename={onRename}
            onDelete={onDelete}
            onRenamed={onRenamed}
          ></Campaign>
        ))}
      </ul>
    </>
  );
};

export default Campaigns;
