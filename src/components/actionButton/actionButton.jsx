import React from "react";

const ActionButton = ({ icon, label, campaign, onHandle }) => {
  return (
    <button onClick={e => onHandle(campaign, e)} data-testid="actionButton">
      {icon}
      <span>{label}</span>
    </button>
  );
};
export default ActionButton;
