import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from '../styles/MoreDropdown.module.css'

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