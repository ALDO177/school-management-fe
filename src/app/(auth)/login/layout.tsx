import { Geist, Geist_Mono, Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'], // pilih sesuai kebutuhan
    variable: '--font-poppins',
})

export default async function LayoutAuth({ children }: { children?: React.ReactNode }) {
    return (
        <div id="auth-layout" className={`${poppins.variable}`}>
            {children}
        </div>
    )
}