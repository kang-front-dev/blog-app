import { connectionUrl } from '../../connection';

export function getAllReviews() {
  return fetch(`${connectionUrl}/getAllReviews`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
