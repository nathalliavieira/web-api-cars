"use client"

import { useState } from "react";
import styles from "./styles.module.scss";

import { api } from "@/services/api";
import { CarsSalesProps } from "@/lib/carsSale.type";

import { toast } from "sonner";

interface SearchCarProps{
    setCars: (cars: CarsSalesProps[]) => void;
}

export function SearchCar({setCars}: SearchCarProps){
    const [input, setInput] = useState<string>("");

    async function handleSearch(input: string){
        try{
            const response = await api.get("/carname", {
            params: {
                car_name: input,
            },
        });

            setCars(response.data);

            setInput("");

            if(response.data.length <= 0){
                toast.warning("No cars found!");
            }

            
        }
        catch(err){
            console.log("No cars found");
            setCars([]);
        }
    }

    return(
        <div className={styles.search}>
            <input 
                placeholder="Enter the car name..." 
                type="text" 
                name="search" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => handleSearch(input)}>Search</button>
        </div>
    )
}