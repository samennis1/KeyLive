import { PropsWithChildren } from "react";

export default function NavBase({children}: PropsWithChildren) {
    return (
        <>
        <main>{children}</main>
        </>
    )
}