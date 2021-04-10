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
