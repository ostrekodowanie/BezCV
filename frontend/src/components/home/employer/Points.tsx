import {
  bestseller,
  package1,
  package2,
  package3,
  priceUnderline,
  titleUnderline,
} from "../../../assets/points/points";
import Control, { Controller } from "react-control-js";
import { underline } from "../../../assets/home/candidate/candidate";
import { pointsMan } from "../../../assets/home/employer/employer";

interface PackageProps {
  image: string;
  points: number;
  price: number;
}

const packages: PackageProps[] = [
  {
    image: package1,
    points: 10,
    price: 499,
  },
  {
    image: package2,
    points: 15,
    price: 699,
  },
  {
    image: package3,
    points: 20,
    price: 899,
  },
];

export default function Points() {
  return (
    <section className="padding py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen">
      <div className="flex flex-col gap-4 mb-20">
        <h2 className="text-3xl leading-snug md:text-4xl md:leading-snug font-semibold max-w-[5in] mb-4">
          Rejestracja w bezCV jest{" "}
          <div className="inline-block relative font-bold">
            <span className="relative z-10">zupełnie darmowa!</span>
            <Control
              onScroll
              x={-30}
              duration={100}
              opacity={1}
              className="absolute -bottom-1 left-0 w-full"
              element={<img className="w-full" src={underline} alt="" />}
            />
          </div>
        </h2>
        <p className="text-sm leading-loose font-medium text-[#3C4663] max-w-[7in]">
          Dzięki temu możesz zobaczyć naszą bazę i sprawdzić, czy posiadamy
          kandydatów odpowiednich do pracy w Twoim przedsiębiorstwie.
        </p>
        <p className="text-sm leading-loose font-medium text-[#3C4663]">
          Natomiast, jeżeli chcesz wykupić dostęp do danych kontaktowych
          kandydatów masz 3 opcje:
        </p>
      </div>
      <Controller
        stagger={50}
        opacity={1}
        ease="ease-out"
        delay={500}
        onScroll
        className="flex flex-wrap justify-center gap-8 xl:grid grid-cols-3"
      >
        {packages.map((pack) => (
          <Control
            className="control-package"
            element={<Package {...pack} key={pack.points} />}
          />
        ))}
      </Controller>
    </section>
  );
}

const Package = ({ points, price, image }: PackageProps) => {
  return (
    <div className="flex flex-col relative self-stretch h-full justify-end gap-4 rounded-3xl items-center p-12 bg-white shadow-primaryBig flex-1">
      {points === 15 && (
        <div className="absolute -top-6 rounded-t-full text-sm rounded-br-full -right-6 h-12 pl-8 pr-16 font-medium flex items-center bg-white">
          Bestseller
          <div className="absolute h-12 w-12 right-0 p-2 flex items-center justify-center bg-secondary rounded-full">
            <img src={bestseller} alt="" />
          </div>
        </div>
      )}
      <img className="mb-4 max-w-[1.8in] max-h-[1.3in]" src={image} alt="" />
      <h3 className="font-medium relative flex flex-col items-center">
        <span className="relative z-10">{price} zł</span>
        <img
          className="absolute bottom-[2px] min-w-[120%]"
          src={priceUnderline}
          alt=""
        />
      </h3>
      <h2 className="font-semibold text-3xl w-max">{points} kontaktów</h2>
      <ul className="list-outside list-disc marker:text-[#F9AE3D] sm:w-full mt-4 text-sm flex flex-col gap-3">
        <li>Lorem ipsum dolor sit amet consectetur.</li>
        <li>Lorem ipsum dolor sit amet consectetur.</li>
        <li>Lorem ipsum dolor sit amet consectetur.</li>
        <li>Lorem ipsum dolor sit amet consectetur.</li>
      </ul>
      {points === 20 && (
        <img
          className="hidden xl:block absolute bottom-full left-[50%] -translate-x-[50%] max-w-[80%]"
          src={pointsMan}
          alt=""
        />
      )}
    </div>
  );
};
