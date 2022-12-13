export interface IReview {
  title: string,
  descr: string,
  group: string,
  rating: string,
  tags: Array<string>,
  imgPath: string,
}
export class Review implements IReview{
  title: string;
  descr: string;
  group: string;
  rating: string;
  tags: Array<string>;
  imgPath: string;
  constructor(options:IReview){
    this.title = options.title
    this.descr = options.descr
    this.group = options.group
    this.rating = options.rating
    this.tags = options.tags
    this.imgPath = options.imgPath
  }
}