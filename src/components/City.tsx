import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useContextCity } from "../contexts/CityCountext";
import Butten from "./Butten";

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date ?? Date.now())); // Fallback to current date if date is null

function City() {
  const navigate = useNavigate();
  const { curCity, getInformationCity } = useContextCity();
  const { id } = useParams();
  const { cityName, emoji, date, notes } = curCity;

  useEffect(() => {
    if (id) {
      getInformationCity(id);
    }
  }, [id, getInformationCity]);

  return (
    <>
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        <div>
          <Butten type="back" onClick={() => navigate(-1)}>
            &larr; Back
          </Butten>
        </div>
      </div>
      <h1>{cityName}</h1>
    </>
  );
}

export default City;
