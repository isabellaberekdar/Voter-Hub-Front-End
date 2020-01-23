import { Map, GoogleApiWrapper } from "google-maps-react"
import React from "react"
const mapStyles = {
  width: "50%",
  height: "50%"
}
class GoogleMap extends React.Component {
  componentDidMount() {
    let address='new york city'
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={{ lat: 40.444, lng: -98.176 }}
        disableDefaultUI={true}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_PLACES_KEY
})(GoogleMap)
