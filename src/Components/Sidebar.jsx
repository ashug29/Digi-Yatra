import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useContext } from "react";
import { Toggle } from "./GlobalState";
export function Sidebar(){
    const location=useLocation();
    const [toggle,setToggle]=useContext(Toggle)
    const list = [
        { name: "Search Flight", path: "/search-flight" },
        { name: "Passenger Details", path: "/passenger-details" },
        { name: "Select Seat", path: "/select-seat" },
        { name: "Boarding Pass", path: "/boarding-pass" },
        { name: "Self Check-in", path: "/self-checkin" },
        { name: "Conclusion", path: "/conclusion" }
    ];
    return (
        <div className="sidebar-container">
        <div className={toggle?"sidebar":"sidebar-inactive"}>
            <div className={toggle?"sidebar-list":"sidebar-list-inactive"}>
                {list.map((x)=>(
                    <Link
                     to={x.path}
                     className={`sidebar-buttons ${location.pathname === x.path ? "active" : ""}`}>
                        {x.name}
                    </Link>
                ))}
            </div>
        </div>
        <div className={toggle?"toggle":"toggle-inactive"} onClick={()=>{setToggle(!toggle)}}>
            {toggle?"<<":">>"}
        </div>
        </div>
    );
}