import React, { useEffect, useState } from 'react'
import styles from '../../styles/ListPage.module.css'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Row, Col } from "react-bootstrap";
import Asset from '../../components/Asset'
import Avatar from '../../components/Avatar'
import { MoreDropdown } from '../../components/MoreDropdown'
import { useFullScreen, FullScreenModal } from '../../components/HandleFullScreen'

const ListPage = () => {

    const { id } = useParams()
    const [list, setList] = useState({ results: [] })
    const [comments, setComments] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser()
    const profile_image = currentUser?.profile_image;

    const history = useHistory()

    const { fullScreen, handleFullScreen, imageData } = useFullScreen();


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
                                    {list.is_owner && <MoreDropdown color={"grey"} handleDelete={() => { }} handleEdit={() => { }} />}
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