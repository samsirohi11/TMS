import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { memo } from "react";

const Note = ({ noteId, editAdmin, editManager, listUsername }) => {
  const { note } = useGetNotesQuery("noteList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });
  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[note?.user],
    }),
  });
  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    const editButton = (
      <button className="icon-button table__button" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    );

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          {(editAdmin ||
            (editManager && user.username === listUsername) ||
            (user.roles.includes("Employee") && user.roles.length < 2)) &&
            editButton}
        </td>
      </tr>
    );
  } else return null;
};
const memoizedNote = memo(Note);

export default memoizedNote;
