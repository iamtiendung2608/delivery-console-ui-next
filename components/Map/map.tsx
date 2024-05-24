"use client";


import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

export interface MapProperties {
  position: number[]
  zoom: number
  name: string
  phone: string
}

function MapComponent(props: MapProperties) {

  return (
    <MapContainer center={props.position} zoom={props.zoom} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.position}>
        <Popup>
          {props.name} <br /> Contact: {props.phone}.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent