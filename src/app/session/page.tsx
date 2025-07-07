"use client"

import styles from "./styles.module.scss";
import Link from "next/link";
import logoImg from "../../../public/logo.png";
import Image from "next/image";

import { useState } from "react";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

export default function Login(){
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");

            if(!email || !password){
                toast.warning("Fill in all fields.");
                return;
            }

            setLoading(true);

            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/session`, {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (!response.ok ||!data.token) {
                    toast.error(data.message || "Email or password incorrect.");
                    return;
                }
        
                // Salva o cookie com cookies-next
                setCookie("token", data.token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                });

                toast.success("Login successful!");
                window.location.href = "/dashboard";
            }catch(err){
                console.log(err);
                toast.error("An unexpected error occurred.");
            }finally {
            setLoading(false);
            }
    }

    return(
        <div className={styles.container}>
            <Link href="/" className={styles.pageHome}>
                <Image src={logoImg} alt="Site Logo" />
            </Link>

            <form className={styles.form} onSubmit={onSubmit}>
                    <input type="email" required placeholder="Enter your email..." name="email" />

                    <input type="password" required placeholder="*******" name="password" />

                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Log in"}</button>
            </form>

            <Link href="/singup">Don't have an account yet? Sign up here.</Link>
        </div>
    )
}