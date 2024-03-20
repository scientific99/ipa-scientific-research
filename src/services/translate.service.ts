import axios from "axios";
import { API_BASE_URL } from "../constants";
import { VoLumeLabel } from "../components/common/Label";

export const translateTextToIpa = (
  inputData: string,
  region: string
) => {
  axios.defaults.headers.common["Content-Type"] =
    "application/json charset=utf-8";

  return axios
    .post(`${API_BASE_URL}/translate/vn-to-ipa`, {
      text_input: inputData,
      region: region,
    })
    .then((response) => {
      if (response && response.data) {
        console.log(response.data.data);
        return response.data.data;
      } else {
        console.log(response)
        throw new Error("Invalid response from server");
      }
    });
};

export const translateTextToSpeech = (
  text: string,
  lang_input: string,
  lang_output: string,
  setPlaying: (playing: boolean) => void

) => {
  setPlaying(true)
  const encoded_text = encodeURIComponent(text)
  const url = `${API_BASE_URL}/translate/convert-tts?text=${encoded_text}&lang_input=${lang_input}&lang_output=${lang_output}`;
  const audio = new Audio(url);
  audio.onended = () => {
    setPlaying(false);
  }

  audio.play()
    .then(() => { })
    .catch(error => {
      setPlaying(false);
      console.error('There was a problem playing the audio:', error);
    });
};