import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../main";
import {
  initialProfileData,
  ProfileDataContext,
  ProfileDataType,
} from "../constants/profile";
import Stats from "../components/profile/Stats";
import Purchased from "../components/profile/purchased/List";
import Followed from "../components/profile/followed/List";
import { bcvToken } from "../assets/general";
import { Link } from "react-router-dom";
import EmployerInfo from "../components/profile/EmployerInfo";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Profile() {
  useDocumentTitle("Profil | bezCV - innowacyjny portal pracy");
  const [profileData, setProfileData] =
    useState<ProfileDataType>(initialProfileData);
  const [loading, setLoading] = useState(true);
  const auth = useAppSelector((state) => state.login);
  const { id } = auth.data;

  useEffect(() => {
    axios
      .get("/api/profile/" + id)
      .then((res) => setProfileData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[16vw] py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in] flex flex-col gap-8 xl:grid grid-cols-[6fr_5fr_5fr] overflow-x-hidden grid-rows-[4in_max-content_1fr]">
        <EmployerInfo />
        <Link
          to="/punkty"
          className="rounded-full bg-primary ml-[8vw] sm:ml-0 row-[2/3] col-[2/3] max-w-max h-max justify-center xl:max-w-none w-full text-white text-[.8rem] font-semibold flex items-center py-4 px-10"
        >
          Wykup tokeny{" "}
          <img className="max-h-[1.2em] ml-2" src={bcvToken} alt="" />
        </Link>
        <Stats {...profileData.stats} loading={loading} />
        <Purchased />
        <Followed />
      </section>
    </ProfileDataContext.Provider>
  );
}
