import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
import logo2 from '../assets/flixmix.png';
import { NavLink } from 'react-router-dom'
import styles from '../styles/Sidebar.module.css'
import UseScrollDirection from './UseScrollDirection';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import { useProfileData } from '../contexts/ProfileDataContext';


/**
 * Returns the Sidebar always located on the left side of the page.
 * conditionally renders certain links according to the user profile information
 * Includes functions to open and close the dropdown and sign out
 */
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const showSidebar = () => setCollapsed(!collapsed);
    const scrollUp = UseScrollDirection();
    const [openDropdown, setOpenDropdown] = useState(null)

    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()

    const profileData = useProfileData()


    const handleOpenDropdown = (e) => {
        openDropdown === e.currentTarget.dataset.value ? (
            setOpenDropdown(null)
        ) : (
            setOpenDropdown(e.currentTarget.dataset.value)
        )
    }

    const handleSignOut = async () => {
        setOpenDropdown(null)
        try {
            axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        // the collapsed state conditionally renders the Open class
        <nav className={`${styles.Sidebar} ${!collapsed && styles.Open}`}>
            <NavLink to="/" onClick={() => setOpenDropdown(null)}>
                <div className={styles.LogoContainer}>
                    <img src={logo} alt="Brand logo"></img>
                </div>
            </NavLink>
            <NavLink to="/" onClick={() => setOpenDropdown(null)}>
                <div className={styles.FullLogoContainer}>
                    <img src={logo2} alt="Brand full name logo"></img>
                </div>
            </NavLink>
            <div className={
                `${styles.ButtonContainer} ${!scrollUp && styles.ButtonContainerHide}`
            }>
                <button onClick={showSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <NavLink
                to="/"
                className={styles.Link}
                onClick={() => setOpenDropdown(null)}
                activeClassName={styles.Active}
                exact
            >
                <div>
                    <i className={'fa-solid fa-house'}></i>
                </div>
                <span>Home</span>
            </NavLink>
            <div
                className={`${styles.DropdownContainer} ${openDropdown === "search" && styles.OpenDropdown}`}

            >
                <div className={styles.Dropdown}
                    onClick={handleOpenDropdown}
                    data-value="search">
                    <div>
                        <i className={'fa-solid fa-magnifying-glass'}></i>
                    </div>
                    <span>Search</span>
                </div>
                <div className={styles.SublinksContainer}>
                    <NavLink
                        to="/search/movie"
                        className={styles.Sublink}
                        activeClassName={styles.ActiveSubLink}
                        exact
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        to="/search/review"
                        className={styles.Sublink}
                        activeClassName={styles.ActiveSubLink}
                        exact
                    >
                        Reviews
                    </NavLink>
                    <NavLink
                        to="/search/list"
                        className={styles.Sublink}
                        activeClassName={styles.ActiveSubLink}
                        exact
                    >
                        Lists
                    </NavLink>
                    <NavLink
                        to="/search/profiles"
                        className={styles.Sublink}
                        activeClassName={styles.ActiveSubLink}
                        exact
                    >
                        Profiles
                    </NavLink>
                </div>
            </div>

            {/* 
                if the user is logged in it will render links to create movies or list,
                to sign out and its avatar (linking to their profile page)
            */}
            {currentUser ? (
                <>
                    <div
                        className={`${styles.DropdownContainer}  ${openDropdown === "add" && styles.OpenDropdown}`}

                    >
                        <div className={styles.Dropdown}
                            onClick={handleOpenDropdown}
                            data-value="add">
                            <div>
                                <i className={'fa-solid fa-plus'}></i>
                            </div>
                            <span>Add</span>
                        </div>
                        <div className={styles.SublinksContainer}>
                            <NavLink
                                to="/add/movie"
                                className={styles.Sublink}
                                exact
                                activeClassName={styles.ActiveSubLink}
                            >
                                Movies
                            </NavLink>
                            <NavLink
                                to="/add/list"
                                className={styles.Sublink}
                                exact
                                activeClassName={styles.ActiveSubLink}
                            >
                                Lists
                            </NavLink>
                        </div>
                    </div>
                    {/* 
                        if the user is the admin it will conditionally render a link to the admin panel
                    */}
                    {profileData?.is_admin && (
                        <NavLink
                            to="/admin"
                            className={styles.Link}
                            onClick={() => setOpenDropdown(null)}
                            activeClassName={styles.Active}
                            exact
                        >
                            <div>
                                <i className={'fa-solid fa-user-gear'}></i>
                            </div>
                            <span>Admin Panel</span>
                        </NavLink>
                    )}
                    <NavLink
                        to="/"
                        className={`${styles.Link} ${styles.Log}`}
                        onClick={handleSignOut}
                    >
                        <div>
                            <i className={'fa-solid fa-arrow-right-from-bracket'}></i>
                        </div>
                        <span>Log Out</span>
                    </NavLink>

                    <div className={styles.User}>
                        <Avatar
                            src={currentUser?.profile_image}
                            height={30}
                            id={currentUser?.profile_id}
                            username={null}
                        />
                        <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.Username}>
                            {currentUser?.username}
                            {profileData?.is_admin && (
                                <span>(Site Admin)</span>
                            )}
                        </NavLink>
                    </div>
                </>
            ) : (
                // If the user is not logged in it will render a link to go to the sign in form
                <>
                    <NavLink
                        to="/log"
                        className={`${styles.Link} ${styles.Log}`}
                        onClick={() => setOpenDropdown(null)}
                        activeClassName={styles.Active}
                        exact
                    >
                        <div>
                            <i className={'fa-solid fa-arrow-right-to-bracket'}></i>
                        </div>
                        <span>Log in / Register</span>
                    </NavLink>
                </>
            )}

        </nav>
    )
}

export default Sidebar