import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import Butten from './Butten';
import useparams1 from '../hooks/useparams';
import Spinner from './Spinner';
import Message from './Message';
import { useContextCity } from '../contexts/CityCountext';

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
const babel = "https://api.bigdatacloud.net/data/reverse-geocode-client";

interface State {
  cityName: string;
  cityNameInput: string;
  emoji: string;
  date: Date;
  notes: string;
  error: string;
  country: string;
  looding: boolean; // اصلاح شده از looding به loading
  lat: string;
  lng: string;
}

type Action =
  | { type: "city"; payload: string }
  | { type: "country"; payload: string }
  | { type: "error"; payload: string }
  | { type: "emoji"; payload: string }
  | { type: "notes"; payload: string }
  | { type: "date"; payload: string }
  | { type: "cityNameInput"; payload: string }
  | { type: "looding"; payload: boolean } // اصلاح شده از looding به loading
  | { type: "lat"; payload: string }
  | { type: "lng"; payload: string };

const initialState: State = {
  cityName: "",
  cityNameInput: "",
  lat: "",
  lng: "",
  emoji: "",
  date: new Date(),
  notes: "",
  error: "",
  country: "",
  looding: false, // اصلاح شده از looding به loading
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "city":
      return {
        ...state,
        cityName: action.payload,
      };
    case "country":
      return {
        ...state,
        country: action.payload,
      };
    case "lat":
      return {
        ...state,
        lat: action.payload,
      };
    case "lng":
      return {
        ...state,
        lng: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "emoji":
      return {
        ...state,
        emoji: action.payload,
      };
    case "notes":
      return {
        ...state,
        notes: action.payload,
      };
    case "cityNameInput":
      return {
        ...state,
        cityNameInput: action.payload
      };
    case "looding": // اصلاح شده از looding به loading
      return {
        ...state,
        looding: action.payload
      };
    default:
      return state;
  }
}

function Form() {
  const [{ cityName, emoji, date, notes, looding, country ,lat , lng}, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  const [map_lat, map_lng] = useparams1();
  const { creatCity, loading } = useContextCity();

  useEffect(() => {
    async function callback() {
      try {
        dispatch({ type: "looding", payload: true });

        const res1 = await fetch(`${babel}?latitude=${map_lat}&longitude=${map_lng}`);
        const res2 = await res1.json();
        console.log(res2);
        
        dispatch({ type: "city", payload: res2.city });
        dispatch({ type: "country", payload: res2.countryName });
        dispatch({ type: "lat", payload: res2.latitude });
        dispatch({ type: "lng", payload: res2.longitude });
        dispatch({ type: "emoji", payload: convertToEmoji(res2.countryCode) });
        
        if (!res2.countryCode) {
          new Error("there is no country information for this location");
        }
      }
      catch (error) {
        dispatch({ type: "error", payload: String(error) });
      }
      finally {
        dispatch({ type: "looding", payload: false });
      }
    }
    callback();
  }, [map_lat, map_lng]);

  if (!map_lat && !map_lng) return <Message message='Please first click on the map' />;
  if (looding) return <Spinner />;

  interface TypeNewCity {
    country: string;
    cityName: string;
    emoji: string;
    date: string;
    notes: string;
    position: { lat: string; lng: string };
    id: string; // Add the id property that might be required
    name: string; // Add the name property that might be required
  }

  async function handlesubmit(x: React.FormEvent<HTMLFormElement>) {
    x.preventDefault();

    const newCity: TypeNewCity = {
      country,
      cityName,
      date: date.toString(),
      emoji,
      notes,
      position: { lat, lng },
      id: `${Math.random()}`, // Assigning a random ID for now
      name: cityName, // Assigning name based on the cityName
    };

    await creatCity(newCity); 
    navigate("/AppLayout");
  }

  return (
    <form className={`${styles.form} ${loading ? styles.loading : ""}`} onSubmit={handlesubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName"
          onChange={(x) => dispatch({ type: "cityNameInput", payload: x.target.value })}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(x) => dispatch({ type: "date", payload: x.target.value })}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(x) => dispatch({ type: "notes", payload: x.target.value })}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Butten onClick={()=>{}} type="primary">Add</Butten>
        <Butten onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }} type="back"> &larr; Back</Butten>
      </div>
    </form>
  );
}

export default Form;
