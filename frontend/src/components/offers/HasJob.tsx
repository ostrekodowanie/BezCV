import { useState } from "react";

export default function HasJob() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-bl-full bg-[#FDEEC9] absolute right-0 top-0 z-10 py-2 px-8 flex justify-center items-center"
    >
      <span className="text-[#EAAD06] font-semibold text-[.75rem]">
        Kontakt ma już pracę
      </span>
      <div
        className={`transition-opacity shadow-[0px_6px_52px_-2px_rgba(211,161,25,0.22)] absolute top-[110%] right-4 flex flex-col hidden md:flex gap-4 p-6 bg-[#FEFAEF] rounded-3xl ${
          hovered
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <h3 className="font-semibold text-center w-max min-w-max mx-4">
          Ten kandydat ma już pracę, ale...
        </h3>
        <p className="text-[.8rem] font-medium text-center text-[#3C4663]">
          Ten kandydat oznaczył, że znalazł już pracę przez bezCV. Natomiast
          zgadza się, żebyś przedstawił mu swoją ofertę.
        </p>
      </div>
    </div>
  );
}
