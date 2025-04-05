import { useNavigate } from "react-router-dom";
import { useAuthen } from "../contexts/AuthemProvider1";
import styles from "./User.module.css";

// تعریف نوع برای user
interface User {
  avatar: string;
  name: string;
}


function User() {
  const { user, logout } = useAuthen();
  const navigate = useNavigate();

  function handleClick(): void {
    logout();
    navigate("/");
  }
  if (!user) {
    return "";
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;