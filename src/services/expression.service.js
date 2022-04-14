import axios from 'axios';
import { env } from 'env.js';

export const getTissueExpressions = async (postBody) => {
  let returnData;

  try {
    console.log(`${env.BACKEND}/expression/new`, postBody);
    const res = await axios.post(`${env.BACKEND}/expression/new`, postBody);
    returnData = res.data;
  } catch (err) {
    console.log(err);
    returnData = {success: false};
  }

  return returnData;
}
