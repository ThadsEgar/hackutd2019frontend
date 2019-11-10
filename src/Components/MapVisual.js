import React from "react"
import WebMapView from "./Map.js"
import "./map.css"

function MapVisual() {
    return (
        <div className="map">
            <h1>Theres a map</h1>
            <WebMapView/>
        </div>
    )
}

export default MapVisual
