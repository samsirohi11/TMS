import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(date);

  const { username, isAdmin, isManager } = useAuth();

  useTitle(`TMS: ${username}`);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome, {username}</h1>

      <p>
        <Link to="/dash/notes">View Notes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Create a new Note</Link>
      </p>

      {(isAdmin || isManager) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {(isAdmin || isManager) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;
