import { connectionUrl } from '../connection';
import { IUser } from '../components/classes/userDataClass';

export function getUserInfo(body: IUser) {
  return fetch(`${connectionUrl}/getUserInfo`, {
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
