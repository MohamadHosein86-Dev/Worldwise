import style from "./Button.module.css"

interface type_btn{
    children:string,
    type:string,
    onClick:(x:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}

export default function Butten( {children , type , onClick}:type_btn ) {
  return (
   <button className={`${style.btn} ${style[type]}`} onClick={onClick}> {children} </button>
  )
}
