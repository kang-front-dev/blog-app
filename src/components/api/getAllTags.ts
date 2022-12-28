import { connectionUrl } from '../../connection';

export function getAllTags() {
  return fetch(`${connectionUrl}/getAllTags`, {
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