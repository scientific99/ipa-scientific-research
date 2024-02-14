import axios from "axios";
import { useState } from "react";
import Header from "./Header";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyLabel from "../components/CopyLabel";
import LangButton from "../components/LangButton";

interface Region {
  value: string;
}

var regions: Region[] = [
  { value: "Bắc" },
  // { value: "Trung" },
  { value: "Nam" },
];

export function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [langText, setLangTest] = useState("Bắc");
  const defautMaxHeight = 150;
  const [maxHeight, setMaxHeight] = useState(defautMaxHeight + "px");
  const handleDivClick = (e: string) => {
    setLangTest(e);
    handleTranslate(inputText, e);
  };

  const handleChangeRowArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height =
      Math.max(defautMaxHeight, e.target.scrollHeight + 7) + "px";
    // console.log(e.target.scrollHeight + 7);
    setMaxHeight(e.target.style.height);
  };

  const handleTranslate = (inputData: string, region: string) => {
    axios.defaults.headers.common["Content-Type"] =
      "application/json charset=utf-8";

    axios
      .post("http://127.0.0.1:9000/api/v1.0/translate", {
        text_input: inputData,
        region: region,
      })
      .then((response) => {
        console.log(response.data.data);
        var data = response.data.data;
        setOutputText(data);
      });
  };
  return (
    <div className="overflow-y-scro h-screen w-screen justify-center">
      <Header />
      <div id="body" className="mx-16 h-full">
        <div className="min-w flex items-center justify-center pt-24">
          <div id="left" className="min-h-full w-1/2 p-1">
            <LangButton textValue="Tiếng Việt" />
            <div className="rounded-lg border p-3">
              <textarea
                className="h-full w-full resize-none text-xl text-black focus:outline-none"
                value={inputText}
                style={{ height: maxHeight }}
                onChange={(e) => {
                  handleTranslate(e.target.value, langText);
                  handleChangeRowArea(e);
                }}
                // placeholder="Nhập dữ liệu"
              />
              <CopyToClipboard text={inputText}>
                <CopyLabel />
              </CopyToClipboard>
            </div>
          </div>

          <div id="right" className="w-1/2 p-1 text-black">
            <div className="flex">
              {regions.map((region) => (
                <div
                  className={`mx-px my-1 flex w-[100px] cursor-pointer justify-center rounded-md p-2 text-center text-lg transition-colors duration-300 hover:bg-blue-200 ${
                    langText === region.value
                      ? "translate-c bg-blue-100 text-[#1967d2] underline-offset-1 transition-colors duration-300"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={(e) => handleDivClick(region.value)}
                >
                  <p>{region.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border bg-slate-100 p-3">
              <textarea
                readOnly={true}
                style={{ height: maxHeight }}
                className="h-full w-full resize-none bg-slate-100 text-xl text-black focus:outline-none"
                value={outputText}
                placeholder="Bản dịch"
              />
              <div>
                <CopyToClipboard text={outputText}>
                  <CopyLabel />
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
