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
  let divisionId = ""
  let office = {}
  let official = {}
  if (props.officialObject) {
    divisionId = props.officialObject.office.divisionId
    office = props.officialObject.office
    official = props.officialObject.official
  }
  console.log(office)
  console.log(official)
  // Officials can have anywhere from 0 to 3 channels! We will need to first see if they have any channels at all. If they do, we will then need to iterate through them to generate the elements. Ideally, we should be able to identify the domain of the channel, so that we can link to it directly. eg. https://www.facebook.com/newyorkstateag/ when the type is "Facebook"
  let channels = []
  if (official.channels) {
    for (let key in official.channels) {
      if (official.channels.hasOwnProperty(key)) {
        if (official.channels[key].type == "Facebook") {
          // console.log(
          //   "Facebook: ",
          //   "https://www.facebook.com/" + official.channels[key].id
          // );
          channels.push(
            <p>
              <a
                href={"https://www.facebook.com/" + official.channels[key].id}
                target="blank"
              >
                https://www.facebook.com/{official.channels[key].id}
              </a>
            </p>
          )
        } else if (official.channels[key].type == "Twitter") {
          // console.log(
          //   "Twitter: ",
          //   "https://twitter.com/" + official.channels[key].id
          // );
          channels.push(
            <p>
              <a
                href={"https://twitter.com/" + official.channels[key].id}
                target="blank"
              >
                https://twitter.com/{official.channels[key].id}
              </a>
            </p>
          )
        } else if (official.channels[key].type == "YouTube") {
          // console.log(
          //   "YouTube: ",
          //   "https://www.youtube.com/user/" + official.channels[key].id
          // );
          channels.push(
            <p>
              <a
                href={
                  "https://www.youtube.com/user/" + official.channels[key].id
                }
                target="blank"
              >
                https://www.youtube.com/user/{official.channels[key].id}
              </a>
            </p>
          )
        }
      }
    }
  }

  return (
    <div>
      <h2>OfficialView here</h2>

      <p>{divisionId}</p>
      <p>{office.name}</p>
      <p>{official.name}</p>
      <div>{channels}</div>

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
