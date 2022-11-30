import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

const User = ({ userId, editAdmin, editManager, listUsername }) => {
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    const editButton = (
      <button className="icon-button table__button" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    );

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          {(editAdmin ||
            (editManager && user.username === listUsername) ||
            (user.roles.includes("Employee") && user.roles.length < 2)) &&
            editButton}
        </td>
      </tr>
    );
  } else return null;
};
const memoizedUser = memo(User);

export default memoizedUser;
