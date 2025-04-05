import  { createContext, useContext, useReducer, ReactNode } from "react";


interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
interface State {
  user: User | "";
  isAuthenticated: boolean;
  erro: string;
}
interface LoginAction {
  type: "login";
  payload: User;
}
interface LogoutAction {
  type: "logout";
}

type Action = LoginAction | LogoutAction;

const initialState: State = {
  user: "",
  isAuthenticated: false,
  erro: ""
};
const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz"
};

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | "";
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: "",
  login: () => {},
  logout: () => {}
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case "logout":
      return initialState;
    default:
      return state;
  }
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(reducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthen() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuthen };