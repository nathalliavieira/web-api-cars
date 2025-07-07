"use client"

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.png";

import { useState } from "react";
import {toast} from "sonner";

export default function SingUp(){
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        
        const name = formData.get("name"); //O que esta entre ("") é o nome do nosso input

        const email = formData.get("email");

        const password = formData.get("password");

        //testamos se todos os campos foram realmente preenchidos:
        if(!name || !email || !password){
            toast.warning("Please fill in all fields.");
            return;
        }

        setLoading(true);

        //Agora iremos fazer de fato a requisicao:
        try{

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                // Exemplo: sua API pode enviar { message: "User already exists." }
                toast.error(data.message || "Failed to create account.");
                return;
            }

            toast.success("Account created successfully! You can now log in.");
            window.location.href = "/session"; // redireciona para login

        }catch(err){
            console.log(err);
            toast.error("Unexpected error occurred.");
        }finally { //Sem o finally, você teria que repetir setLoading(false) em dois lugares: no final do try e também no catch. Você escreve setLoading(false) apenas uma vez, e ele sempre será executado, mesmo se: A requisição for bem-sucedida; Der erro no fetch; Houver um return dentro do try.
            setLoading(false);
        }
    }

    return(
        <div className={styles.container}>
            <Link href="/" className={styles.pageHome}>
                <Image src={logoImg} alt="Site Logo" className="w-full"/>
            </Link>

            <form className={styles.form} onSubmit={onSubmit}>
                <input type="text" required placeholder="Enter your full name..." name="name" />

                <input type="email" required placeholder="Enter your best email..." name="email" />

                <input type="password" required placeholder="********" name="password" />

                <button type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</button>
            </form>

            <Link href="/session">Already have an account? Log in!</Link>
        </div>
    )
}