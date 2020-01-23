import { Map, GoogleApiWrapper } from "google-maps-react"
import React from "react"

const mapStyles = {
  width: "50%",
  height: "50%"
}

class GoogleMap extends React.Component {
  // this.state = {
  //   stores:
  // }

  componentDidMount() {}

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        onReady={this.loadGeoJson(this.props.coords)}
        disableDefaultUI={true}
      />
    )
  }

  autoCenterMap = ({ google }, map) => {
    this.loadGeoJson(map)
    // *code continues*
  }

  loadGeoJson = async map => {
    // const geojsonRoutes = await this.getRoutes(feed_code)
    // const geojsonEnvelope = await this.getEnvelope(feed_code)
    // map.data.addGeoJson(geojsonEnvelope)
    // map.data.addGeoJson(geojsonRoutes) // # load geojson layer
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_PLACES_KEY
})(GoogleMap)
