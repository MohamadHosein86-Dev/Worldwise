import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Butten from "../components/Butten";
import { useAuthen } from "../contexts/AuthemProvider1";
import { useNavigate } from "react-router-dom";





export default function Login() {  
  const {login , isAuthenticated} =useAuthen();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  
  function handlesubmit(x:React.FormEvent<HTMLFormElement>) {
    x.preventDefault();
    if (email && password) login(email , password) ;
  }
  useEffect(()=>{
    if(isAuthenticated) navigate("/AppLayout",{replace:true});
  },[isAuthenticated ,navigate]);

  return (
    <main className={styles.login}>
        <Navigation />
      <form className={styles.form} onSubmit={handlesubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
         <Butten type="primary" onClick={()=>{}}>
          Login
         </Butten>
        </div>
      </form>
    </main>
  );
}
