import { useNavigate } from 'react-router-dom'

export default function Map({ onEventCreated }) {
    console.debug('Map -> call')

    const navigate = useNavigate()

    const handleMapClick = () => {
        console.debug('Map -> handleMapClick')
        navigate('/map')
    }

    return (
        <div id="map" style={{ width: '100%', height: '100vh' }}>
            <button>View Map</button>
        </div>
    )
}