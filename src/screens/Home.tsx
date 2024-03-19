import { useState } from "react";
import Header from "./Header";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyLabel, VoLumeLabel } from "../components/Label";
import LangButton from "../components/LangButton";
import {
  translateTextToIpa,
  translateTextToSpeech,
} from "../services/translate.service";
import north from "../images/north.jpg";
import south from "../images/south.jpg";

interface Region {
  value: string;
}

var regions: Region[] = [{ value: "Bắc" }, { value: "Nam" }];

export function Home() {
  const [backgroundImage, setBackgroundImage] = useState(north);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [langText, setLangTest] = useState("Bắc");
  const defautMaxHeight = 150;
  const [maxHeight, setMaxHeight] = useState(defautMaxHeight + "px");
  const [playing, setPlaying] = useState(false);

  const handleChangeRowArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height =
      Math.min(
        Math.max(defautMaxHeight, e.target.scrollHeight + 7),
        defautMaxHeight * 2,
      ) + "px";
    setMaxHeight(e.target.style.height);
  };

  const handleTranslate = async (inputData: string, region: string) => {
    try {
      if (region == "Nam") {
        setBackgroundImage(south);
      } else {
        setBackgroundImage(north);
      }
      var output = await translateTextToIpa(inputData, region);
      setOutputText(output);
    } catch (error) {
      console.error("Error while translating:", error);
    }
  };

  return (
    <div
      className="overflow-y-scro h-screen w-screen justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "auto",
        backgroundPosition: "top",
      }}
    >
      <Header />
      <div id="body" className="mx-16 h-full">
        <div className="min-w flex items-center justify-center pt-24">
          <div id="left" className="min-h-full w-1/2 p-1">
            <div
              className={`"translate-c duration-300" mx-px my-1 flex w-[100px] cursor-pointer justify-center rounded-md bg-blue-100 p-2 text-center text-lg text-[#1967d2] underline-offset-1 transition-colors transition-colors duration-300 hover:bg-blue-200`}
            >
              <p>Tiếng Việt</p>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <textarea
                className="h-full w-full resize-none text-xl text-black focus:outline-none"
                value={inputText}
                style={{ height: maxHeight }}
                onChange={(e) => {
                  handleTranslate(e.target.value, langText);
                  handleChangeRowArea(e);
                }}
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
                  className={`mx-px my-1 flex w-[100px] cursor-pointer justify-center rounded-md p-2 text-center text-lg transition-colors duration-300 hover:bg-blue-200 ${langText === region.value
                    ? "translate-c bg-blue-100 text-[#1967d2] underline-offset-1 transition-colors duration-300"
                    : "bg-white text-gray-700"
                    }`}
                  onClick={(e) => {
                    setLangTest(region.value);
                    handleTranslate(inputText, region.value);
                  }}
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
                <VoLumeLabel
                  isPlaying={playing}
                  onClick={(e) =>
                    translateTextToSpeech(outputText, "ipa", "vi", setPlaying)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
