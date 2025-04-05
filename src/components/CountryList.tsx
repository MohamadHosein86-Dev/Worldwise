import styles from "./CountryList.module.css";
import style10 from "./CountryItem.module.css";
import Spinner from "./Spinner";
import { useContextCity } from "../contexts/CityCountext";


interface type__res_country {
  emoji: string;
  country: string;
}

export default function Country() {
  const { cities, loading } = useContextCity();

  const country = cities.reduce((arr, city) => {
    if (!arr.some((item) => item.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, [] as type__res_country[]);
  


  
  if (loading) return <Spinner />;

  return (
    <ul className={styles.countryList}>
      {country.map((res) => (
        <li className={style10.countryItem} key={res.country}>
          <span>{res.emoji}</span>
          <span>{res.country}</span>
        </li>
      ))}
    </ul>
  );
}
