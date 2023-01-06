import { connectionUrl } from '../connection';

export function updateTags(body: Array<string>) {

  const tags = body.map((tag) => {
    return tag.toLowerCase();
  });
  let success = true;
  tags.forEach(async (tag) => {
    const response = await fetch(`${connectionUrl}/updateTags`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        tagName: tag,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  
      
    success = response.success ? true : false;
  });
  return { success: success };
}
