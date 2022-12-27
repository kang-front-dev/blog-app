export function getBgFromRating(rating: number): string {

  if (rating > 90) {
    return '#6c24b9';
  } else if (rating <= 90 && rating > 70) {
    return '#66cc33';
  } else if (rating >= 40 && rating < 70) {
    return '#ffcc33';
  } else if (rating < 40) {
    return '#ff0000';
  }
}
