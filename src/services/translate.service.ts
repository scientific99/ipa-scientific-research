import axios from "axios";

export const translateTextToIpa = (
    inputData: string, 
    region: string
) => {
    axios.defaults.headers.common["Content-Type"] =
      "application/json charset=utf-8";

    axios
      .post("http://127.0.0.1:9000/api/v1.0/translate", {
        text_input: inputData,
        region: region,
      })
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      });
};