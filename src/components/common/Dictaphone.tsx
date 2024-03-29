import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MicroLabel } from './icons/Label';

type Props = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};
const Dictaphone = (
    { text, setText }: Props

) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [defaultText, setDefaultText] = React.useState(text);
    useEffect(() => {
        console.log(defaultText);
        console.log(text);
        if (defaultText === "") {
            setText(transcript);
        } else {
            setText(defaultText + " " + transcript);
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleListen = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            console.log("111")
        } else {
            setDefaultText(text);
            SpeechRecognition.startListening();
        }
    }

    return (
        <MicroLabel key="micro" isPlaying={listening} onClick={(e) => handleListen()} />
    );
}
export default Dictaphone;