import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { descIcon, profilePictureUpload } from "../../assets/profile/profile";
import { EmployerInfoType } from "../../constants/profile";
import { useAppSelector } from "../../main";
import InfoForm from "./InfoForm";

export default function EmployerInfo({ image }: EmployerInfoType) {
  const auth = useAppSelector((state) => state.login);
  const { id, first_name, last_name, company_name, nip } = auth.data;
  const [profilePicture, setProfilePicture] = useState<any>(image);
  const { access } = auth.tokens;

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append(
      "image",
      // @ts-ignore
      e.target.files[0]
    );
    e.target.files && setProfilePicture(URL.createObjectURL(e.target.files[0]));
    axios.patchForm("/api/user/update/" + id, formData, {
      headers: { Authorization: "Bearer " + access },
    });
  };

  useEffect(() => {
    setProfilePicture(image);
  }, [image]);

  return (
    <div className="flex flex-col justify-between gap-6 px-[8vw] py-10 sm:p-10 shadow-primaryBig rounded-3xl row-span-2">
      <div className="flex items-center gap-6">
        <label className="cursor-pointer relative" htmlFor="profile-photo">
          <div className="rounded-full bg-[#F6F6F6] overflow-hidden flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 relative">
            {profilePicture ? (
              <img
                className="absolute h-full w-full inset-0 object-cover"
                src={profilePicture}
                alt=""
              />
            ) : (
              <span className="text-primary text-xl sm:text-2xl font-semibold">
                {first_name.charAt(0) + last_name.charAt(0)}
              </span>
            )}
            <div className="absolute inset-0 bg-black z-10 transition-opacity opacity-0 hover:opacity-20 duration-300" />
          </div>
          <div className="rounded-full flex items-center justify-center bg-primary h-7 w-7 sm:h-10 sm:w-10 absolute hover:scale-105 transition-transform -left-3 -bottom-3">
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
          <h4 className="text-primary font-medium text-[.8rem] sm:text-sm">
            Pracodawca
          </h4>
          <h1 className="font-semibold text-xl sm:text-2xl">
            {first_name} {last_name}
          </h1>
        </div>
      </div>
      <div className="rounded-3xl bg-[#F8F9FB] flex flex-col p-6 gap-4">
        <h3 className="text-[#3C4663] font-medium  text-sm">NIP: {nip}</h3>
        <h3 className="text-[#3C4663] text-sm font-medium">
          Nazwa Firmy: {company_name}
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium flex items-center">
          <img className="max-h-[1.4em] mr-3" src={descIcon} alt="" />
          Informacje
        </h3>
        <InfoForm />
      </div>
    </div>
  );
}
