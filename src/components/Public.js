import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Task Management System</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          This web app can be used to assign tasks/notes to users such as
          employees and also to manage the users.
        </p>
        <br />
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
