import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // tamanho do ícone
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// Marcadores
const markers = [
  {
    geocode: [-16.603350, -49.266532],
    popUp: "Instituto de Informática"
  },
  {
    geocode: [-16.603100, -49.265932],
    popUp: "Centro de Aulas Baru"
  },
  {
    geocode: [-16.602657, -49.262832],
    popUp: "Centro de Aulas"
  }
];

export default function App() {
  return (
    // Centralidade do mapa ao iniciar e zoom inicial
    <MapContainer center={[-16.6029, -49.2640]} zoom={17}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
