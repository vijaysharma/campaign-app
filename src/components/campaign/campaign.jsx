import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "./../actionButton/actionButton";
import { Modal, Button } from "react-bootstrap";
import {
  faPauseCircle,
  faComment,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import "./campaign.css";
const Campaign = ({
  campaign,
  onPause,
  onToggleComment,
  onComment,
  onRename,
  onDelete,
  onRenamed,
  onSelect,
  listNumber
}) => {
  const selectCampaign = campaign => {
    return campaign.selected === true
      ? "list-group-item campaign active"
      : "list-group-item campaign";
  };
  let createNewCommentRef;
  let createNewUserRef;
  return (
    <li
      data-testid="campaign"
      className={selectCampaign(campaign)}
      onClick={() => {
        onSelect(campaign);
      }}
    >
      <div className="campaign-details">
        <span className="campaign-list-number">{listNumber}</span>
        <div className="campaign-title">
          <h5>
            Campaign {campaign.id} -{" "}
            {!campaign.editing && <span>{campaign.title}</span>}
            {campaign.editing === true && (
              <span>
                <input
                  onBlur={event => onRenamed(campaign, event)}
                  type="text"
                  ref={ip => (campaign.inputRef = ip)}
                  placeholder={campaign.title}
                />
              </span>
            )}
          </h5>
          <span className="camapaign-list-created">
            Created at{" "}
            {campaign.history.filter(c => c.title === "Created")[0]["on"]}
          </span>
        </div>
      </div>
      <div className="campaign-actions">
        <ActionButton
          label={"Pause"}
          onHandle={onPause}
          campaign={campaign}
          icon={<FontAwesomeIcon icon={faPauseCircle} />}
        />
        <ActionButton
          label={"Comment"}
          onHandle={onToggleComment}
          campaign={campaign}
          icon={<FontAwesomeIcon icon={faComment} />}
        />
        <ActionButton
          label={"Rename"}
          onHandle={onRename}
          campaign={campaign}
          icon={<FontAwesomeIcon icon={faEdit} />}
        />
        <ActionButton
          label={"Delete"}
          onHandle={onDelete}
          campaign={campaign}
          icon={<FontAwesomeIcon icon={faTrash} />}
        />
      </div>

      <Modal
        show={campaign.onCommented}
        onHide={() => onToggleComment(campaign)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <input
                type="text"
                className="form-control"
                id="comment"
                aria-describedby="comment"
                placeholder="Your comments"
                ref={ip => (createNewCommentRef = ip)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name (Optional)</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="name"
                placeholder="Anonymous"
                ref={ip => (createNewUserRef = ip)}
              ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onToggleComment(campaign)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              onComment(campaign, createNewCommentRef, createNewUserRef)
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </li>
  );
};

export default Campaign;
