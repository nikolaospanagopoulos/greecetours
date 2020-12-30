import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import "./UserListPage.css";

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="users-title">
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="red"> {error} </Message>
      ) : errorDelete ? (
        <Message color="red"> {errorDelete} </Message>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td> {user._id} </td>
                <td> {user.name} </td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}> {user.email} </a>{" "}
                </td>
                <td>
                  {" "}
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}{" "}
                </td>
                <td>
                  {" "}
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button onClick={() => deleteUserHandler(user._id)}>
                    {" "}
                    <i className="fas fa-trash"></i>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListPage;
