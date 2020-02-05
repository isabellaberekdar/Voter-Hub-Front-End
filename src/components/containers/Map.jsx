import React, { Component } from "react"
import mapboxgl from "mapbox-gl"
import { connect } from "react-redux"
import "../views/Map.css"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2xlbm52YXJnYXMiLCJhIjoiY2s1bHd0N2tyMHRoMjNtcDQyd29jODYzZyJ9.dtibsg-o8MUWwBgXEPMHUA"

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: -115,
      lat: 48,
      zoom: 1.5
    }
  }

  componentDidMount() {
    // console.log("kiwi", this.props)
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/mapbox/light-v10",
      // style: "mapbox://styles/mapbox/dark-v10",
      // style: "mapbox://styles/mapbox/satellite-v9",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    })
    map.on("load", function() {
      map.addLayer({
        id: "state",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [-73.933406, 40.833179],
                  [-55.933406, 20.833179],
                  [-85.933406, 10.833179]
                ]
              ]
            ]
          }
        },
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8
        }
      })
    })
  }

  render() {
    console.log("beet", this.props.coords)

    return (
      <div>
        <div ref={el => (this.mapContainer = el)} />
      </div>
    )
  }
}

const mapState = state => {
  // ("peanut", state)
  return {
    coords: state.official.coords
  }
}

// const mapDispatch = dispatch => {
//   return {}
// }

export default connect(mapState)(Map)
