import React from "react";
import { OfficialCard } from "..";
import Disqus from "disqus-react";

// If you need cards or styling, you can uncomment the lines here to import
// import "./OfficialView.css";

const OfficialView = props => {
  // Disqus configuration information
  const disqusShortname = "voterbundle"; //found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "article-id", //this.props.uniqueId
    title: "Title of Your Article" //this.props.title
  };

  return (
    <div>
      OfficialView here
      <OfficialCard />
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};

export default OfficialView;
