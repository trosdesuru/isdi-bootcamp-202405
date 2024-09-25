import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getGeoEvents } from './api/eventsApi'
import 'leaflet/dist/leaflet.css'

export default function MapView() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getGeoEvents()
            .then((data) => {
                setEvents(data)
            })
            .catch((error) => {
                console.error('Error fetching geo events:', error)
            })
    }, [])

    return (
        <div className="map-container">
            <MapContainer center={[41.3851, 2.1734]} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map((event) => (
                    <Marker key={event._id} position={[event.latitude, event.longitude]}>
                        <Popup>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}