import { Route, Routes } from "react-router"
import Introduction from "./find_work/Introduction"
import WorkForm from "./find_work/WorkForm"

export default function FindWork() {
    return (
        <Routes>
            <Route path='/' element={<Introduction />} />
            <Route path='/ankieta' element={<WorkForm />} />
        </Routes>
    )
}