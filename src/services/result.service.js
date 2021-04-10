import axios from 'axios';
import { env } from 'env.js';

export const getNewResultId = async () => {
  let returnData;

  try {
    const res = await axios.post(`${env.BACKEND}/results/new`);
    returnData = res.data;
  } catch (err) {
    console.log(err);
    returnData = {success: false};
  }

  return returnData;
}

export const getResultById = async (id) => {
  let returnData;

  try {
    const res = await axios.get(`${env.BACKEND}/results/id/${id}`);
    returnData = res.data;
  } catch (err) {
    console.log(err);
    returnData = {success: false};
  }

  return returnData;
}
