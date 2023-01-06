import { connectionUrl } from '../connection';
import { IReview } from '../components/classes/ReviewClass';
export function insertReview(body: IReview) {
  return fetch(`${connectionUrl}/insertReview`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
