import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === ""){
        redirect("/login?error=missing-fields");
    }

    try{
        const response = await api.post("/session", {
            email,
            password
        }) //Aqui armazenamos dentro de uma const response porque queremos pegar as informacoes do usuario, no caso só queremos aceitar usuarios que tenham token, porque temos rotas que passam por autenticacao de usuario.

        //1- verificamos se realmente tem token
        if(!response.data.token){
            redirect("/login?error=missing-fields");
        }

        //2- Iremos guardar o token em um cookie. Para isso iremos importar a biblioteca cookies.

        const expressTime = 60 * 60 * 24 * 30 * 1000; //Aqui equivale a 30 dias

        (await cookies()).set("token", response.data.token, {
            maxAge: expressTime, //Entre {} precisamos passar algumas propriedades "obrigatorias", no caso o maxAge é o prazo de validade do token e geralmente passamos em minutos, segundos e etc. por isso criamos uma constante fora do cookie
            path: "/", //A partir de qual caminho queremos acessar-lo, aqui estamos dizendo que sao todos os caminhos a partir da nossa home
            httpOnly: false,
            secure: process.env.NODE_ENV === "production"
        }) //entre "" é o nome que queremos salvar, e depois vem O QUE queremos salvar. 

        redirect("/dashboard");
    }catch(err){
        console.log(err);
        redirect("/login?error=invalid-credentials");
    }
}