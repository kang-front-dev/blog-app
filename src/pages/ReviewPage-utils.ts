import { addLike, removeLike } from '../api/addOrRemoveLike';
import { addDislike, removeDislike } from '../api/addOrRemoveDislike';

interface ILike {
  id: string;
  userName: string;
  setIsLiked?: (value: boolean) => void;
  setIsDisliked?: (value: boolean) => void;
  likesAmount?: number;
  dislikesAmount?: number;
  setLikesAmount?: (value: number) => void;
  setDislikesAmount?: (value: number) => void;
}
export const setLike = ({
  id,
  userName,
  setIsLiked,
  likesAmount,
  setLikesAmount,
}: ILike) => {
  addLike({ _id: id, username: userName });
  setIsLiked(true);
  setLikesAmount(likesAmount + 1);
};
export const deleteLike = ({
  id,
  userName,
  setIsLiked,
  likesAmount,
  setLikesAmount,
}: ILike) => {
  removeLike({ _id: id, username: userName });
  setIsLiked(false);
  setLikesAmount(likesAmount - 1);
};

////////////////////////////////////////////////////

export const setDislike = ({
  id,
  userName,
  setIsDisliked,
  dislikesAmount,
  setDislikesAmount,
}: ILike) => {
  addDislike({ _id: id, username: userName });
  setIsDisliked(true);
  setDislikesAmount(dislikesAmount + 1);
};
export const deleteDislike = ({
  id,
  userName,
  setIsDisliked,
  dislikesAmount,
  setDislikesAmount,
}: ILike) => {
  removeDislike({ _id: id, username: userName });
  setIsDisliked(false);
  setDislikesAmount(dislikesAmount - 1);
};
