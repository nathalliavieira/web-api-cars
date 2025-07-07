"use client"

import styles from "./styles.module.scss";
import Link from "next/link";
import logoImg from "../../../public/logo.png";
import Image from "next/image";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { handleLogin } from "./actions";

export default function Login(){
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setLoading(true);

    const result = await handleLogin(formData);

    setLoading(false);

    if (result?.error === "missing-fields") {
        toast.warning("Fill in all fields.");
    } else if (result?.error === "invalid-credentials") {
        toast.error("Email or password incorrect.");
    } else if (result?.success) {
      // login ok, redireciona na mão
        window.location.href = "/dashboard";
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