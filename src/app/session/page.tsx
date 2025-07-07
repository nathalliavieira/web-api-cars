import styles from "./styles.module.scss";
import Link from "next/link";
import logoImg from "../../../public/logo.png";
import Image from "next/image";

import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { toast } from "sonner";

export default function Login(){
    async function handleLogin(formData: FormData){
        "use server"

        const email = formData.get("email");
        const password = formData.get("password");

        if(email === "" || password === ""){
            toast.warning("Fill in all fields.");
            return;
        }

        try{
            const response = await api.post("/session", {
                email,
                password
            }) //Aqui armazenamos dentro de uma const response porque queremos pegar as informacoes do usuario, no caso só queremos aceitar usuarios que tenham token, porque temos rotas que passam por autenticacao de usuario.

            //1- verificamos se realmente tem token
            if(!response.data.token){
                toast.error("Email or password incorrect.");
                return;
            }

            //2- Iremos guardar o token em um cookie. Para isso iremos importar a biblioteca cookies.

            const expressTime = 60 * 60 * 24 * 30 * 1000; //Aqui equivale a 30 dias

            (await cookies()).set("token", response.data.token, {
                maxAge: expressTime, //Entre {} precisamos passar algumas propriedades "obrigatorias", no caso o maxAge é o prazo de validade do token e geralmente passamos em minutos, segundos e etc. por isso criamos uma constante fora do cookie
                path: "/", //A partir de qual caminho queremos acessar-lo, aqui estamos dizendo que sao todos os caminhos a partir da nossa home
                httpOnly: false,
                secure: process.env.NODE_ENV === "production"
            }) //entre "" é o nome que queremos salvar, e depois vem O QUE queremos salvar. 

        }catch(err){
            toast.error("Email or password incorrect.");
            console.log(err);
            return;
        }

        redirect("/dashboard");
    }

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