import { useEffect, useRef, useState } from "react"
import { VoLumeLabel } from "./icons/Label"
import { getUrlTts, } from "../../services/translate.service";

interface TranslateTextToSpeechProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isPlaying?: boolean;
    setPlaying?: React.Dispatch<React.SetStateAction<boolean>>
    lang?: string;
    text: string;
}
export const TranslateTextToSpeech: React.FC<TranslateTextToSpeechProps> = ({
    onClick, className, lang, text
}) => {
    const [isPlaying, setPlaying] = useState(false);
    const handlePlaying = () => {
        setPlaying(!isPlaying);
    }
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        if (isPlaying) {
            const url = getUrlTts(text, "ipa", "vi");
            const tempAudio = new Audio(url);
            audioRef.current = tempAudio;
            if (audioRef.current) {
                audioRef.current.onended = () => {
                    setPlaying(false);
                }

                audioRef.current.play()
                    .then(() => { })
                    .catch(error => {
                        setPlaying(false);
                        console.error('There was a problem playing the audio:', error);
                    });
            }
        } else if (!isPlaying && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, [isPlaying])

    return <VoLumeLabel isPlaying={isPlaying} onClick={() => handlePlaying()} />
}
export default TranslateTextToSpeech;