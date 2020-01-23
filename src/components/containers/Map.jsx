import { Map, GoogleApiWrapper, Polygon } from "google-maps-react"
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
    console.log(this.props.coords)
    const triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];
    return (
      <Map
        google={this.props.google}
        zoom={1}
        style={mapStyles}
      /*   onReady={this.loadGeoJson(this.props.coords)} */
        disableDefaultUI={true}
      >
        {this.props.coords && 

        <Polygon
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />
      
      }
      </Map>

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
