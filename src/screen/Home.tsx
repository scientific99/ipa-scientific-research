import axios from "axios";
import { useState } from "react";
import Header from "./Header";

interface Region {
  value: string;
}

var regions: Region[] = [
  { value: "Bắc" },
  { value: "Trung" },
  { value: "Nam" },
];

export function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [langText, setLangTest] = useState("Bắc");
  const [rowTextArea, setRowTextArea] = useState(7);
  const handleDivClick = (e: string) => {
    setLangTest(e);
  };
  const handleTranslate = (e: string) => {
    axios.defaults.headers.common["Content-Type"] =
      "application/json charset=utf-8";

    axios
      .post("http://127.0.0.1:9000/api/v1.0/translate", { text_input: e })
      .then((response) => {
        console.log(response.data.data);
        var data = response.data.data;
        setOutputText(data);
      });
  };
  return (
    <div className="mx-20 h-full justify-center">
      <Header />
      <div id="translate-lang" className="grid h-full w-auto grid-cols-2 pt-24">
        <div>
          {/* <button className="h-auto w-auto rounded-md border bg-blue-100 p-2 font-sans hover:bg-blue-200">
            <p className="font-sans text-sm font-medium text-[#1967d2]">
              Tiếng Việt
            </p>
          </button> */}
          <div className="mx-px flex w-[100px] cursor-pointer justify-center rounded-md bg-blue-100 p-2 text-center transition-colors duration-300 hover:bg-blue-200">
            <p className="font-sans text-[16px] font-medium text-[#1967d2]">
              Tiếng Việt
            </p>
          </div>
        </div>
        <div className="flex">
          {regions.map((region) => (
            <div
              className={`mx-px flex w-[100px] cursor-pointer justify-center rounded-md p-2 text-center text-[16px] transition-colors duration-300 hover:bg-blue-200 ${
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
      </div>
      <div
        id="translate-body"
        className="min-w flex items-center justify-center text-black"
      >
        <div className="min-h-full w-1/2 p-1">
          <textarea
            className="h-full w-full rounded-lg border p-2 text-black"
            value={inputText}
            rows={rowTextArea}
            onChange={(e) => {
              setInputText(e.target.value);
              handleTranslate(e.target.value);
            }}
            placeholder="Nhập dữ liệu"
          />
        </div>
        <div className="w-1/2 p-1 text-black">
          <textarea
            readOnly={true}
            rows={rowTextArea}
            className="h-full w-full rounded-lg border bg-slate-100 p-2 text-black"
            value={outputText}
            placeholder="Bản dịch"
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
