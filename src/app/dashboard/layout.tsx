import { Header } from "../components/header"

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return(
        <>
            <Header />
            {children} {/* Aqui trago a nossa rota para ser renderizada. Tudo que trouxermos acima do children irá ser renderizado */}
        </>
    )
}