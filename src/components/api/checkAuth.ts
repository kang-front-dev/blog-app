import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function checkAuth() {
  return fetch(`${connectionUrl}/refresh`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    credentials: 'include',
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
