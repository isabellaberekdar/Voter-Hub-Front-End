import React, { Component } from "react"
import mapboxgl from "mapbox-gl"
import { connect } from "react-redux"
import "../views/Map.css"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2xlbm52YXJnYXMiLCJhIjoiY2s1bHd0N2tyMHRoMjNtcDQyd29jODYzZyJ9.dtibsg-o8MUWwBgXEPMHUA"

class Map extends Component {
  map

  // componentDidUpdate() {
  //   this.setFill()
  // }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-70, 44],
      zoom: 1.5
    })

    this.map.on("load", () => {
      console.log("taro", this.props.coords)
      this.map.addSource("outline", {
        type: "geojson",
        data: this.props.coords
      })

      this.map.addLayer(
        {
          id: "outline",
          type: "fill",
          source: "outline"
        },
        "country-label-lg"
      ) // ID metches `mapbox/streets-v9`

      // this.setFill()
      this.map.setPaintProperty("outline", "fill-color", "#22f")
      this.map.setPaintProperty("outline", "fill-opacity", 0.4)
    })
  }

  // setFill() {
  //   const { property, stops } = this.props.active
  //   this.map.setPaintProperty("countries", "fill-color", {
  //     property,
  //     stops
  //   })
  // }

  render() {
    // console.log(this.props.coords)
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="absolute top right left bottom"
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

function mapStateToProps(state) {
  return {
    coords: state.official.coords
  }
}

Map = connect(mapStateToProps)(Map)

export default Map
