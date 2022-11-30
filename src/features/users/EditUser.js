import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import BarLoader from "react-spinners/BarLoader";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle("TMS: Edit User");
  const { id } = useParams();

  const { user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <BarLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
