import { NavLink } from "react-router-dom"
import styles from "./AppNav.module.css"

export default function App_Nav() {
  return (
    <nav className={styles.nav}>
        <ul>
            <li>
                <NavLink to="cityes">Cityes</NavLink>
            </li>
            <li>
                <NavLink to="counteryes">Counteryes</NavLink>
            </li>
        </ul>
    </nav>
  )
}
