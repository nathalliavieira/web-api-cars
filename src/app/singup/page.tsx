import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.png";

import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function SingUp(){
    async function handleRegister(formData: FormData){ //Como estamos dentro de uma action, o formulario nos envia uma propriedade chamada de formData e é do tipo FormData
        "use server" //Passamos essa diretiva para que essa funcao possa ser executada do lado do servidor. Mas poderiamos transformar a pagina inteira em use client, escrevendo "use client" no topo da pagina.

        //E porque aqui agora utilizamos use server? porque a gente nao quer que o que seja digitado fique de facil acesso para o usuario, porque no caso queremos essas informacoes para armazenar no NOSSO BANCO DE DADOS.

        //capturamos os dados escritos dentro do input:
        const name = formData.get("name"); //O que esta entre ("") é o nome do nosso input

        const email = formData.get("email");

        const password = formData.get("password");

        //testamos se todos os campos foram realmente preenchidos:
        if(name === "" || email === "" || password === ""){
            toast.warning("Fill in all fields.");
            return;
        }

        //Agora iremos fazer de fato a requisicao:
        try{
            //1- importamos a nossa api la em cima

            //2 - fazemos a requisicao
            await api.post("/users", {
                name,
                email,
                password //passamos as propriedades que sao necessárias. Como as propriedades possuem o mesmo nome nao é necessário escrever name: name...
            }) //usamos o metodo post porque é para adicionar uma informacao e usamos a rota /users, que foi a rota que usamos no nosso backend para cadastrar um usuario 

        }catch(err){
            console.log(err);
            return;
        }

        //3- Depois do nosso usuario cadastrado, enviamos ele para a nossa pagina de login. Para isso importamos a biblioteca redirect
        redirect("/session");
    }

    return(
        <div className={styles.container}>
            <Link href="/" className={styles.pageHome}>
                <Image src={logoImg} alt="Site Logo" className="w-full"/>
            </Link>

            <form className={styles.form} action={handleRegister}> {/*usamos uma action para capturar um componente*/}
                <input type="text" required placeholder="Enter your full name..." name="name" />

                <input type="email" required placeholder="Enter your best email..." name="email" />

                <input type="password" required placeholder="********" name="password" />

                <button type="submit">Sign up</button>
            </form>

            <Link href="/session">Already have an account? Log in!</Link>
        </div>
    )
}