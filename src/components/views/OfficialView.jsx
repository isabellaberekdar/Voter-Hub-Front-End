import React from "react"
import Disqus from "disqus-react"

// If you need cards or styling, you can uncomment the lines here to import
// import { OfficialCard } from "..";
import "./OfficialView.css"

const OfficialView = props => {
  // Disqus configuration information
  const disqusShortname = "voterbundle" //found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "article-id", //this.props.uniqueId
    title: "Title of Your Article" //this.props.title
  }

  // console.log("parsnip", props)
  let output = []
  if (props.officialObject) {
    output.push(<p>{props.officialObject.office.divisionId}</p>)
    output.push(<p>{props.officialObject.office.name}</p>)
    output.push(<p>{props.officialObject.official.name}</p>)
  }
  return (
    <div>
      <h2>OfficialView here</h2>

      <p>{output}</p>
      <div className="disqus-container">
        {/* <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        /> */}
      </div>
    </div>
  )
}

export default OfficialView
