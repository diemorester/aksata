import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const defaultIcon = new L.Icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 35],
});

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      className="w-full h-full rounded-lg z-10"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} icon={defaultIcon}>
        <Popup>Lokasi Anda saat ini</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
