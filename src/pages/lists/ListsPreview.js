import React, {useEffect, useState} from 'react'
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
    const search = query !== "" ? `${searchParameter}=${query}&` : ""
    const followedProfilesFilter = followedFilter ? `owner__followed__owner__profile=${profile_id}&` : ""

    useEffect(() => {

        const fetchLists = async () => {
            try {
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
    }, [ followedProfilesFilter, pathname, query, search])


    return (
        <>
            {hasLoaded ? (
                <>
                    {lists.results.length ? (
                        <>
                            {infiniteScroll ? (
                                <div className={styles.InfiniteScrollContainer}>
                                    <InfiniteScroll
                                        children={
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
                                {lists.results.slice(0,5).map((list) => (
                                    <ListPreviewCard key={list.id} {...list} />
                                ))}
                            </div>
                            )}
                        </>
                    ) : (
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default ListsPreview