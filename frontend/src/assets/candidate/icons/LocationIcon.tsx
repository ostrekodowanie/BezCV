import { ProfessionColorScheme } from "../../../constants/professionColorMap";

export default function LocationIcon({
  startColor,
  stopColor,
}: ProfessionColorScheme) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 9.75C8.24264 9.75 9.25 8.74264 9.25 7.5C9.25 6.25736 8.24264 5.25 7 5.25C5.75736 5.25 4.75 6.25736 4.75 7.5C4.75 8.74264 5.75736 9.75 7 9.75Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 9.75C8.24264 9.75 9.25 8.74264 9.25 7.5C9.25 6.25736 8.24264 5.25 7 5.25C5.75736 5.25 4.75 6.25736 4.75 7.5C4.75 8.74264 5.75736 9.75 7 9.75Z"
        stroke="url(#paint0_linear_2318_4378)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 1.5C5.4087 1.5 3.88258 2.13214 2.75736 3.25736C1.63214 4.38258 1 5.9087 1 7.5C1 8.919 1.3015 9.8475 2.125 10.875L7 16.5L11.875 10.875C12.6985 9.8475 13 8.919 13 7.5C13 5.9087 12.3679 4.38258 11.2426 3.25736C10.1174 2.13214 8.5913 1.5 7 1.5Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 1.5C5.4087 1.5 3.88258 2.13214 2.75736 3.25736C1.63214 4.38258 1 5.9087 1 7.5C1 8.919 1.3015 9.8475 2.125 10.875L7 16.5L11.875 10.875C12.6985 9.8475 13 8.919 13 7.5C13 5.9087 12.3679 4.38258 11.2426 3.25736C10.1174 2.13214 8.5913 1.5 7 1.5Z"
        stroke="url(#paint1_linear_2318_4378)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2318_4378"
          x1="7"
          y1="5.25"
          x2="7"
          y2="9.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor.value} offset={startColor.position} />
          <stop offset={stopColor.position} stopColor={stopColor.value} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2318_4378"
          x1="7"
          y1="1.5"
          x2="7"
          y2="16.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor.value} offset={startColor.position} />
          <stop offset={stopColor.position} stopColor={stopColor.value} />
        </linearGradient>
      </defs>
    </svg>
  );
}
