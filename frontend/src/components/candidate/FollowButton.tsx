import axios from "axios";
import { useState } from "react";
import { liked, notLiked } from "../../assets/offers/offers";
import { useAppSelector } from "../../main";

type FollowButtonProps = {
  id: number;
  is_followed?: boolean;
};

export default function FollowButton({ id, is_followed }: FollowButtonProps) {
  const { access } = useAppSelector((state) => state.login.tokens);
  const [isFollowed, setIsFollowed] = useState(is_followed);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowed((prev) => !prev);
    if (isFollowed)
      return axios.delete(`/api/profile/favourites/remove/${id}`, {
        headers: {
          Authorization: "Bearer " + access,
        },
      });
    return axios.post(
      "/api/profile/favourites/add",
      JSON.stringify({ candidate: id }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
      }
    );
  };
  return (
    <button
      className="flex items-center text-[.75rem] font-semibold"
      onClick={handleLike}
    >
      {isFollowed ? "Dodano do ulubionych" : "Dodaj do ulubionych"}
      <img
        className="max-h-[1.2em] ml-2"
        src={isFollowed ? liked : notLiked}
        alt=""
      />
    </button>
  );
}
