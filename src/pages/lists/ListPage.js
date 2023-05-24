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

const ListPage = () => {

    const { id } = useParams()
    const [list, setList] = useState({ results: [] })
    const [comments, setComments] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser()
    const profile_image = currentUser?.profile_image;

    const history = useHistory()

    const { fullScreen, handleFullScreen, imageData } = useFullScreen();

    const handleEdit = () => {
        history.push(`/list/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/lists/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: listData }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/lists/${id}`),
                    axiosReq.get(`/listcomments/?rating=${id}`)
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
                                    {list.is_owner && <MoreDropdown color={"grey"} handleDelete={handleDelete} handleEdit={handleEdit} />}
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
                                    <span>No comments yet, be the first to do it</span>
                                ) : (
                                    <span>No comments yet</span>
                                )}
                            </div>
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default ListPage