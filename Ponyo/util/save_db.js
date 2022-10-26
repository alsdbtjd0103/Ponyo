import axios from "axios";

export async function save_db(query) {
  
  const url = `http://localhost:3000/save_db`;
  try {
    const response = await axios.post(url, {
      query:query
    });
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
}

