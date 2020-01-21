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

  // Some officials don't have an address.
  // The address is an array holding a single object of address lines. Kind of weird.
  // Some addresses have a line2 and line3 etc in addition to just a line1 (Andrew M. Cuomo). So we'll have to iterate through them somehow, ignoring any that are just blank strings "".
  let addressLines = []
  if (official.address) {
    if (official.address.hasOwnProperty(0)) {
      let lines = []
      let line2 = ""
      for (let key in official.address[0]) {
        if (["line1", "line2", "line3", "line4"].includes(key)) {
          // console.log(official.address[0][key])
          lines.push(<p>{official.address[0][key]}</p>)
        } else if (key === "city") {
          // console.log(official.address[0][key])
          line2 = line2 + official.address[0][key]
        } else if (key === "state") {
          // console.log(official.address[0][key])
          line2 = line2 + ", " + official.address[0][key]
        } else if (key === "zip") {
          // console.log(official.address[0][key])
          line2 = line2 + " " + official.address[0][key]
        }
      }
      addressLines.push(lines)
      addressLines.push(<p>{line2}</p>)
    }
  }

  return (
    <div>
      <h2>OfficialView here</h2>

      <p>{divisionId}</p>
      <p>{office.name}</p>
      <p>{official.name}</p>
      {addressLines}
      {channels}

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
