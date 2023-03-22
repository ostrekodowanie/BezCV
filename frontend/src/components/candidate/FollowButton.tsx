import axios from "axios";
import { useState } from "react";
import { liked, notLiked } from "../../assets/offers/offers";
import { useAppSelector } from "../../main";

type FollowButtonProps = {
  id: number;
  is_followed?: boolean;
};

export default function FollowButton({ id, is_followed }: FollowButtonProps) {
  const user_id = useAppSelector((state) => state.login.data.id);
  const [isFollowed, setIsFollowed] = useState(is_followed);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowed((prev) => !prev);
    if (isFollowed)
      return axios.delete(`/api/profile/favourites/remove/${user_id}/${id}`);
    return axios.post(
      "/api/profile/favourites/add",
      JSON.stringify({ employer: user_id, candidate: id }),
      {
        headers: { "Content-Type": "application/json" },
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
