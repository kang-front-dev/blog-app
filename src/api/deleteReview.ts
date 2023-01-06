import { connectionUrl } from '../connection';
import { IReview } from '../components/classes/ReviewClass';
export function deleteReview(body: IReview) {
  return fetch(`${connectionUrl}/deleteReview`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
