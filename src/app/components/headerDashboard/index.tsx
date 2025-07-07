import Link from "next/link";
import styles from "./styles.module.scss";

export function HeaderDashboard(){
    return(
        <div className={styles.header}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/car">Register a car</Link>
        </div>
    )
}