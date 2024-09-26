import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import logic from '../../logic'
import 'leaflet/dist/leaflet.css'

import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'

export default function getAllMapEvents() {
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
                    event.latitude && event.longitude && (
                        <Marker key={event._id} position={[event.latitude, event.longitude]}>
                            <Popup>
                                <Heading level={3}>{event.title}</Heading>
                                <Paragraph>{event.description}</Paragraph>
                                <Link to={`/events/${event._id}`}>See event details</Link>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div >
    )
}