import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function regUser(body: IUser) {
  return fetch(`${connectionUrl}/regUser`, {
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
