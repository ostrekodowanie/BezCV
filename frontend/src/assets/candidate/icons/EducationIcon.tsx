import { ProfessionColorScheme } from "../../../constants/professionColorMap";

export default function EducationIcon({
  startColor,
  stopColor,
}: ProfessionColorScheme) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5431 3.92224L11.0126 1.28749C9.79525 0.560317 8.28001 0.547414 7.05039 1.25374L1.45766 3.92224C1.43667 3.93275 1.41491 3.944 1.39466 3.95599C0.0674441 4.71487 -0.393314 6.40599 0.365569 7.73321C0.622807 8.18314 1.00119 8.55179 1.45766 8.79725L3.00042 9.53226V13.2072C3.00134 14.8506 4.07062 16.3024 5.63967 16.7908C6.73159 17.1066 7.8638 17.2613 9.00044 17.2498C10.1369 17.2625 11.2691 17.1091 12.3612 16.7945C13.9303 16.3062 14.9995 14.8543 15.0004 13.211V9.53075L16.5005 8.81374V14.9997C16.5005 15.4139 16.8362 15.7497 17.2504 15.7497C17.6647 15.7497 18.0004 15.4139 18.0004 14.9997V5.99973C18.0054 5.11903 17.31 4.30544 16.5431 3.92224ZM13.5004 13.211C13.5008 14.1939 12.8631 15.0634 11.9254 15.3583C10.9746 15.6299 9.98924 15.7618 9.0004 15.7498C8.01156 15.7618 7.02624 15.6299 6.0754 15.3583C5.13775 15.0634 4.50001 14.1939 4.5004 13.211V10.247L6.98816 11.432C7.60199 11.7965 8.30304 11.9881 9.01692 11.9863C9.69642 11.9911 10.3645 11.8112 10.9497 11.4658L13.5004 10.247V13.211ZM15.9004 7.44349L10.2439 10.1435C9.45522 10.6027 8.47763 10.5897 7.70141 10.1097L2.16715 7.47724C1.55026 7.14459 1.31985 6.37484 1.6525 5.75799C1.765 5.54938 1.93368 5.37644 2.13941 5.25874L7.76065 2.57375C8.54959 2.11552 9.52665 2.1285 10.3032 2.6075L15.8336 5.24225C16.2404 5.46809 16.4948 5.89457 16.5004 6.35976C16.5011 6.80041 16.2742 7.21019 15.9004 7.44349Z"
        fill="url(#paint0_linear_1586_1269)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1586_1269"
          x1="9.00023"
          y1="0.73291"
          x2="9.00023"
          y2="17.2505"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={startColor.value} offset={startColor.position} />
          <stop stop-color={stopColor.value} offset={stopColor.position} />
        </linearGradient>
      </defs>
    </svg>
  );
}
