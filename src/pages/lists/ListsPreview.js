import React, { useEffect, useState } from 'react'
import styles from '../../styles/ListsPreview.module.css'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Asset from '../../components/Asset';
import { Container } from "react-bootstrap";
import NoResults from '../../assets/no-results.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchMoreData } from '../../utils/utils'
import ListPreviewCard from './ListPreviewCard';

const ListsPreview = ({ message, query = "", searchParameter = "", infiniteScroll = false, followedFilter }) => {
    const currentUser = useCurrentUser()
    const profile_id = currentUser?.profile_id || "";
    const [lists, setLists] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const { pathname } = useLocation()
    //import filter data to create a specific endpoint if the user selectd filter options
    const search = query !== "" ? `${searchParameter}=${query}&` : ""
    const followedProfilesFilter = followedFilter ? `owner__followed__owner__profile=${profile_id}&` : ""

    // fetch list from api
    useEffect(() => {
        const fetchLists = async () => {
            try {
                // if the user applied filters an endpint using this will fetch the data. 
                // Otherise all list will be fetched
                const { data } = await axiosReq.get(`/lists/?${followedProfilesFilter}${search}`)
                setLists(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchLists()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [followedProfilesFilter, pathname, currentUser, search])


    return (
        <>
            {hasLoaded ? (
                <>
                    {infiniteScroll && (
                        <span className={styles.Count}>{lists.count} results</span>
                    )}
                    {lists.results.length ? (
                    // if there are lists in the requested search display them with infinite scroll
                        <>
                            {infiniteScroll ? (
                                <div className={styles.InfiniteScrollContainer}>
                                    <InfiniteScroll
                                        children={
                                            // display each list information in a list card
                                            lists.results.map((list) => (
                                                <ListPreviewCard key={list.id} {...list} />
                                            ))
                                        }
                                        dataLength={lists.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!lists.next}
                                        next={() => fetchMoreData(lists, setLists)}
                                    />
                                </div>
                            ) : (

                                <div className={styles.Container}>
                                    {lists.results.slice(0, 5).map((list) => (
                                        <ListPreviewCard key={list.id} {...list} />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        // if there are no lists in the requested search display a no results asset
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                // display loader until list data is fetched
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default ListsPreview