import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getReview } from '../api/getReview';
import { IComment, IReview } from '../components/classes/ReviewClass';
import { getBgFromRating } from '../utils/RatingBackground';

import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { addView } from '../api/addView';
import { getUserAvatar } from '../api/getUserAvatar';
import { addComment, removeComment } from '../api/addOrRemoveComment';
import { checkCommentDate, getTimeWeight, getToday } from '../utils/TimeFuncs';
import { getUserInfo } from '../api/getUserInfo';
import { deleteReview } from '../api/deleteReview';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { useSnackbar } from '../hooks/useSnackbar';
import {
  deleteDislike,
  deleteLike,
  setDislike,
  setLike,
} from './ReviewPage-utils';

export default function ReviewPage() {
  const { isAuth, userName } = useAuth();

  const { id } = useParams();
  const { handleSnackbarOpen } = useSnackbar();
  const { startProgress, finishProgress } = useProgress();

  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
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
    group: 'Group',
    tags: [],
    comments: [],
  });
  const [authorAvatar, setAuthorAvatar] = useState('');

  async function getReviewData() {
    const response = await getReview({ _id: id }).catch((err) => {
      console.log(err);
    });

    let commentsData: Array<IComment> = [];
    if (response.reviewData.comments) {
      response.reviewData.comments.forEach(
        async (comment: IComment, index: number) => {
          const { userData } = await getUserInfo({ name: comment.author });
          commentsData = await [
            ...commentsData,
            {
              ...comment,
              authorData: {
                name: userData.name,
                avatarImgPath: userData.avatarImgPath,
                email: userData.email,
                _id: userData._id,
              },
            },
          ].sort((a: IComment, b: IComment) => {
            const aTimeWeight = getTimeWeight(a.date);
            const bTimeWeight = getTimeWeight(b.date);
            return aTimeWeight - bTimeWeight;
          });
          setComments(commentsData);
        }
      );
    }
    checkLikeAndDislike(response.reviewData);

    setReviewData(response.reviewData);
    getAuthorAvatar(response.reviewData.author);

    handleView();
  }

  function generateCommentsInput() {
    return isAuth ? (
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
        <button className="review__comments_input_btn" onClick={handleComment}>
          Upload
        </button>
      </div>
    ) : (
      <div className="review__comments_input_error">
        You have to sign in to comment reviews
      </div>
    );
  }

  function generateComments() {
    return comments.map((comment: IComment, index) => {
      const resultDate = checkCommentDate(comment);

      return (
        <div className="review__comments_item" key={index}>
          <div className="review__comments_item_header">
            <Link to={`/profiles/${comment.author}`}>
              <div className="review__comments_item_header_about">
                {comment.authorData.avatarImgPath ? (
                  <div
                    className="review__comments_item_avatar"
                    style={{
                      backgroundImage: `url(${comment.authorData.avatarImgPath})`,
                    }}
                  ></div>
                ) : (
                  <AccountCircleIcon />
                )}
                <div className="review__comments_item_author">
                  <div className="review__comments_item_name">
                    {comment.author}
                  </div>
                  <div className="review__comments_item_date">
                    {`${resultDate} at ${comment.date.time.hours}:${comment.date.time.minutes}`}
                  </div>
                </div>
              </div>
            </Link>
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
          <p className="review__comments_item_descr">{comment.content}</p>
        </div>
      );
    });
  }

  async function getAuthorAvatar(name: string) {
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
    } else if (hasMyDislike) {
      setIsDisliked(true);
    }
    return;
  }

  const handleReviewDelete = async () => {
    const deleteRes = await deleteReview(reviewData);
    if (deleteRes.success) {
      navigate('/');
      handleSnackbarOpen('success', 'Review successfully deleted!');
    }
  };

  const handleLike = () => {
    setIsBtnDisabled(true);
    if (!isAuth) {
      handleSnackbarOpen('error', 'You have to sign in to rate reviews');
      return;
    }
    if (!isLiked && !isDisliked) {
      // addLike({ _id: id, username: userName });
      // setIsLiked(true);
      // setLikesAmount(likesAmount + 1);

      setLike({ id, userName, setIsLiked, likesAmount, setLikesAmount });
    } else if (!isLiked && isDisliked) {
      // addLike({ _id: id, username: userName });
      // setIsLiked(true);
      // setLikesAmount(likesAmount + 1);
      setLike({ id, userName, setIsLiked, likesAmount, setLikesAmount });

      // removeDislike({ _id: id, username: userName });
      // setIsDisliked(false);
      // setDislikesAmount(dislikesAmount - 1);
      deleteDislike({ id, userName, setIsDisliked, dislikesAmount, setDislikesAmount });
    } else if (isLiked && !isDisliked) {
      // removeLike({ _id: id, username: userName });
      // setIsLiked(false);
      // setLikesAmount(likesAmount - 1);
      deleteLike({ id, userName, setIsLiked, likesAmount, setLikesAmount });
    }
    setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
  };

  const handleDislike = () => {
    setIsBtnDisabled(true);
    if (!isAuth) {
      handleSnackbarOpen('error', 'You have to sign in to rate reviews');
      return;
    }
    if (!isLiked && !isDisliked) {
      // addDislike({ _id: id, username: userName });
      // setIsDisliked(true);
      // setDislikesAmount(dislikesAmount + 1);

      setDislike({ id, userName, setIsDisliked, dislikesAmount, setDislikesAmount });
    } else if (isLiked && !isDisliked) {
      // addDislike({ _id: id, username: userName });
      // setIsDisliked(true);
      // setDislikesAmount(dislikesAmount + 1);
      setDislike({ id, userName, setIsDisliked, dislikesAmount, setDislikesAmount });
      // removeLike({ _id: id, username: userName });
      // setIsLiked(false);
      // setLikesAmount(likesAmount - 1);
      deleteLike({ id, userName, setIsLiked, likesAmount, setLikesAmount });
    } else if (isDisliked && !isLiked) {
      // removeDislike({ _id: id, username: userName });
      // setIsDisliked(false);
      // setDislikesAmount(dislikesAmount - 1);
      deleteDislike({ id, userName, setIsDisliked, dislikesAmount, setDislikesAmount });
    }
    setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
  };

  const handleView = async () => {
    addView({ _id: id, username: userName });
  };

  const handleComment = async () => {
    const data = { author: userName, date: getToday(), content: commentValue };
    const { userData } = await getUserInfo({ name: userName });

    addComment({ ...data, reviewId: id });
    setCommentValue('');
    setComments([...comments, { ...data, authorData: userData }]);
  };
  const handleCommentDelete = async (comment: IComment) => {
    let itemIndex;
    const newCommentsArr = comments.filter((item, index) => {
      if (item === comment) {
        itemIndex = index;
      }
      return item === comment ? false : true;
    });

    removeComment({ ...comment, reviewId: id, itemIndex });
    setComments([...newCommentsArr]);
  };

  useEffect(() => {
    startProgress();
    getReviewData().then(() => {
      finishProgress();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //////////////////////OPTIONS MODAL////////////////////////////
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  ///////////////////////////////////////////////////////////////

  return (
    <section className="review">
      <nav className="review__nav">
        <button
          className="review__btn-back"
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowBackIcon />
        </button>
        {isAuth && userName === reviewData.author ? (
          <div className="review__options">
            <button
              className="review__options_btn-delete"
              onClick={handleModalOpen}
            >
              <DeleteOutlineIcon />
            </button>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="model-title"
              aria-describedby="modal-controls"
            >
              <div className="modal">
                <div className="modal__title" id="model-title">
                  Are you sure to delete review?
                </div>
                <div className="modal__controls" id="modal-controls">
                  <Button
                    variant="outlined"
                    style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleModalOpen();
                      handleReviewDelete();
                    }}
                  >
                    Yes, delete
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </nav>
      <div className="review__title">
        <div className="review__title_content">{reviewData.title}</div>
      </div>
      <div className="review__about">
        <div className="review__author">
          <Link to={`/profiles/${reviewData.author}`}>
            {authorAvatar ? (
              <div
                className="review__author_img"
                style={{ backgroundImage: `url(${authorAvatar})` }}
              ></div>
            ) : (
              <AccountCircleIcon />
            )}
            <span>by {reviewData.author}</span>
          </Link>
        </div>
        <p className="review__date">
          {reviewData.createDate.dayMonthYear} at{' '}
          {reviewData.createDate.time.hours}:
          {reviewData.createDate.time.minutes}
        </p>
        <span
          className="review__rating"
          style={{
            backgroundColor: getBgFromRating(Number(reviewData.rating)),
          }}
        >
          {reviewData.rating}
        </span>
      </div>
      <div
        className="review__img"
        style={{ backgroundImage: `url(${reviewData.imgPath})` }}
      ></div>
      <p className="review__descr">{reviewData.descr}</p>
      <div className="review__info">
        <div className="review__stats">
          <div className="review__stats_block">
            <div className="review__likes_block">
              <Button
                variant="text"
                onClick={handleLike}
                disabled={isBtnDisabled}
              >
                {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                <span className="review__likes_amount">{likesAmount}</span>
              </Button>
            </div>
            <div className="review__dislikes_block">
              <Button
                variant="text"
                onClick={handleDislike}
                disabled={isBtnDisabled}
              >
                {isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                <span className="review__likes_amount">{dislikesAmount}</span>
              </Button>
            </div>
          </div>
          <span className="review__views">
            <RemoveRedEyeIcon />
            {reviewData.views + 1}
          </span>
          <Link to={`/category/${reviewData.group.toLowerCase()}`}>
            <span className="review__group">{reviewData.group}</span>
          </Link>
        </div>
        <div className="review__tags_block">
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
      </div>
      <div className="review__comments">
        <div className="container">
          <div className="review__comments_title">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </div>
          {generateCommentsInput()}
          <div className="review__comments_container">{generateComments()}</div>
        </div>
      </div>
    </section>
  );
}
