"use client"

import styles from "./styles.module.scss";
import { FiUpload, FiTrash } from "react-icons/fi";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useState } from "react";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ImageProps {
    file: File;
    url: string;
}

export function Form(){
    const router = useRouter();
    const [image, setImage] = useState<ImageProps[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const car_name = formData.get("name");
        const model = formData.get("model");
        const year = formData.get("year");
        const km = formData.get("km");
        const phone = formData.get("phone");
        const city = formData.get("city");
        const price = formData.get("price");
        const description = formData.get("description");

        if(!car_name || !model || !year || !km || !phone || !city || !price || !description){
            toast.warning("Fill in all fields.");
            return;
        }

        //Como vamos enviar uma imagem, precisamos usar o formData:
        const data = new FormData();

        data.append("car_name", car_name);
        data.append("model", model);
        data.append("year", year);
        data.append("km", km);
        data.append("phone", phone);
        data.append("city", city);
        data.append("price", price);
        data.append("description", description);
        
        image.forEach(({file}) => {
            data.append("images", file);
        })

        if (image.length === 0) {
            toast.warning("Add at least one image.");
            return;
        }

        if (image.length < 2) {
            toast.warning("Add at least two images.");
            return;
        }

        try{
            const token = await getCookieClient();

            await api.post("/car", data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            toast.warning("Product registered successfully!");
            router.push("/dashboard");
        }
        catch(err){
            console.log(err);
            return;
        }
    }

    //Aqui vamos criar uma funcao para recebermos, verificarmos e guardamos as nossas imagens dentro de uma useState
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            toast.warning("Upload an image.");
        }
        if(e.target.files){
             // Número total de imagens que já temos
            const totalImages = image.length;

            // Pegando todas as imagens selecionadas (pode ser múltiplo)
            const filesArray = Array.from(e.target.files);

            // Verifica se ao adicionar essas imagens, ultrapassa o limite
            if (totalImages + filesArray.length > 10) {
                toast.warning("You can only send up to 10 images.");
                return;
            }

            // Filtra as imagens permitidas
            const allowedImages = filesArray.filter(
            (image) => image.type === "image/jpeg" || image.type === "image/png"
            );

            if (allowedImages.length !== filesArray.length) {
                toast.warning("Forbidden image format.");
                return;
            }

            const newImages = allowedImages.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));

            // Como precisamos guardar os arquivos originais para envio, crie um estado para isso e faça igual:
            setImage((prev) => [...prev, ...newImages]);
        }
    }

    function handleDelete(url: string){
        setImage(prev => prev.filter(img => img.url !== url));
    }

    return(
        <main className={styles.container}>
            <div className={styles.uploadImage}>
                <label className={styles.labelUpload}>
                    <span>
                        <FiUpload size={30} color="#000" />
                    </span>
                    <input type="file" accept="image/png, image/jpeg" required className={styles.inputImage} onChange={handleFile}/>
                </label>

                {image.map(({url},index) => (
                    <div className={styles.imageDelete} key={index}>
                        <button className={styles.icon} type="button" onClick={() => handleDelete(url)}>
                            <FiTrash size={28} color="#FFF" />
                        </button>
                        <Image alt="Preview Image" src={url} className={styles.preview} width={192} height={128} unoptimized/> 
                    </div>
                ))} {/* unoptimized é necessário porque você está usando uma URL blob: (local), que o Next.js não consegue otimizar como imagens vindas de um servidor. */}
            </div>

            <div className={styles.containerForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.infoCar}>
                        <p>Car name</p>
                        <input type="text" name="name" placeholder="Ex: Onix 1.0" required/>
                    </div>

                    <div className={styles.infoCar}>
                        <p>Car model</p>
                        <input type="text" name="model" placeholder="Ex: 1.0 Flex Plus Manual" required/>
                    </div>

                    <div className={styles.infoCar2}>
                        <div>
                            <p>Year</p>
                            <input type="text" name="year" placeholder="Ex: 2019/2019" required/>
                        </div>

                        <div>
                            <p>Km</p>
                            <input type="text" name="km" placeholder="Ex: 105.000" required/>
                        </div>
                    </div>

                    <div className={styles.infoCar2}>
                        <div>
                            <p>Phone/WhatsApp</p>
                            <input type="text" name="phone" placeholder="Ex: 123458963" required/>
                        </div>

                        <div>
                            <p>City</p>
                            <input type="text" name="city" placeholder="Ex: Madrid" required/>
                        </div>
                    </div>

                    <div className={styles.infoCar}>
                        <p>Price:</p>
                        <input type="text" name="price" placeholder="Ex: 69.000" required/>
                    </div>

                    <div className={styles.infoCar}>
                        <p>Description</p>
                        <textarea
                        name="description"
                        required
                        placeholder="Enter the full description of the car."
                        className={styles.textArea} 
                        />
                    </div>

                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>
        </main>
    )
}