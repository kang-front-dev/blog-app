import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function logout(body: IUser) {
  return fetch(`${connectionUrl}/logout`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    credentials: 'include',
    method: 'DELETE',
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
