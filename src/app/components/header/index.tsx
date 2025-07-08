"use client"

import Link from "next/link";
import logoImage from "../../../../public/logo.png"
import { FiUser, FiLogIn } from "react-icons/fi";
import Image from "next/image";
import styles from "./styles.module.scss";

import { getCookieClient, deleteCookieClient } from "@/lib/cookieClient";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export function Header(){
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        async function ValidateToken(){
            const token = await getCookieClient();

            if(token){
                setIsToken(true);
            }
        }

        ValidateToken();
    },[]);

    function handleLogout(){
        deleteCookieClient();
        setIsToken(false);
        redirect("/");
    }

    function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        window.location.href = "/";
    }
    
    return(
        <div className={styles.container}>
            <header>
                <Link 
                    href="/" 
                    onClick={handleLogoClick}
                    className={styles.logoImage}
                >
                <Image 
                    src={logoImage} 
                    alt="Logo do site" 
                    fill
                />
                </Link>

                {isToken && (
                    <div className={styles.buttonsToken}>
                        <Link href="/dashboard" className={styles.linkDashboard}>
                            <span className={styles.pcWidth}>Go to dashboard</span>
                            <span className={styles.mobileWidth}>Dashboard</span>
                        </Link>
                        <button onClick={handleLogout}><FiLogIn className={styles.fiLogin} /></button> 
                        {/* //SE CLICARMOS NO BOTAO ACIMA, IREMOS DELETAR O TOKEN E A PESSOA IRÁ SER REDIRECIONADA PARA A PAGINA HOME */}
                    </div>
                )}
                
                {!isToken && (
                    <Link href="/session">
                        <div className={styles.login}>
                            <FiUser size={24} color="#000" />
                        </div>
                    </Link>
                )}
                
            </header>
        </div>
    )
}