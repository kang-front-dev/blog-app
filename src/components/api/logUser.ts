import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function logUser(body: IUser) {
  return fetch(`${connectionUrl}/logUser`, {
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
