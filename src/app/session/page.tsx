"use client"

import styles from "./styles.module.scss";
import Link from "next/link";
import logoImg from "../../../public/logo.png";
import Image from "next/image";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { handleLogin } from "./actions";

export default function Login(){
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    useEffect(() => {
        if(error === "missing-fields"){
            toast.warning("Fill in all fields.");
        } else if(error === "invalid-credentials"){
            toast.error("Email or password incorrect.");
        }
    },[error]);

    return(
        <div className={styles.container}>
            <Link href="/" className={styles.pageHome}>
                <Image src={logoImg} alt="Site Logo" />
            </Link>

            <form className={styles.form} action={handleLogin}>
                    <input type="email" required placeholder="Enter your email..." name="email" />

                    <input type="password" required placeholder="*******" name="password" />

                <button type="submit">Log in</button>
            </form>

            <Link href="/singup">Don't have an account yet? Sign up here.</Link>
        </div>
    )
}