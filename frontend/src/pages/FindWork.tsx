import { Route, Routes } from "react-router"
import Introduction from "./find_work/Introduction"
import Survey from "./find_work/Survey"

export default function FindWork() {
    return (
        <Routes>
            <Route path='/' element={<Introduction />} />
            <Route path='/ankieta' element={<Survey />} />
        </Routes>
    )
}