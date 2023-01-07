import { IReview } from '../components/classes/ReviewClass';

export function SearchReviews(searchString: string, array: Array<IReview>) {
  const cleanString = searchString.trim().toLowerCase();
  const filteredArr = array.filter((review: IReview) => {
    const isTitleIncludes = review.title.toLowerCase().includes(cleanString);
    const isDescrIncludes = review.descr.toLowerCase().includes(cleanString);
    return isTitleIncludes || isDescrIncludes ? true : false;
  });
  return filteredArr
}
