import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import BarLoader from "react-spinners/BarLoader";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  useTitle("TMS: Edit Note");

  const { id } = useParams();

  const { username, isAdmin, isManager } = useAuth();

  const { note } = useGetNotesQuery("noteList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <BarLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">Access Denied</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
