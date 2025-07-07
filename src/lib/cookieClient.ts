//Arquivo para quando queremos buscar o cookie usando um componente client

import { deleteCookie, getCookie } from "cookies-next";
export const runtime = 'nodejs';

export function getCookieClient(): string | null{
    const token = getCookie("token");

    // cookies-next pode retornar string ou undefined, então normalizamos
    if (typeof token === "string") {
        return token;
    }

    return null;
}

//Adicionamos uma funcao para deletar o cookie do cliente quando ele quiser fazer o logout
export function deleteCookieClient(){
    deleteCookie("token");
}