"use client"
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

function MyMap(props: any) {
  const { position, zoom, name, phone} = props

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
                {name} <br /> Contact: {phone}.
            </Popup>
        </Marker>
    </MapContainer>
  );
}

export default MyMap