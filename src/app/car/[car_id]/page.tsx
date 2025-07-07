import { CarsSalesProps } from "@/lib/carsSale.type";
import { Header } from "@/app/components/header";

import SwiperImage from "@/app/dashboard/car/components/swiperImages";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./styles.module.scss";

// Use fetch ao invés de axios para compatibilidade com Edge Runtime
async function getCarData(car_id: string): Promise<CarsSalesProps> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/car/${car_id}`, {
        // Isso ajuda com cache/revalidação em edge/server
        next: { revalidate: 60 },
});

    if (!res.ok) throw new Error("Failed to fetch car data");
    return res.json();
}

type CarPageProps = {
    params: {
        car_id: string;
    };
};

export default async function CarDetailPage({ params }: CarPageProps) { //Quando usamos rotas dinâmicas ([car_id]) no Next.js App Router, os parâmetros da URL são passados dentro de um objeto chamado params
    const car = await getCarData(params.car_id);

    return(
        <>
            <Header />
            <SwiperImage images={car.images} />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.info1}>
                        <h1>{car.car_name}</h1>
                        <h1>€ {car.price}</h1>
                    </div>

                    <p>{car.model}</p>

                    <div className={styles.infos}>
                        <div className={styles.info2}>
                            <div>
                                <strong>City</strong>
                                <p>{car.city}</p>
                            </div>
                            <div>
                                <strong>Year</strong>
                                <p>{car.year}</p>
                            </div>
                        </div>

                        <div className={styles.info2}>
                            <div>
                                <strong>KM</strong>
                                <p>{car.km}</p>
                            </div>
                        </div>
                    </div>

                    <strong>Description:</strong>
                    <p>{car.description}</p>

                    <strong>Phone / WhatsApp</strong>
                    <p>{car.phone}</p>

                    <a href={`https://api.whatsapp.com/send?phone=${car.phone}&text=Hello, I saw this ${car.car_name} and I'm interested!`} className={styles.buttonPhone} target="_blank" rel="noopener noreferrer"> {/* aqui usamos a e nao link porque o a permite com que a url seja aberta em outra aba do navegador */}
                    Talking to the seller
                        <FaWhatsapp size={26} color="#FFF"/>
                    </a>
                </div>
            </main>
        </>
    )
}