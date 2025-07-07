import { NextRequest, NextResponse } from "next/server";   

import { getCookieServer } from "./lib/cookieServer";

import { api } from "./services/api";
export const runtime = 'nodejs';

export async function middleware(req: NextRequest){
    //1- Coletamos a rota
    const {pathname} = req.nextUrl; //O nextUrl devolve para a gente o nome da rota, no caso devolveria "/dashboard", "details"...

    //2- fazemos uma condicional para as paginas nas quais pertimos o usuario acessar sem precisar do token:
    if(pathname.startsWith("/_next") || pathname === "/"){ //*O primeiro pathname é um padrao do nextjs, sempre precisará ter
        return NextResponse.next();
    }

    //3- Agora pegamos nosso cookie, para isso, dentro de src precisamos criar um new folder chamado lib (ver pasta) e também precisamos instalar um biblioteca chamada cookies-next: npm install cookies-next.
    //Vamos inportar o nosso cookie do lado do client la em cima:

    const token = await getCookieServer();
    
    //4- verificamos a rota:
    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url));
        }

        //7- Se o token que verificamos abaixo for válido entao:
        const isValid = await validateToken(token);

        if(!isValid){
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

//5- Verificamos de o token é válido:
async function validateToken(token: string){
    if(!token) return false;

    try{
        //6- importamos a nossa api la em cima e inicializamos ela aqui:
        await api.get("/me", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}