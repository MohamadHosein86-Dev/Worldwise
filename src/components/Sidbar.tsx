import { Outlet } from "react-router-dom";
import Logo from "../Components_Pages/Logo";
import styles from "./Sidebar.module.css";
import App_Nav from "./App_Nav";
export default function Sidbar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <App_Nav />

      <Outlet />
    
      <footer className={styles.footer}>
         <p className={styles.copyright}>
            &copy; Copyright {new Date().getFullYear()} by 
            WorldWise Inc.
         </p>
      </footer>

    </div>
  )
}
