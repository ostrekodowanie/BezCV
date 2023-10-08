import DataAgreement from "../components/docs/components/DataAgreement";
import PrivacyPolicy from "../components/docs/components/PrivacyPolicy";
import Statute from "../components/docs/components/Statute";

export type DocsPage = {
  readonly name: string;
  readonly title: string;
  readonly document: JSX.Element;
};

export const DOCS: DocsPage[] = [
  {
    name: "regulamin",
    title: "Regulamin bezCV",
    document: <Statute />,
  },
  {
    name: "polityka-prywatnosci",
    title: "Polityka Prywatności bezCV",
    document: <PrivacyPolicy />,
  },
  {
    name: "umowa-powierzenia-przetwarzania-danych-osobowych",
    title: "Umowa powierzenia przetwarzania danych osobowych",
    document: <DataAgreement />,
  },
];
