import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from '../styles/MoreDropdown.module.css'
import { useHistory } from "react-router";


/**
 * Returns the ellipsis icon with certain styles according to the props passed
 */
const ThreeDots = React.forwardRef(({ onClick, color }, ref) => {
  const iconClassName = color === 'grey' ? styles.Grey : styles.White;

  return (
    <i
      className={`${styles.Icon} fas fa-ellipsis-v ${iconClassName}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  );
});

ThreeDots.displayName = 'ThreeDots';

/**
 * Returns a button with the function handle edit and handle delete passed as props
 * the color prop also conditionally renders its style
*/
export const MoreDropdown = ({ handleEdit, handleDelete, color }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} color={color} />

      <Dropdown.Menu
        className={`${styles.DropdownMenu} text-center`}
        popperConfig={{ strategy: "fixed" }}
        >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
          >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
          >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

MoreDropdown.displayName = 'MoreDropdown';

/**
 * Custom button for the profile page. creates the correct link according to
 * the id passed as prop
 * the color prop also conditionally renders its style
 */
export function ProfileEditDropdown({ id , color }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} color={color} />
      <Dropdown.Menu
        className={`${styles.DropdownMenu} ${styles.Profile} text-center`}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={`${styles.DropdownItem}`}
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.DropdownItem}`}
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.DropdownItem}`}
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

ProfileEditDropdown.displayName = 'ProfileEditDropdown';