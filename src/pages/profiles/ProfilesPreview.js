import React, { useEffect, useState } from 'react'
import styles from '../../styles/ProfilesPreview.module.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { Container } from "react-bootstrap";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import NoResults from '../../assets/no-results.png'
import Asset from '../../components/Asset';
import ProfilePreviewCard from './ProfilePreviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';

/**
 * Display ratings
 * can be fetched using or not a specific endpoint
*/
const ProfilesPreview = ({ message, query, searchFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id;
    const [profiles, setProfiles] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const pathname = useLocation();
    //import filter data to create a specific endpoint if the user selected filter options
    const search = query !== "" ? `search=${query}` : ""
    const filter = profile_id && (
        searchFilter === "follower" ? (
            `owner__following__followed__profile=${profile_id}&`
        ) : searchFilter === "followed" ? (
            `owner__followed__owner__profile=${profile_id}&`
        ) : ""
    )

    // fetch ratings from api
    useEffect(() => {
        const fetchData = async () => {
            try {
                 // if the user applied filters an endpint using this will fetch the data. 
                // Otherise all profiles will be fetched
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
    }, [pathname, filter, search, currentUser])

    return (
        <>
            {hasLoaded ? (
                <>
                    {/* display the ammount of profiles fetched in the search */}
                    <span className={styles.Count}>{profiles.count} results</span>
                    {profiles.results.length ? (
                        <div className={styles.Container}>
                            {/* display the ratings fetched with infinite scroll */}
                            <InfiniteScroll
                                children={
                                    profiles.results.map((profile) => (
                                        <ProfilePreviewCard
                                            key={profile.id}
                                            {...profile}
                                            setProfiles={setProfiles}
                                        />
                                    ))}
                                dataLength={profiles.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!profiles.next}
                                next={() => fetchMoreData(profiles, setProfiles)}
                            />
                        </div>
                    ) : (
                        // if there are no ratings in the requested search display a no results asset
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                // display loader until rating data is fetched
                <Asset spinner />
            )}
        </>
    )
}

export default ProfilesPreview