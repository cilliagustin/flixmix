import React, { useState } from 'react'
import styles from '../../styles/Comment.module.css'
import Avatar from '../../components/Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useProfileData } from '../../contexts/ProfileDataContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from "./CommentEditForm";


const Comment = (props) => {
    const { setParent, setComments, endpoint, id, content, owner, profile_id, profile_image, created_at, updated_at, parent_id } = props
    const currentUser = useCurrentUser();
    const profileData = useProfileData()
    const isOwner = currentUser?.username === owner
    const isAdmin = profileData?.is_admin

    const [showEditForm, setShowEditForm] = useState(false);
    const handleEditForm = () => {
        setShowEditForm(!showEditForm)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/${endpoint}/${id}/`)
            setParent((prevParent) => ({
                ...prevParent,
                comments_count: prevParent.comments_count - 1,
            }));
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter(comment => comment.id !== id)
            }));
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className={showEditForm ? styles.Container : styles.Comment}>
            {(isOwner || isAdmin) && (
                <div className={styles.Dropdown}>
                    <MoreDropdown color={"grey"} handleDelete={handleDelete} handleEdit={handleEditForm} />
                </div>
            )}
            {showEditForm ? (
                <CommentEditForm
                    id={id}
                    parent_id={parent_id}
                    profile_id={profile_id}
                    content={content}
                    profileImage={profile_image}
                    setComments={setComments}
                    setShowEditForm={setShowEditForm}
                    endpoint={endpoint}
                />
            ) : (
                <>
                    <Avatar
                        src={profile_image}
                        height={35}
                        id={profile_id}
                        username={null}
                        className={styles.Avatar}
                    />
                    <Link to={`/profiles/${profile_id}`} className={styles.Owner}>{owner}</Link>
                    {updated_at !== created_at ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Edited</Tooltip>}
                        >
                            <p className={styles.Date}>{updated_at}</p>
                        </OverlayTrigger>
                    ) : (
                        <p className={styles.Date}>{updated_at}</p>
                    )}
                    <p className={styles.Content}>{content}</p>
                </>
            )}

        </div>
    )
}

export default Comment