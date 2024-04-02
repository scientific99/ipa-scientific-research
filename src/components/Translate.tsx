import { useState, useEffect } from "react";
import { ClearLabel, CopyLabel } from "./common/icons/Label";
import { TranslateTextToSpeech } from "./common/TextToSpeech"
import { translateTextToIpa } from "../services/translate.service";
import { NORTH_VALUE, SOUTH_VALUE, DEFAUT_HEIGHT_TEXT } from "../constants";
import {
  CSSTransition
} from 'react-transition-group';
import './css/Translate.css';

interface Region {
  value: string;
}

type TranslateProps = {
  lang: string;
};

var regions: Region[] = [{ value: NORTH_VALUE }, { value: SOUTH_VALUE }];

export function Translate() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [langText, setLangTest] = useState(NORTH_VALUE);
  const [maxScreenHeight, setMaxScreenHeight] = useState(window.innerHeight <= 767 ? DEFAUT_HEIGHT_TEXT / 2 : DEFAUT_HEIGHT_TEXT);
  const [maxHeight, setMaxHeight] = useState(maxScreenHeight + "px");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputText === "") {
        setOutputText("");
      } else {
        setOutputText("Đang dịch...");
      }
      handleTranslate(inputText, langText);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputText, langText]);

  const handleChangeRowArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height =
      Math.min(
        Math.max(maxScreenHeight, e.target.scrollHeight + 7),
        maxScreenHeight * 2,
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight <= 767) {
        setMaxScreenHeight(DEFAUT_HEIGHT_TEXT / 2);
        setMaxHeight(DEFAUT_HEIGHT_TEXT / 2 + "px");
      } else {
        setMaxScreenHeight(DEFAUT_HEIGHT_TEXT);
        setMaxHeight(DEFAUT_HEIGHT_TEXT + "px");
      }
    };

    // Gắn sự kiện lắng nghe sự thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="body" className="relative w-full bg-while z-1 mx-auto">
      <div className="main w-full items-center justify-center pt-12 p-10 bg-while">
        <div id="left" className="left p-1">
          <div className="span-choose">
            <span>Tiếng Việt</span>
          </div>
          <div className="shadow-lg rounded rounded-lg border bg-white py-3 pl-3 pr-10 relative">
            <ClearLabel
              key="clear"
              className="absolute justify-end z-0 right-1 top-1"
              onClick={() => setInputText("")}
              hidlen={inputText.length == 0}
            />
            <textarea
              className="font-text w-full resize-none text-xl text-black focus:outline-none"
              value={inputText}
              style={{ height: maxHeight }}
              onChange={(e) => { handleChangeRowArea(e); }}
            />
            <CopyLabel text={inputText} />
            {/* <Dictaphone text={inputText} setText={setInputText} /> */}
          </div>
        </div>

        <div id="right" className="right p-1">
          <div className="flex">
            {regions.map((region) => (
              <div
                key={region.value}
                className={`${langText === region.value ? "span-choose" : "span-not-choose"}`}
                onClick={() => {
                  setLangTest(region.value);
                }}
              >
                <p>{region.value}</p>
                <CSSTransition
                  key={langText}
                  timeout={300}
                  classNames="border-transition"
                  unmountOnExit
                >
                </CSSTransition>
              </div>
            ))}
          </div>

          <div className="shadow-lg rounded rounded-lg border bg-slate-100 py-3 pl-3 pr-9 relative">
            <textarea
              readOnly={true}
              style={{ height: maxHeight }}
              className="font-text w-full resize-none bg-slate-100 text-xl text-black focus:outline-none"
              value={outputText}
              placeholder="Bản dịch"
            />
            <CopyLabel text={outputText} />
            <TranslateTextToSpeech key={langText} text={outputText} lang={langText} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Translate;
