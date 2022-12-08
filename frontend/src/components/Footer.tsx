export default function Footer() {
    return (
        <footer className="bg-footer padding py-10 flex items-center justify-center shadow-[0px_-10px_130px_rgb(15,50,235,0.05)]">
            <div className="flex flex-col sm:grid grid-cols-2 gap-12 sm:gap-6 xl:flex xl:flex-row flex-wrap justify-between w-full">
                <ContactDetails />
                <ServiceLinks />
                <ForClients />
                <ForStations />
            </div>
        </footer>
    )
}

const ContactDetails = () => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">E-Diagnosta</h3>
            <ul className="flex flex-col gap-3 font-medium text-sm">
                <li className="flex items-center">
                    <span>Warszawa, ul. Przykład 2/12</span>
                </li>
                <li className="flex items-center">
                    <span>ediagnosta@mail.com</span>
                </li>
                <li className="flex items-center">
                    <span>+48 617 378 684</span>
                </li>
            </ul>
            <div className="flex items-center gap-4 my-4">
                <div className="h-12 w-12 bg-white rounded shadow-[0px_0px_33px_rgba(0,40,250,0.1)]">

                </div>
                <div className="h-12 w-12 bg-white rounded shadow-[0px_0px_33px_rgba(0,40,250,0.1)]">

                </div>
            </div>
            <h3 className="text-sm font-semibold">Płać bezpiecznie z: Przelewy24</h3>
        </div>
    )
}

const ServiceLinks = () => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Serwis</h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
                <li>Cookies</li>
                <li>O nas</li>
                <li>Kontakt</li>
                <li>Polityka Prywatności</li>
                <li>RODO</li>
            </ul>
        </div>
    )
}

const ForClients = () => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Dla klientów</h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
                <li>PSKP</li>
                <li>OSKP</li>
                <li>Opinie</li>
                <li>Zaloguj się</li>
                <li>Stwórz konto</li>
            </ul>
        </div>
    )
}

const ForStations = () => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Dla PSKP i OSKP</h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
                <li>Dołącz do E-Diagnosty</li>
                <li>Promuj stację</li>
            </ul>
        </div>
    )
}