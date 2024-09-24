import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaPlus, FaMoon, FaSun, FaCog, FaSignOutAlt } from 'react-icons/fa'

import logic from '../../logic'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Image from '../library/Image'
import CreateEvent from './CreateEvent'
import useContext from '../context'

export default function Header({ onEventCreated, onLogout }) {
    const [name, setName] = useState(null)
    const [createEventVisible, setCreateEventVisible] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { theme, setTheme } = useContext()
    const menuRef = useRef(null)

    useEffect(() => {
        console.debug('Header -> useEffect')

        try {
            logic.getUserName()

                .then(name => setName(name))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [])

    const toggleMenu = () => setMenuVisible(prev => !prev)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleCreateEventClick = () => {
        setCreateEventVisible(true)
    }

    const handleCancelCreateEventClick = () => {
        setCreateEventVisible(false)
    }

    const handleEventCreated = () => {
        setCreateEventVisible(false)
        onEventCreated()
    }

    const handleLogout = () => {
        console.debug('Header -> handleLogout')

        try {
            logic.logoutUser()
            onLogout()
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleSearchChange = event => {
        setSearchQuery(event.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        console.debug('Search query:', searchQuery)
    }

    const handleSwitchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <header className="flex items-center p-4
        shadow-md w-full
        bg-white 
        dark:bg-background_grey">

            <Link
                to="/profile"
                className="mr-4"
                onClick={toggleMenu}>

                <div className="avatar-icon">
                    <div className="w-full h-full flex items-center justify-center">
                        <Image
                            src="/avatar/avatarIcon.png"
                            alt="Avatar"
                            className="h-10 w-10 rounded-full cursor-pointer">
                        </Image>

                    </div>
                </div>
            </Link>

            <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center flex-grow 
                text-light_grey">
                <FaSearch className="w-5 h-5 
                text-dark_white absolute left-3" />

                <input
                    type="text"
                    placeholder="Search Events near you..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-20 py-2
                    border-dark_white rounded-xl
                    bg-gray-100
                    outline-none
                    dark:bg-grey
                    dark:text-dark_white"
                />
                <div className="absolute right-3 
                font-bevan
                text-2xl 
                text-dark_white">
                    cities
                </div>
            </form>

            {menuVisible && (
                <Container
                    ref={menuRef}
                    className="flex flex-col absolute  rounded-lg 
                    shadow-lg
                    space-y-2 z-50 
                    top-20 left-6 px-4 py-4
                    bg-white 
                    border-gray-300 
                    dark:bg-background_grey border 
                    dark:border-light_grey"
                >
                    <Button
                        className="flex flex-row gap-4 
                        text-grey 
                        dark:text-dark_white"
                        onClick={handleCreateEventClick}>

                        <FaPlus className="h-5 w-5 
                        text-light_grey 
                        dark:text-dark_white" />
                        Create Event
                    </Button>

                    {createEventVisible && (
                        <CreateEvent
                            onEventCreated={handleEventCreated}
                            onCancelCreateEvent={handleCancelCreateEventClick}
                        />
                    )}

                    <Button
                        onClick={handleSwitchTheme}
                        className="flex flex-row gap-4 
                        text-grey 
                        dark:text-dark_white">
                        {theme === 'dark' ?
                            (<FaSun className="h-5 w-5 
                                text-dark_white 
                                dark:text-dark_white" />)
                            :
                            (<FaMoon className="h-5 w-5 
                                text-light_grey 
                            dark:text-dark_white" />)}
                        Switch Theme
                    </Button>

                    <Button className="flex flex-row gap-4 
                    text-grey 
                    dark:text-dark_white"
                        onClick={handleLogout}>
                        <FaSignOutAlt className="h-5 w-5 
                        text-light_grey 
                        dark:text-dark_white" />
                        Logout
                    </Button>
                </Container>
            )}
        </header>
    )
}
