import { connectionUrl } from '../connection';
import { IUser } from '../components/classes/userDataClass';

export function logout(body: IUser) {
  return fetch(`${connectionUrl}/logOut`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
