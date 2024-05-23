"use client"
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

function MyMap(props: any) {
  const { zoom } = props
  let position = [105.58075084879322, 20.901351928710938]

  return (
    <MapContainer center={[10.728775, 106.7339803]} zoom={13} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[10.728775, 106.7339803]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
  );
}

export default MyMap