import { useNavigate } from "react-router-dom";
import { LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { useContextCity } from "../contexts/CityCountext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import styles from "./Map.module.css";
import Butten from "./Butten";
import useparams1 from "../hooks/useparams";

// ✨ نوع‌دهی position صحیح
type TypePosition = [number, number];

export default function Map() {
  const [position, setPosition] = useState<TypePosition>([40, 0]);
  const { cities } = useContextCity();
  const {
    isLoading: loadingPosition,
    position: geoLocalPosition ,
    getPosition,
  } = useGeolocation();
  const [map_lat, map_lng] = useparams1();

  // اگر از URL موقعیت داریم
  useEffect(() => {
    if (map_lat && map_lng) {
      setPosition([Number(map_lat), Number(map_lng)]);
    }
  }, [map_lat, map_lng]);

  // اگر از موقعیت جغرافیایی کاربر داریم
  useEffect(() => {
    if (geoLocalPosition) {
      setPosition([
        Number(geoLocalPosition.lat),
        Number(geoLocalPosition.lng),
      ]);
    }
  }, [geoLocalPosition]);

  return (
    <div className={styles.mapContainer}>
      <Butten type="position" onClick={getPosition}>
        {loadingPosition ? "Loading..." : "Use your position"}
      </Butten>

      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[
              Number(city.position.lat),
              Number(city.position.lng),
            ]}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={position} />
        <PositionUser />
      </MapContainer>
    </div>
  );
}

// 📍 تغییر مرکز نقشه
function ChangeCenter({ position }: { position: TypePosition }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

// 📌 گرفتن مختصات کلیک و ریدایرکت
function PositionUser() {
  const navigate = useNavigate();

  useMapEvent("click", (e:LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    navigate(`form?lat=${lat}&lng=${lng}`);
  });

  return null;
}
