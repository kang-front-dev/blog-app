import { connectionUrl } from '../../connection';
import { IComment } from '../classes/ReviewClass';

export function addComment(body: IComment) {
  return fetch(`${connectionUrl}/addComment`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}