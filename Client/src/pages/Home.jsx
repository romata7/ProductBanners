import { useState } from "react"
import { ClientForm } from "../features/clients"

export const Home = () => {
    const [client, setClient] = useState({})
    return (
        <ClientForm client={client} setClient={setClient} />
    )
}