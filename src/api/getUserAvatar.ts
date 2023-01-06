import { connectionUrl } from '../connection';
import { IUser } from '../components/classes/userDataClass';

export function getUserAvatar(body: IUser) {
  return fetch(`${connectionUrl}/getUserAvatar`, {
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
