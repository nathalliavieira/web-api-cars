"use client"

import styles from "./styles.module.scss";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";

import { CarsSalesProps } from "@/lib/carsSale.type";

import { api } from "@/services/api";
export const runtime = 'nodejs';
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props{
    cars: CarsSalesProps[];
}

export function CarsSalesUser({cars}: Props){
    const router = useRouter();

    async function handleDelete(car_id: string){
        try{
            const token = await getCookieClient();

            await api.delete(`/car?car_id=${car_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            toast.warning("Car deleted successfully!");
            router.refresh();
        } catch(err){
            console.log(err);
            return;
        }
    }

    return(
        <main className={styles.container}>
            {cars.length === 0 && (
                <span className={styles.withoutCars}>No cars registered yet...</span>
            )}

            {cars.map((car) => {
                return(
                    <section className={styles.infosCar} key={car.car_id}>
                        <div>
                            <button onClick={() => handleDelete(car.car_id)} type="button">
                                <FiTrash2 size={26} color="#000"/>
                            </button>
                        </div>
                        
                        
                        <div>
                            <Link href={`car/${car.car_id}`}>
                                <Image src={car.images[0].url} alt="Car Image" width={280} height={280} unoptimized/>
                                <p>{car.car_name}</p>
                            </Link>

                            <div className={styles.infosCar2}>
                                <span>Year {car.year} | {car.km} km</span> 
                                <strong> € {car.price}</strong>
                            </div>

                            <div className={styles.line}></div>

                            <div className={styles.infosCar3}>
                                <span>{car.city}</span>
                            </div>
                        </div>
                        
                    </section>
                )
                
            })}
            
        </main>
    )
}