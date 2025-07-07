import { HeaderDashboard } from "../components/headerDashboard";
import { CarsSalesUser } from "./car/components/carsSalesUser";

import { getCookieServer } from "@/lib/cookieServer";

import { CarsSalesProps } from "@/lib/carsSale.type";

async function getCars(): Promise<CarsSalesProps[] | []>{
    try{
        const token = await getCookieServer();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cars/detail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store", // importante para não cachear dados dinâmicos
        });

        if (!res.ok) {
            console.error(`Erro ao buscar carros: ${res.status}`);
            return [];
        }

        const data = await res.json();
        return data || [];

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