//Arquivo para quando queremos buscar o cookie usando um componente server 

import { cookies } from "next/headers";

export async function getCookieServer(){
    const token = (await cookies()).get("token")?.value;

    return token || null;
}