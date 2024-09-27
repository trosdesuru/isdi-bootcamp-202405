import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import logic from '../../logic'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

export default function Map() {
  console.debug('Map -> call')

  const [events, setEvents] = useState([])

  useEffect(() => {
    console.debug('MapEvents -> useEffect')

    loadEvents()
  }, [])

  const loadEvents = () => {
    try {
      logic.getAllMapEvents()
        .then(events => setEvents(events))
        .catch(error => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  return (
    <MapContainer className="pb-[120px]" center={[41.3874, 2.1686]} zoom={13}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        style="positron"
      />
      {events.map(event => (
        <Marker key={event._id} position={event.location.coordinates}>
          <Popup>
            <strong>{event.title}</strong><br />
            {event.author}
          </Popup>
        </Marker>
      ))}
    </MapContainer>

  )
}

// style={{ height: 'calc(100vh - 128px)' }}