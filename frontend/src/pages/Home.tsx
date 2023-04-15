import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import CandidateLanding from "../components/home/candidate/CandidateLanding";
import EmployerLanding from "../components/home/employer/EmployerLanding";
import Introduction from "../components/home/candidate/Introduction";
import Loader from "../components/Loader";
import Questions from "../components/home/candidate/Questions";
import CandidateBanner from "../components/home/candidate/Banner";
import WhatNext from "../components/home/candidate/WhatNext";
import HowToFind from "../components/home/employer/HowToFind";
import EmployerBanner from "../components/home/employer/Banner";
import Points from "../components/home/employer/Points";
import TutorialMenu from "../components/home/TutorialMenu";
import PersonalDataSecurity from "../components/home/candidate/PersonalDataSecurity";
import SoftCandidateSkills from "../components/home/employer/SoftCandidateSkills";
import DesktopSurvey from "../components/home/employer/DesktopSurvey";
import IsEnough from "../components/home/employer/IsEnough";
import HowToFindJob from "../components/home/candidate/HowToFindJob";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle("bezCV - innowacyjny portal pracy");
  const { account } = useContext(AccountContext);
  if (account === "employer")
    return (
      <>
        <EmployerLanding />
        <HowToFind />
        <TutorialMenu />
        <SoftCandidateSkills />
        <DesktopSurvey />
        <IsEnough />
        <EmployerBanner />
        <Points />
      </>
    );
  if (account === "worker")
    return (
      <>
        <CandidateLanding />
        <Introduction />
        <Questions />
        <HowToFindJob />
        <CandidateBanner />
        <WhatNext />
        <TutorialMenu />
        <PersonalDataSecurity />
      </>
    );
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}
