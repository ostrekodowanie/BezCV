import Control, { Controller } from "react-control-js";
import { wn1, wn2, wn3 } from "../../../assets/home/candidate/candidate";

interface BoxProps {
  image: string;
  desc: string;
}

const boxes: BoxProps[] = [
  {
    image: wn1,
    desc: "prześlemy Ci drogą mailową podsumowanie Twojego zgłoszenia",
  },
  {
    image: wn2,
    desc: "będziemy na bieżąco monitorować dostępne oferty pracy dla Ciebie",
  },
  {
    image: wn3,
    desc: "powiadomimy Cię kiedy pracodawca będzie chciał się z Tobą skontaktować, żeby złożyć Ci propozycję pracy ",
  },
];

export default function WhatNext() {
  return (
    <section className="padding py-[1in] md:py-[1.4in] 2xl:py-[1.8in] items-center relative">
      <h2 className="text-center text-3xl xl:text-4xl font-bold mb-8">
        Co dalej?
      </h2>
      <Controller
        opacity={1}
        onScroll={true}
        stagger={80}
        ease="ease-out"
        className="flex flex-col gap-8 lg:grid grid-cols-3 xl:items-stretch"
      >
        {boxes.map((box) => (
          <Control element={<Box {...box} />} key={box.image} />
        ))}
      </Controller>
    </section>
  );
}

const Box = ({ image, desc }: BoxProps) => {
  return (
    <div className="rounded-xl shadow-secondaryBig px-6 py-8 md:px-10 md:py-12 flex flex-col gap-8 w-full h-full relative">
      <img
        className="max-w-[.8in] h-[1in] lg:max-w-[1.1in] lg:h-[1.3in]"
        src={image}
        alt=""
      />
      <p className="font-medium text-base text-[#444444]">{desc}</p>
      <div className="bg-secondary absolute rounded-full h-2 right-0 left-0 bottom-0" />
    </div>
  );
};
