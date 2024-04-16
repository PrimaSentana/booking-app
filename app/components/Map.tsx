'use client';

import L, { LatLngBounds, LatLngBoundsExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
});

interface MapProps {
    center?: number[];
}


const Map: React.FC<MapProps> = ({ center }) => {
    const bounds: LatLngBounds = L.latLngBounds(
        L.latLng(-85, -180), // south-west corner
        L.latLng(85, 180) // north-east corner
    );
    return (
        <MapContainer
            className="h-[35vh] rounded-lg"
            center={center as L.LatLngExpression || [51, -0.09]}
            zoom={center ? 4 : 2}
            worldCopyJump={true}
            maxBounds={bounds}
            maxBoundsViscosity={1}
        >
            <TileLayer
                noWrap={true}
                minZoom={2}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker
                    position={center as L.LatLngExpression}
                />
            )}
        </MapContainer>
    )
}

export default Map