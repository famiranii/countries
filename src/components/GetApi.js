import axios from "axios";

export const countries = async () => {
  let response = [];
  await axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => {
      response = res.data
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
