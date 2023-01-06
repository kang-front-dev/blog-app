import { connectionUrl } from '../connection';
import { IUser } from '../components/classes/userDataClass';

export function logUser(body: IUser) {
  return fetch(`${connectionUrl}/logUser`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },

    method: 'POST',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const response = await res.json()
      
      return response;
    })
    .catch((err) => console.log(err));
}
