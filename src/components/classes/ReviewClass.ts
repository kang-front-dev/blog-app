import { ITime } from '../lib/TimeFuncs';
import { IUser } from './userDataClass';
export interface IReviewStatProps {
  _id: string;
  username: string;
}
export interface IReview {
  _id?: string;
  title?: string;
  descr?: string;
  group?: string;
  rating?: string;
  tags?: Array<string>;
  imgPath?: string;
  views?: number;
  likes?: Array<string>;
  dislikes?: Array<string>;
  author?: string;
  createDate?: ITime;
  selectorId?: string;
  comments?: Array<IComment>;
}

export interface IComment {
  date: ITime;
  content: string;
  author: string;
  reviewId?: string;
  authorData?: IUser;
}
export class Review implements IReview {
  _id?: string;
  title: string;
  descr: string;
  group: string;
  rating: string;
  tags: Array<string>;
  imgPath: string;
  views: number;
  likes: Array<string>;
  dislikes: Array<string>;
  author: string;
  createDate: ITime;
  selectorId?: string;
  comments?: Array<IComment>;

  constructor(options: IReview) {
    this._id = options._id;
    this.title = options.title;
    this.descr = options.descr;
    this.group = options.group;
    this.rating = options.rating;
    this.tags = options.tags;
    this.imgPath = options.imgPath;
    this.views = options.views;
    this.likes = options.likes;
    this.dislikes = options.dislikes;
    this.author = options.author;
    this.createDate = options.createDate;
    this.selectorId = options.selectorId;
    this.comments = options.comments;
  }
}
