import { Route, Routes } from "react-router"
import Introduction from "./survey/Introduction"
import Survey from "./survey/Survey"

export default function FindWork() {
    return (
        <Routes>
            <Route path='/' element={<Introduction />} />
            <Route path='/ankieta' element={<Survey />} />
        </Routes>
    )
}