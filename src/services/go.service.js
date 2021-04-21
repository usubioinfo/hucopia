import axios from 'axios';
import { env } from 'env.js';

export const getGoEnrichments = async (postBody) => {
  let returnData;

  try {
    const res = await axios.post(`${env.BACKEND}/go/new`, postBody);
    returnData = res.data;
  } catch (err) {
    console.log(err);
    returnData = {success: false};
  }

  return returnData;
}

export const searchGoAnnotations = (postBody) => {
  console.log(postBody);

  return new Promise((resolve, reject) => {
    axios.post(`${env.BACKEND}/go/search/annotations`, postBody)
      .then((res) => {
        const data = res.data.payload;
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });
}
