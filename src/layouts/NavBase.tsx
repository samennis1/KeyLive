import { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";

export default function NavBase({children}: PropsWithChildren) {
    return (
        <>
        <Navbar />
        <main>{children}</main>
        </>
    )
}