import { connectionUrl } from '../connection';
import { IReviewStatProps } from '../components/classes/ReviewClass';

export function addView(body: IReviewStatProps) {
  return fetch(`${connectionUrl}/addView`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}