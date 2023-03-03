import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { descIcon, profilePictureUpload } from "../assets/profile/profile";
import { useAppDispatch, useAppSelector } from "../main";
import { logout } from "../reducers/login";
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

export default function Profile() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.login);
  const { id, first_name, last_name, image, desc } = auth.data;
  const [profileData, setProfileData] =
    useState<ProfileDataType>(initialProfileData);
  const [profilePicture, setProfilePicture] = useState<any>(image);
  const { access, refresh } = auth.tokens;

  const handleLogout = async () => {
    const resp = await axios.post("/api/logout", refresh, {
      headers: { "Content-Type": "application/json" },
    });
    if (resp.status === 200) dispatch(logout());
  };

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append(
      "image",
      // @ts-ignore
      e.target.files[0]
    );
    const resp = await axios.patchForm("/api/user/update/" + id, formData, {
      headers: { Authorization: "Bearer " + access },
    });
    if (resp.status === 200) {
      e.target.files &&
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    axios
      .get("/api/profile/" + id, {
        headers: {
          Authorization: "Bearer " + access,
        },
      })
      .then((res) => setProfileData(res.data));
  }, []);

  return (
    <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in] flex flex-col gap-8 xl:grid grid-cols-[6fr_5fr_5fr] grid-rows-[4in_max-content_3in]">
      <div className="flex flex-col justify-between gap-6 p-10 shadow-primaryBig rounded-3xl row-span-2">
        <div className="flex items-center gap-6">
          <label className="cursor-pointer relative" htmlFor="profile-photo">
            <div className="rounded-full bg-[#F6F6F6] overflow-hidden flex items-center justify-center h-20 w-20 relative">
              {profilePicture ? (
                <img
                  className="absolute h-full w-full inset-0 object-cover"
                  src={profilePicture}
                  alt=""
                />
              ) : (
                <span className="text-primary text-3xl font-bold">
                  {first_name.charAt(0) + last_name.charAt(0)}
                </span>
              )}
              <div className="absolute inset-0 bg-black z-10 transition-opacity opacity-0 hover:opacity-20 duration-300" />
            </div>
            <div className="rounded-full flex items-center justify-center bg-primary h-10 w-10 absolute hover:scale-105 transition-transform -left-3 -bottom-3">
              <img className="h-[50%]" src={profilePictureUpload} alt="" />
            </div>
          </label>
          <input
            onChange={handleSubmit}
            accept="image/png, image/jpeg"
            className="absolute -z-10 opacity-0"
            type="file"
            id="profile-photo"
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-primary text-sm">Pracodawca</h4>
            <h1 className="font-semibold text-2xl">
              {first_name} {last_name}
            </h1>
          </div>
        </div>
        <div className="rounded-3xl bg-[#F8F9FB] flex flex-col px-8 py-6 gap-4">
          <h3 className="font-medium flex items-center">
            <img className="max-h-[1.4em] mr-3" src={descIcon} alt="" />
            Informacje
          </h3>
          <p className="text-[#4D5058] text-[.8rem] leading-relaxed my-6">
            {desc}
          </p>
        </div>
        <button
          className="font-medium w-max transition-colors text-negative hover:text-darkNegative"
          onClick={handleLogout}
        >
          Wyloguj się
        </button>
      </div>
      <Link
        to="/punkty"
        className="rounded-full bg-primary row-[2/3] col-[2/3] max-w-max justify-center xl:max-w-none w-full text-white text-[.8rem] font-semibold flex items-center py-4 px-10"
      >
        Wykup tokeny{" "}
        <img className="max-h-[1.2em] ml-2" src={bcvToken} alt="" />
      </Link>
      <ProfileDataContext.Provider value={profileData}>
        <Stats {...profileData.stats} />
        <Purchased purchased={profileData.purchased_contacts} />
        <Followed followed={profileData.followed_contacts} />
      </ProfileDataContext.Provider>
    </section>
  );
}
