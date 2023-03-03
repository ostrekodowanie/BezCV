import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { CandidateProps } from "../../../constants/candidate";
import { useAppSelector } from "../../../main";

const CandidateFollowed = ({
  id,
  first_name,
  last_name,
  i,
  setFavourites,
}: CandidateProps & {
  i: number;
  setFavourites?: Dispatch<SetStateAction<CandidateProps[]>>;
}) => {
  const { access } = useAppSelector((state) => state.login.tokens);

  const handleRemove = async () => {
    let resp = await axios.delete(`/api/profile/favourites/remove/${id}`, {
      headers: { Authorization: "Bearer " + access },
    });
    if (resp.status === 204)
      return (
        setFavourites &&
        setFavourites((prev) => prev.filter((cand) => cand.id !== id))
      );
  };

  return (
    <div
      className={`px-6 py-3 rounded-3xl text-sm flex items-center w-full justify-between ${
        i % 2 === 0 ? "bg-white" : "bg-[#F8F9FB]"
      }`}
    >
      <h3 className="font-medium">
        {first_name} {last_name}
      </h3>
      <div className="flex items-center gap-3 text-[.8rem]">
        <button
          className="text-negative hover:text-darkNegative transition-colors font-medium"
          onClick={handleRemove}
        >
          Usuń
        </button>
        <Link
          className="hover:text-fontPrimary transition-colors font-medium"
          to={"/oferty/" + id}
        >
          Pokaż profil
        </Link>
      </div>
    </div>
  );
};

export default CandidateFollowed;
