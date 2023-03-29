import axios from "axios";
import { useRef, useState } from "react";
import { liked, notLiked } from "../../assets/offers/offers";
import { FollowedCandidateBonusProps } from "../../constants/profile";
import { useAppSelector } from "../../main";

type FollowButtonProps = {
  id: number;
  is_followed?: boolean;
};

export default function FollowButton({
  id,
  is_followed,
  setFollowed,
  isFromFollowed,
}: FollowButtonProps & FollowedCandidateBonusProps) {
  const { access } = useAppSelector((state) => state.login.tokens);
  const [isFollowed, setIsFollowed] = useState(is_followed);
  const timer = useRef<number | undefined>();

  const deleteLike = () => {
    setFollowed &&
      setFollowed((prev) => [...prev].filter((item) => item.id !== id));
    return axios.delete(`/api/profile/favourites/remove/${id}`, {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
  };

  const addLike = () => {
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

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(timer.current);
    setIsFollowed((prev) => !prev);
    if (isFollowed)
      if (isFromFollowed) {
        timer.current = setTimeout(deleteLike, 2000);
      } else {
        deleteLike();
      }
    if (!isFromFollowed && !isFollowed) {
      addLike();
    }
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
