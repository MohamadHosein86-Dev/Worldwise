
import Sidbar from "./Sidbar";
import Map from "./Map";
import styles from "./AppLayout.module.css"
import User from "./User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidbar/>
      <Map />
      <User />
    </div>
  )
}
