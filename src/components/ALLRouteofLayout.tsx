import React, { useEffect } from "react"
import { useAuthen } from "../contexts/AuthemProvider1"
import { useNavigate } from "react-router-dom";

interface type_child{
    children:React.ReactNode
}


export default function ALLRouteofLayout({children}:type_child) {
    const {isAuthenticated}= useAuthen();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!isAuthenticated) navigate("/") 
    },[isAuthenticated , navigate]);

  return children
}
