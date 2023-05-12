import React from 'react'
import styles from '../../styles/Comment.module.css'
import Avatar from '../../components/Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Comment = (props) => {
    const { content, owner, profile_id, profile_image, created_at, updated_at } = props
    return (
        <div className={styles.Comment}>
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
        </div>
    )
}

export default Comment