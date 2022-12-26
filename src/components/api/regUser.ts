import { connectionUrl } from '../../connection';
import { IUser } from '../classes/userDataClass';

export function regUser(body: IUser) {
  return fetch(`${connectionUrl}/regUser`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const response = await res.json()
      localStorage.setItem('token',response.accessToken)
      return response;
    })
    .catch((err) => console.log(err));
}
