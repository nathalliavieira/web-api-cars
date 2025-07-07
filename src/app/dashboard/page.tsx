import { HeaderDashboard } from "../components/headerDashboard";
import { CarsSalesUser } from "./car/components/carsSalesUser";

import { api } from "@/services/api";
export const runtime = 'nodejs';
import { getCookieServer } from "@/lib/cookieServer";

import { CarsSalesProps } from "@/lib/carsSale.type";

async function getCars(): Promise<CarsSalesProps[] | []>{
    try{
        const token = await getCookieServer();

        const response = await api.get("/cars/detail", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data || [];

    }catch(err){
        console.log(err);
        return [];
    }
}

export default async function Dashboard(){

    const cars = await getCars();

    return(
        <>
            <HeaderDashboard/>
            <CarsSalesUser cars={cars}/>
        </>
    )
}