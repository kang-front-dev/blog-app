import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReview } from '../components/api/getReview';
import { IComment, IReview } from '../components/classes/ReviewClass';
import { getBgFromRating } from '../components/lib/RatingBackground';

import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { globalContext } from '../components/contexts/globalContext';
import { addLike, removeLike } from '../components/api/addOrRemoveLike';
import {
  addDislike,
  removeDislike,
} from '../components/api/addOrRemoveDislike';
import { addView } from '../components/api/addView';
import { getUserAvatar } from '../components/api/getUserAvatar';
import {
  addComment,
  removeComment,
} from '../components/api/addOrRemoveComment';
import { getTimeWeight, getToday } from '../components/lib/TimeFuncs';
import { getUserInfo } from '../components/api/getUserInfo';

interface IHasMyLikeOrDislike {
  hasMyLike: boolean;
  hasMyDislike: boolean;
}

export default function ReviewPage() {
  const { id } = useParams();
  const { userName, isAuth, setProgress, handleSnackbarOpen } =
    useContext(globalContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesAmount, setLikesAmount] = useState(0);
  const [dislikesAmount, setDislikesAmount] = useState(0);

  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState([]);

  const [reviewData, setReviewData] = useState<IReview>({
    _id: id,
    createDate: {
      dayMonthYear: '',
      time: { seconds: '0', minutes: '0', hours: '0' },
    },
    likes: [],
    dislikes: [],
    views: 0,
    group: '',
    tags: [],
    comments: [],
  });
  const [authorAvatar, setAuthorAvatar] = useState('');

  async function getReviewData() {
    const response = await getReview({ _id: id }).catch((err) => {
      console.log(err);
    });
    console.log(response);
    const commentsData: Array<IComment> = [];
    if (response.reviewData.comments) {
      response.reviewData.comments.forEach(async (comment: IComment) => {
        const authorDataRes = await getUserInfo({ name: comment.author });
        commentsData.push({ ...comment, authorData: authorDataRes.userData });
      });
    }
    checkLikeAndDislike(response.reviewData);

    setReviewData(response.reviewData);
    setComments(commentsData);
    getAuthorAvatar(response.reviewData.author);

    handleView();
  }

  async function getAuthorAvatar(name: string) {
    console.log(name);

    const authorAvatarSrc = await getUserAvatar({ name: name });
    setAuthorAvatar(authorAvatarSrc.imgPath);
  }

  async function checkLikeAndDislike(reviewData: IReview) {
    const name = localStorage.getItem('username');
    const hasMyLike = reviewData.likes.includes(name);
    const hasMyDislike = reviewData.dislikes.includes(name);
    setIsLiked(hasMyLike);
    setIsDisliked(hasMyDislike);
    setLikesAmount(reviewData.likes.length);
    setDislikesAmount(reviewData.dislikes.length);
    if (hasMyLike) {
      setIsLiked(true);
      console.log('i liked it', hasMyLike);
    } else if (hasMyDislike) {
      setIsDisliked(true);
      console.log('i disliked it', hasMyDislike);
    }
    return;
  }

  const handleLike = () => {
    if (!isLiked && !isDisliked) {
      addLike({ _id: id, username: userName });
      setIsLiked(true);
      setLikesAmount(likesAmount + 1);
    } else if (!isLiked && isDisliked) {
      addLike({ _id: id, username: userName });
      setIsLiked(true);
      setLikesAmount(likesAmount + 1);

      removeDislike({ _id: id, username: userName });
      setIsDisliked(false);
      setDislikesAmount(dislikesAmount - 1);
    } else if (isLiked && !isDisliked) {
      removeLike({ _id: id, username: userName });
      setIsLiked(false);
      setLikesAmount(likesAmount - 1);
    }
  };

  const handleDislike = () => {
    if (!isLiked && !isDisliked) {
      addDislike({ _id: id, username: userName });
      setIsDisliked(true);
      setDislikesAmount(dislikesAmount + 1);
    } else if (isLiked && !isDisliked) {
      addDislike({ _id: id, username: userName });
      setIsDisliked(true);
      setDislikesAmount(dislikesAmount + 1);

      removeLike({ _id: id, username: userName });
      setIsLiked(false);
      setLikesAmount(likesAmount - 1);
    } else if (isDisliked && !isLiked) {
      removeDislike({ _id: id, username: userName });
      setIsDisliked(false);
      setDislikesAmount(dislikesAmount - 1);
    }
  };

  const handleView = async () => {
    addView({ _id: id, username: userName });
  };

  const handleComment = async () => {
    const data = { author: userName, date: getToday(), content: commentValue };
    const myData = await getUserInfo({ name: userName });
    console.log(myData);

    addComment({ ...data, reviewId: id });
    setComments([...comments, { ...data, authorData: myData }]);
  };
  const handleCommentDelete = async (comment: IComment) => {
    let itemIndex;
    const newCommentsArr = comments.filter((item, index) => {
      if (item === comment) {
        itemIndex = index;
      }
      return item === comment ? false : true;
    });
    console.log(newCommentsArr);
    console.log(itemIndex);

    removeComment({ ...comment, reviewId: id, itemIndex });
    setComments([...newCommentsArr]);
  };

  useEffect(() => {
    setProgress(20);
    getReviewData().then(() => {
      setProgress(90);
      setTimeout(() => {
        setProgress(100);
      }, 300);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="review">
      <div className="container">
        <div className="review__title">
          {reviewData.title}
          <span
            className="review__rating"
            style={{
              backgroundColor: getBgFromRating(Number(reviewData.rating)),
            }}
          >
            {reviewData.rating}
          </span>
        </div>
        <div className="review__about">
          <p className="review__date">{reviewData.createDate.dayMonthYear}</p>
          <p className="review__author">
            <Link to={`/profiles/${reviewData.author}`}>
              {authorAvatar ? (
                <img src={authorAvatar} alt="" />
              ) : (
                <AccountCircleIcon />
              )}
              <span>by {reviewData.author}</span>
            </Link>
          </p>
        </div>
        <div className="review__img_wrapper">
          <img src={`${reviewData.imgPath}`} alt="" className="review__img" />
        </div>
        <p className="review__descr">{reviewData.descr}</p>
        <div className="review__stats">
          <div className="review__likes_block">
            <Button
              variant="text"
              onClick={() => {
                if (isAuth) {
                  handleLike();
                } else {
                  handleSnackbarOpen(
                    'error',
                    'You have to sign in to rate reviews'
                  );
                }
              }}
            >
              {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              <span className="review__likes_amount">{likesAmount}</span>
            </Button>
          </div>
          <div className="review__dislikes_block">
            <Button
              variant="text"
              onClick={() => {
                if (isAuth) {
                  handleDislike();
                } else {
                  handleSnackbarOpen(
                    'error',
                    'You have to sign in to rate reviews'
                  );
                }
              }}
            >
              {isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
              <span className="review__likes_amount">{dislikesAmount}</span>
            </Button>
          </div>
          <span className="review__views">
            <RemoveRedEyeIcon />
            {reviewData.views + 1}
          </span>
          <Link to={`/category/${reviewData.group.toLowerCase()}`}>
            <span className="review__group">{reviewData.group}</span>
          </Link>
          <div className="review__tags">
            {reviewData.tags.map((tag, index) => {
              return (
                <span className="review__tag" key={index}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="review__comments">
          <div className="container">
            <div className="review__comments_title">
              {reviewData.comments.length}{' '}
              {reviewData.comments.length === 1 ? 'Comment' : 'Comments'}
            </div>
            <div className="review__comments_input_block">
              <TextField
                multiline={true}
                className="review__comments_input"
                id="review-comments-input"
                placeholder="Comment text..."
                value={commentValue}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  setCommentValue(input.value);
                }}
              />
              <button
                className="review__comments_input_btn"
                onClick={handleComment}
              >
                Upload
              </button>
            </div>
            <div className="review__comments_container">
              {comments.map((comment: IComment, index) => {
                console.log(comment, 'rendering comment');

                const dayWeight = 172800;
                const currentDateWeight = getTimeWeight(getToday());
                const commentDateWeight = getTimeWeight(comment.date);
                let resultDate =
                  currentDateWeight - commentDateWeight < dayWeight
                    ? 'today'
                    : 'yesterday';
                if (currentDateWeight - commentDateWeight > dayWeight * 2) {
                  resultDate = comment.date.dayMonthYear;
                }

                return (
                  <div className="review__comments_item" key={index}>
                    <div className="review__comments_item_header">
                      <div className="review__comments_item_header_about">
                        <div
                          className="review__comments_item_avatar"
                          style={{
                            backgroundImage: `url(${
                              comment.authorData.avatarImgPath
                                ? comment.authorData.avatarImgPath
                                : ''
                            })`,
                          }}
                        >
                          {!comment.authorData.avatarImgPath ? (
                            <AccountCircleIcon />
                          ) : null}
                        </div>
                        <div className="review__comments_item_author">
                          <div className="review__comments_item_name">
                            {comment.author}
                          </div>
                          <div className="review__comments_item_date">
                            {`${resultDate} at ${comment.date.time.hours}:${comment.date.time.minutes}`}
                          </div>
                        </div>
                      </div>
                      {userName === comment.author ? (
                        <div className="review__comments_item_header_controls">
                          <button
                            onClick={() => {
                              handleCommentDelete(comment);
                            }}
                            className="review__comments_item_btn-delete"
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="review__comments_item_descr">
                      {comment.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
