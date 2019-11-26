import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBars } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
const NavBar = props => {
  let createNewTitleRef;
  let createNewUserRef;
  return (
    <React.Fragment>
      <div className="navbar-sticky">
        <nav className="navbar navbar-light bg-blue-grey">
          <span className="navbar-brand">
            <FontAwesomeIcon className="tx-blue" icon={faEnvelope} />
            <span className="ml-10">All Campaigns</span>
          </span>
        </nav>
        <nav className="navbar navbar-expand-lg create-new-bar navbar-stuck-menu">
          <FontAwesomeIcon icon={faBars} />
          <span className="ml-20">Campaign List</span>
          <button
            onClick={() => props.onToggle()}
            className="btn btn-primary btn-sm ml-20 no-wrap"
          >
            + Create new
          </button>
        </nav>
      </div>

      <Modal show={props.modalShow} onHide={props.onToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Create a campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="campaignName">Campaign name</label>
              <input
                type="text"
                className="form-control"
                id="campaignName"
                aria-describedby="campaignName"
                placeholder="Name your campaign"
                ref={ip => (createNewTitleRef = ip)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="userName">Name (Optional)</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                aria-describedby="userName"
                placeholder="Your name"
                ref={ip => (createNewUserRef = ip)}
              ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onToggle}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => props.onCreate(createNewTitleRef, createNewUserRef)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default NavBar;
