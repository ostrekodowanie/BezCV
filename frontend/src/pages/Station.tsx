import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { StationProps } from "./SKP";

interface Details {
    address: string
}

const initialDetails = {
    address: ''
}

export default function Station(props: StationProps) {
    const [details, setDetails] = useState<Details>(initialDetails)
    useEffect(() => {
        axios.get('/api/' + props.slug)
            .then(res => res.data)
            .then(data => setDetails(data))
    }, [])

    if(!details.address) return <Loader className="mx-auto" />

    return (
        <h1>{props.name}</h1>
    )
}