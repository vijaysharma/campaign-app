import React, { useState } from "react";
import NavBar from "./components/navbar/navbar";
import Campaigns from "./components/campaigns/campaigns";
import CampaignHistory from "./components/campaignHistory/campaignHistory";
import Pagination from "./components/pagination/pagination";

const App = () => {
  const [createCampaign, setCreateCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Emails",
      history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }],
      selected: true
    },
    {
      id: 2,
      title: "Push Notifications",
      history: [{ title: "Created", on: "2:45 pm", by: "John" }]
    },
    {
      id: 3,
      title: "InApp Messages",
      history: [{ title: "Created", on: "2:43 pm", by: "Dave" }]
    },
    {
      id: 4,
      title: "Push",
      history: [{ title: "Created", on: "2:34 pm", by: "Smith" }]
    },
    {
      id: 5,
      title: "Emails",
      history: [{ title: "Created", on: "2:30 pm", by: "Jane" }]
    },
    {
      id: 6,
      title: "Emails",
      history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }]
    },
    {
      id: 7,
      title: "Push Notifications",
      history: [{ title: "Created", on: "2:45 pm", by: "John" }]
    },
    {
      id: 8,
      title: "InApp Messages",
      history: [{ title: "Created", on: "2:43 pm", by: "Dave" }]
    },
    {
      id: 9,
      title: "Push",
      history: [{ title: "Created", on: "2:34 pm", by: "Smith" }]
    },
    {
      id: 10,
      title: "Emails",
      history: [{ title: "Created", on: "2:30 pm", by: "Jane" }]
    },
    {
      id: 11,
      title: "Emails",
      history: [{ title: "Created", on: "2:54 pm", by: "Anonymous" }]
    },
    {
      id: 12,
      title: "Push Notifications",
      history: [{ title: "Created", on: "2:45 pm", by: "John" }]
    },
    {
      id: 13,
      title: "InApp Messages",
      history: [{ title: "Created", on: "2:43 pm", by: "Dave" }]
    },
    {
      id: 14,
      title: "Push",
      history: [{ title: "Created", on: "2:34 pm", by: "Smith" }]
    },
    {
      id: 15,
      title: "Emails",
      history: [{ title: "Created", on: "2:30 pm", by: "Jane" }]
    },
    {
      id: 16,
      title: "InApp Messages",
      history: [{ title: "Created", on: "2:43 pm", by: "Dave" }]
    },
    {
      id: 17,
      title: "Push",
      history: [{ title: "Created", on: "2:34 pm", by: "Smith" }]
    },
    {
      id: 18,
      title: "Emails",
      history: [{ title: "Created", on: "2:30 pm", by: "Jane" }]
    }
  ]);
  const [selectedCampaign, setSelectedCampaign] = useState({
    ...campaigns[0],
    selected: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(6);

  const getCampainFromState = (currentStateSampaigns, campaign) => {
    const localCampaigns = [...currentStateSampaigns];
    const index = localCampaigns.indexOf(campaign);
    return [localCampaigns, localCampaigns[index]];
  };
  const handlePause = campaign => {
    const [localCampaigns, currentCampaign] = getCampainFromState(
      campaigns,
      campaign
    );
    currentCampaign.history.push({
      title: "Paused",
      paused: true,
      by: "Anonymous"
    });
    setCampaigns(localCampaigns);
  };
  const handleComment = (campaign, inputCommentRef, inputUserRef) => {
    const [localCampaigns, currentCampaign] = getCampainFromState(
      campaigns,
      campaign
    );
    if (inputCommentRef.value.trim().length === 0) {
      inputCommentRef.style.border = "1px solid red";
      return false;
    }
    currentCampaign.history.push({
      title: "Comment",
      commented: true,
      comment: inputCommentRef.value,
      by:
        inputUserRef.value.trim().length > 0
          ? inputUserRef.value.trim()
          : "Anonymous"
    });
    currentCampaign.onCommented = !currentCampaign.onCommented;
    setCampaigns(localCampaigns);
  };
  const handleToggleComment = campaign => {
    const [localCampaigns, currentCampaign] = getCampainFromState(
      campaigns,
      campaign
    );
    currentCampaign.onCommented = !currentCampaign.onCommented;
    setCampaigns(localCampaigns);
  };
  const handleRename = campaign => {
    const [localCampaigns, currentCampaign] = getCampainFromState(
      campaigns,
      campaign
    );
    currentCampaign.editing = true;
    setCampaigns(localCampaigns);
    setTimeout(() => {
      campaign.inputRef.focus();
    }, 0);
  };
  const handleDelete = (campaign, e) => {
    e.stopPropagation();
    setCampaigns(campaigns.filter(c => c.id !== campaign.id));
  };
  const handleRenamed = (campaign, event) => {
    const [localCampaigns, currentCampaign] = getCampainFromState(
      campaigns,
      campaign
    );
    if (
      currentCampaign.title !== event.target.value.trim() &&
      event.target.value.trim().length > 0
    ) {
      currentCampaign.history.push({
        title: "Renamed",
        renamed: true,
        oldCampaignTitle: currentCampaign.title,
        newCampaignTitle: event.target.value.trim(),
        by: "Anonymous"
      });
    }
    currentCampaign.title =
      event.target.value.trim().length > 0
        ? event.target.value.trim()
        : currentCampaign.title;
    currentCampaign.editing = false;

    setCampaigns(localCampaigns);
  };
  const handleSelect = campaign => {
    const [localCampaigns, currentCampaign] = getCampainFromState(
      campaigns,
      campaign
    );
    localCampaigns.map(c => (c["selected"] = false));
    currentCampaign.selected = !currentCampaign.selected;
    setSelectedCampaign(currentCampaign);
  };
  const getCurrentTime = () => {
    const time = new Date();
    let meridian = "am";
    let HH = time.getHours();
    let MM = time.getMinutes();
    if (HH > 12) {
      HH = time.getHours() - 12;
      meridian = "pm";
    }
    return `${HH}:${MM} ${meridian}`;
  };
  const handleCreateCampaign = (inputTitleRef, inputUserRef) => {
    const localCreateCampaign = !createCampaign;
    const localCampaigns = [...campaigns];
    localCampaigns.map(c => (c["selected"] = false));

    if (inputTitleRef.value.trim().length === 0) {
      inputTitleRef.style.border = "1px solid red";
      return false;
    }
    localCampaigns.unshift({
      id: localCampaigns.length + 1,
      title: inputTitleRef.value,
      history: [
        {
          title: "Created",
          on: getCurrentTime(),
          by:
            inputUserRef.value.trim().length > 0
              ? inputUserRef.value.trim()
              : "Anonymous"
        }
      ],
      selected: true
    });
    setCampaigns(localCampaigns);
    setCreateCampaign(localCreateCampaign);
    handlePagination(1);
    setSelectedCampaign(localCampaigns[0]);
  };
  const toggleModal = () => {
    const localCreateCampaign = !createCampaign;
    setCreateCampaign(localCreateCampaign);
  };

  // pagination
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );
  const handlePagination = (
    number,
    totalNumber = Math.ceil(campaigns.length / campaignsPerPage)
  ) => {
    if (number < 1 || number > totalNumber) return;
    setCurrentPage(number);
  };

  return (
    <>
      <header>
        <NavBar
          onCreate={handleCreateCampaign}
          modalShow={createCampaign}
          onToggle={toggleModal}
          campaigns={campaigns}
        ></NavBar>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Campaigns
              campaigns={currentCampaigns}
              indexOfFirstCampaign={indexOfFirstCampaign}
              onPause={handlePause}
              onComment={handleComment}
              onToggleComment={handleToggleComment}
              onRename={handleRename}
              onDelete={handleDelete}
              onRenamed={handleRenamed}
              onSelect={handleSelect}
            ></Campaigns>

            <Pagination
              campaignsPerPage={campaignsPerPage}
              currentPage={currentPage}
              totalCampaigns={campaigns.length}
              onPaginate={handlePagination}
            />
          </div>
          <div className="col-3 campaign-history-section">
            <CampaignHistory campaign={selectedCampaign}></CampaignHistory>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
