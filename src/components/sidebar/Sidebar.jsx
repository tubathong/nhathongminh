import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const Navigate = useNavigate();

  const Logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast("logout successful");
        Navigate("/login");
      })
      .catch((error) => {
        toast("logout error");
      });
  };

  return (
    <div className="sidebar">
      <ToastContainer />
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Smart Home</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/control" style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Control</span>
            </li>
          </Link>
          <p className="title">Users</p>
          <li onClick={() => Logout}>
            <AccountCircleIcon className="icon" />
            <span onClick={Logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
