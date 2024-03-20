import { useState, useEffect } from "react";
import Header from "./Header";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyLabel, VoLumeLabel } from "./common/Label";
import {
  translateTextToIpa,
  translateTextToSpeech,
} from "../services/translate.service";
import north from "../images/north.jpg";
import south from "../images/south.jpg";
import { NORTH_VALUE, SOUTH_VALUE, DEFAUT_HEIGHT_TEXT } from "../constants";
import './css/Home.css';

interface Region {
  value: string;
}

var regions: Region[] = [{ value: NORTH_VALUE }, { value: SOUTH_VALUE }];

export function Translate() {
  const [backgroundImage, setBackgroundImage] = useState(north);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [langText, setLangTest] = useState(NORTH_VALUE);
  const [maxHeight, setMaxHeight] = useState(DEFAUT_HEIGHT_TEXT + "px");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutputText("Đang dịch...")
      handleTranslate(inputText, langText);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputText, langText]);

  useEffect(() => {
    langText === SOUTH_VALUE ? setBackgroundImage(south) : setBackgroundImage(north)
  }, [langText])
  const handleChangeRowArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height =
      Math.min(
        Math.max(DEFAUT_HEIGHT_TEXT, e.target.scrollHeight + 7),
        DEFAUT_HEIGHT_TEXT * 2,
      ) + "px";
    setMaxHeight(e.target.style.height);
  };

  const handleTranslate = async (inputData: string, region: string) => {
    try {
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
        backgroundSize: "cover",
        backgroundPosition: "top",
        transition: 'background-image 0.5s ease',
      }}
    >
      <Header />
      <div id="body" className="mx-16 h-full">
        <div className="min-w flex items-center justify-center pt-24">
          <div id="left" className="min-h-full w-1/2 p-1">
            <div className={`region-choose`}>
              <p>Tiếng Việt</p>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <textarea
                className="font-text h-full w-full resize-none text-xl text-black focus:outline-none"
                value={inputText}
                style={{ height: maxHeight }}
                onChange={(e) => { handleChangeRowArea(e); }}
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
                  className={`${langText === region.value ? "region-choose" : "region-not-choose"}`}
                  onClick={(e) => {
                    setLangTest(region.value);
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
                className="font-text h-full w-full resize-none bg-slate-100 text-xl text-black focus:outline-none"
                value={outputText}
                placeholder="Bản dịch"
              />
              <div>
                <CopyToClipboard text={outputText}>
                  <CopyLabel />
                </CopyToClipboard>
                <VoLumeLabel
                  isPlaying={playing}
                  onClick={(e) => translateTextToSpeech(outputText, "ipa", "vi", setPlaying)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Translate;
