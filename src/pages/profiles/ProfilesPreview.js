import React, { useEffect, useState } from 'react'
// import styles from '../../styles/ProfilesPreview.module.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { Container } from "react-bootstrap";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';

const ProfilesPreview = ({ message, query, searchFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id;
    const [profiles, setProfiles] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const pathname = useLocation();
    const search = query !== "" ? `search=${query}` : ""
    const filter = profile_id && (
        searchFilter === "follower" ? (
            `owner__following__followed__profile=${profile_id}&`
        ) : searchFilter === "followed" ? (
            `owner__followed__owner__profile=${profile_id}&`
        ) : ""
    )


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/?${filter}${search}`)
                setProfiles(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false)
        const timer = setTimeout(() => {
            fetchData()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [pathname, filter, search])

    hasLoaded && console.log(profiles)

    return (
        <>
            {hasLoaded ? (
                <Asset spinner />
            ) : (
                <Asset spinner />
            )}
        </>
    )
}

export default ProfilesPreview