import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import BarLoader from "react-spinners/BarLoader";
import useTitle from "../../hooks/useTitle";

const NewNote = () => {
  useTitle("TMS: New Note");

  const { users } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <BarLoader color={"#FFF"} />;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
