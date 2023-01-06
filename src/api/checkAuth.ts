import { connectionUrl } from '../connection';

export function checkAuth() {
  return fetch(`${connectionUrl}/refresh`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
