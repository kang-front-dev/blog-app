import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function getUserReviews(body: IUser) {
  return fetch(`${connectionUrl}/getUserReviews`, {
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