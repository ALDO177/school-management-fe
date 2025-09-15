'use server'

import Spinner from "@components/spiner";
import { unauthorized } from "next/navigation";

export default async function Home() {
  try {
    return (
      <main className="flex justify-center h-screen items-center flex-col">
        <Spinner/>
      </main>
    )
  } catch (err) {
    unauthorized()
  }
}
