import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Caravan } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CaravanMapProps {
    caravans: Caravan[];
}

const CaravanMap: React.FC<CaravanMapProps> = ({ caravans }) => {
    // Default center (South Korea)
    const defaultCenter: [number, number] = [36.5, 127.5];
    const zoom = 7;

    return (
        <MapContainer center={defaultCenter} zoom={zoom} style={{ height: '100%', width: '100%', borderRadius: '12px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {caravans.map((caravan) => (
                caravan.location?.latitude && caravan.location?.longitude ? (
                    <Marker
                        key={caravan.id}
                        position={[caravan.location.latitude, caravan.location.longitude]}
                    >
                        <Popup>
                            <div style={{ minWidth: '150px' }}>
                                <img
                                    src={caravan.photos[0]}
                                    alt={caravan.name}
                                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }}
                                />
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{caravan.name}</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>${caravan.dailyRate} / night</p>
                            </div>
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </MapContainer>
    );
};

export default CaravanMap;
