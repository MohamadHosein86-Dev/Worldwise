import React, { createContext, useContext, useEffect, useReducer } from "react";

// آدرس API
const URL = "https://67f024672a80b06b88970dde.mockapi.io";

// 📦 مدل‌های داده‌ها
interface City {
  emoji: string;
  name: string;
  country: string;
  cityName: string;
  position: {
    lat: string;
    lng: string;
  };
  date: string;
  id: string;
  notes: string;
}

interface StateType {
  loading: boolean;
  curCity: City;
  cities: City[];
  error: string | null;
}

interface ContextType {
  cities: City[];
  loading: boolean;
  curCity: City;
  getInformationCity: (id: string | undefined) => void;
  creatCity: (city: City) => Promise<void>;
  delted_city: (id: string) => void;
}

interface TypeChild {
  children: React.ReactNode;
}

// 🎯 مقدار اولیه
const initialState: StateType = {
  cities: [],
  loading: false,
  curCity: {
    cityName: "",
    emoji: "",
    date: "",
    id: "",
    name: "",
    country: "",
    notes: "",
    position: {
      lat: "",
      lng: "",
    },
  },
  error: null,
};

// 🎮 Action ها
type ActionType =
  | { type: "loading"; payload: boolean }
  | { type: "curCity"; payload: City }
  | { type: "citiesCreat"; payload: City }
  | { type: "cities"; payload: City[] }
  | { type: "Delte"; payload: string }
  | { type: "error"; payload: string };

// 🎯 Reducer
function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "loading":
      return { ...state, loading: action.payload };
    case "curCity":
      return { ...state, curCity: action.payload };
    case "citiesCreat":
      return { ...state, cities: [...state.cities, action.payload] };
    case "cities":
      return { ...state, cities: action.payload };
    case "Delte":
      return {
        ...state,
        cities: state.cities.filter((res) => res.id !== action.payload),
      };
    case "error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// 🌍 کانتکست
const Context = createContext<ContextType>({
  cities: [],
  loading: false,
  curCity: initialState.curCity,
  getInformationCity: () => {},
  creatCity: async () => {},
  delted_city: () => {},
});

// 💡 Provider
export default function CityProvider({ children }: TypeChild) {
  const [{ cities, loading, curCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // گرفتن لیست اولیه شهرها
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading", payload: true });
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities", payload: data });
      } catch {
        dispatch({ type: "error", payload: "There is an error in cities..." });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    }

    fetchCities();
  }, []);

  // گرفتن اطلاعات یک شهر خاص
  async function getInformationCity(id: string | undefined) {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "curCity", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "There is an error in curCity.... ",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  // اضافه کردن شهر
  async function creatCity(city: City) {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "citiesCreat", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "There is an error in create city...",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  // حذف شهر
  async function delted_city(id: string) {
    try {
      dispatch({ type: "loading", payload: true });
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "Delte", payload: id });
    } catch {
      dispatch({
        type: "error",
        payload: "There is an error in delete city...",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <Context.Provider
      value={{ cities, loading, curCity, getInformationCity, creatCity, delted_city }}
    >
      {children}
    </Context.Provider>
  );
}

// استفاده از context
export function useContextCity() {
  return useContext(Context);
}
