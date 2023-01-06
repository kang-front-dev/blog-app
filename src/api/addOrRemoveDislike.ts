import { connectionUrl } from '../connection';
import { IReviewStatProps } from '../components/classes/ReviewClass';

export function addDislike(body: IReviewStatProps) {
  return fetch(`${connectionUrl}/addDislike`, {
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
export function removeDislike(body: IReviewStatProps) {
  return fetch(`${connectionUrl}/removeDislike`, {
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