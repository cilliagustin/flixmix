import React, { useEffect, useState } from 'react'
import styles from '../../styles/ListPage.module.css'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Row, Col } from "react-bootstrap";
import Asset from '../../components/Asset'
import Avatar from '../../components/Avatar'
import { MoreDropdown } from '../../components/MoreDropdown'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'
import CommentCreateForm from '../comments/CommentCreateForm'
import { fetchMoreData } from '../../utils/utils'
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from '../comments/Comment'
import { useProfileData } from '../../contexts/ProfileDataContext'


/**
 * Display List Page
*/
const ListPage = () => {

    // get id from url
    const { id } = useParams()
    const [list, setList] = useState({ results: [] })
    const [comments, setComments] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser()
    const profile_image = currentUser?.profile_image;
    const profileData = useProfileData()
    const isAdmin = profileData?.is_admin

    const history = useHistory()

    const { fullScreen, handleFullScreen, imageData } = useFullScreen();

    //link to edit list page
    const handleEdit = () => {
        history.push(`/list/${id}/edit`)
    }

    //delete list from database
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/lists/${id}/`);
            //redirect to previous page
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    // fetch list data from api and listcomments
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: listData }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/lists/${id}`),
                    axiosReq.get(`/listcomments/?list=${id}`)
                ])
                setList(listData)
                setComments(comments)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    }, [id])
    return (
        <>
            {fullScreen && (
                <FullScreenModal src={imageData.src} alt={imageData.alt} handleClick={handleFullScreen} />
            )}
            <Row className='mx-0'>
                <Col>
                    {hasLoaded ? (
                        // if data has loaded pupulate with the list data
                        <>
                            <div className={styles.Container}>
                                <Link
                                    className={styles.Owner}
                                    to={`/profiles/${list.profile_id}`}
                                >
                                    {list.owner}
                                </Link>
                                <div className={styles.Avatar}>
                                    <Avatar
                                        src={list.profile_image}
                                        height={35}
                                        id={list.profile_id}
                                        username={null}
                                    />
                                </div>
                                <span className={styles.Date}>Created on {list.created_at}</span>
                                <div className={styles.Dropdown}>
                                    {/* display dropdown to admin or list owner */}
                                    {(list.is_owner || isAdmin) && <MoreDropdown color={"grey"} handleDelete={handleDelete} handleEdit={handleEdit} />}
                                </div>
                                <p className={styles.Content}>{list.description}</p>
                            </div>
                            <div className={styles.Movies}>
                                {list.movies_details.map((movie) => (
                                    <div key={movie.id} className={styles.Movie}>
                                        <img
                                            src={movie.poster}
                                            alt={`${movie.title} movie poster`}
                                            onClick={e => handleFullScreen(e)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.Comments}>
                                <div className={styles.CommentsCount}>
                                    <i className="fa-regular fa-comments"></i>
                                    <span>{list.comments_count}</span>
                                </div>
                                {currentUser ? (
                                    // if user is logged in allow to create comments
                                    <CommentCreateForm
                                        profile_id={currentUser.profile_id}
                                        profileImage={profile_image}
                                        parentId={id}
                                        setParent={setList}
                                        setComments={setComments}
                                        endpoint="listcomments"
                                    />
                                ) : comments.results.length ? (
                                    "Comments"
                                ) : null}
                                {comments.results.length ? (
                                    // if comments has results, display comments infinitely
                                    <InfiniteScroll
                                        children={
                                            comments.results.map(comment => (
                                                <Comment
                                                    key={comment.id}
                                                    {...comment}
                                                    setParent={setList}
                                                    setComments={setComments}
                                                    endpoint="listcomments"
                                                    parent_id={id}
                                                />
                                            ))
                                        } n
                                        dataLength={comments.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!comments.next}
                                        next={() => fetchMoreData(comments, setComments)}
                                    />

                                ) : currentUser ? (
                                    // if there are no comments and the user is logged invite him to comment
                                    <span>No comments yet, be the first to do it</span>
                                    ) : (
                                        // if there are no comments display text explaining that
                                        <span>No comments yet</span>
                                )}
                            </div>
                        </>
                    ) : (
                        // display loader until list data is fetched
                        <Asset spinner />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default ListPage