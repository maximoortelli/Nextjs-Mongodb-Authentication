"use client";
import {useSession} from "next-auth/react";

function Dashboarpage(){

    const {data: session, status} = useSession();
    console.log(session, status);
  return (
    <div>Dashboardpage</div>
  )
}

export default Dashboarpage;