import {  NavLink } from 'react-router-dom'
import style from "./PageNav.module.css"
import Logo from './Logo'

export default function Navigation() {
  return (
    <nav className={style.nav}>
     <Logo />
    <ul>
    <ul>
        <NavLink to="/pricing">Pricing</NavLink>
      </ul>
      <ul>
        <NavLink to="/product">product</NavLink>
      </ul>
      <ul>
        <NavLink className={style.ctaLink} to="/login">login</NavLink>
      </ul>
    </ul>
    </nav>
  )
}
