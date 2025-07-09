"use client"

import styles from "./pade.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Header } from "./components/header";

import { api } from "@/services/api";
import { CarsSalesProps } from "@/lib/carsSale.type";

import { SearchCar } from "./components/searchCar";

import { useState, useEffect } from "react";

export default function Home() {
  const [cars, setCars] = useState<CarsSalesProps[]>([]);

  useEffect(() => {
    async function loadCars(){
      const response = await api.get("/");

      setCars(response.data);
    }

    loadCars();
  },[])
  
  return (
    <> 
      <Header/>
      <div className={styles.container}>
        <SearchCar setCars={setCars}/>

        <h1 className={styles.title}>New and used cars.</h1>

        <main className={styles.carContainer}>
          {cars.map((car) => (
              <section className={styles.infoCar} key={car.car_id}>

                <Link href={`/car/${car.car_id}`}>
                  <Image className={styles.image} src={car.images[0].url} alt="Car Image" width={280} height={280} unoptimized/>
                  <p>{car.car_name}</p>
                </Link>

                  <div className={styles.info2}>
                      <span>Year {car.year} | {car.km} km</span> 
                      <strong>{car.price} €</strong>
                  </div>

                  <div className={styles.divLine}></div>

                  <div className={styles.info3}>
                    <span>{car.city}</span>
                  </div>
              </section>
              
            )
          )}
        </main>

      </div>
    </>
  );
}
