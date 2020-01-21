import React from "react"
import Disqus from "disqus-react"
import NewsArticlesContainer from '../views/NewsArticlesContainer'



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
  console.log(props.officialObject)
  return (
    <div>
      <h2>OfficialView here</h2>

      <p>{output}</p>
      <h1>Latest Headlines...</h1>
      {props.officialObject && <NewsArticlesContainer official={props.officialObject.official.name} />}

      <div className="disqus-container">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </div>
  )
}

export default OfficialView
