from flask import send_file
from gtts import gTTS
import io
from .convert_ipa_to_vn import ipa_to_vn


def text_to_speech(text: str, lang_input: str, lang_output: str):
    lang_input = lang_input if lang_input is not None else "vi"
    lang_output = lang_output if lang_output is not None else "vi"
    text = text if text is not None else ""

    vi_text = ""
    if lang_input == "vi":
        vi_text = text
    elif lang_input == "ipa":
        vi_text = ipa_to_vn(text)

    tts = gTTS(text=vi_text, lang=lang_output)
    audio_io = io.BytesIO()
    tts.write_to_fp(audio_io)
    audio_data = audio_io.getvalue()
    return audio_data
