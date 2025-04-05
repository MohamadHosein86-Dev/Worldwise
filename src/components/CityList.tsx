import Spinner from "./Spinner";
import style from "./CityItem.module.css";
import styles from "./CityList.module.css";
import Message from "./Message";
import { Link } from "react-router-dom";
import { useContextCity } from "../contexts/CityCountext";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));



  export default function CityList() {
    const {loading , cities ,curCity ,delted_city}=useContextCity();
 
    
    
  if (loading) return <Spinner />;
  if (cities.length === 0) return <Message message="Add your first country" />;

  return (
    <ul className={styles.cityList }>
      {cities.map((res) => (
        <li key={res.id}>
        <Link  to={`${res.id}?lat=${res.position.lat}&lng=${res.position.lng}`} className={`${style.cityItem} ${res.id == curCity.id ? style["cityItem--active"] : ""}`}>
            <span className={style.emoji}>{res.emoji}</span>
            <h3 className={style.name}>{res.cityName}</h3>
            <time className={style.date}>{formatDate(res.date)}</time>
            <button onClick={(x)=>{
              x.preventDefault();
              delted_city(String(res.id))
            }} className={style.deleteBtn}>×</button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
