import { connectionUrl } from '../../connection';
import { IReviewStatProps } from '../classes/ReviewClass';

export function addLike(body: IReviewStatProps) {
  return fetch(`${connectionUrl}/addLike`, {
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
export function removeLike(body: IReviewStatProps) {
  return fetch(`${connectionUrl}/removeLike`, {
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
