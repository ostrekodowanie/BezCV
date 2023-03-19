import { reportFormInfo } from "../constants/profile";

export default function useReportFormData(formIndex: number) {
  const title = reportFormInfo[formIndex].title;
  const paragraph = reportFormInfo[formIndex].paragraph;
  return {
    title,
    paragraph,
  };
}
