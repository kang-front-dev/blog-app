import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function getReview(body: IUser) {
  return fetch(`${connectionUrl}/getReview`, {
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