from .rules import *


def _split_chars(fh: str):
    _fh = fh.replace("\n", " ")
    _fh = _fh.replace("\t", " ")
    chars = _fh.split(" ")
    return [c for c in chars if c != ""]


def get_dict_by_value(chars: str, _dict: dict):
    arr_result = [("", "")]
    for key, value in _dict.items():
        if value == chars[:len(value)]:
            arr_result.append((key, value))

    arr_result.sort(key=lambda x: len(x[1]), reverse=True)
    return arr_result[0]


def _convert_by_char(chars):
    # get ons
    output = ""
    ons = ""
    nuc = ""
    cod = ""
    _offset = 0
    if len(chars) > 0:
        if chars[0] == "[" and chars[-1] == "]":
            return chars.replace("[", "").replace("]", "")

        if chars[0] == "ʔ":
            ons = ""
            _offset = 1
        elif chars[0] == "w":  # no onset
            ons = "u"
            _offset = 1
        elif chars[:2] == 'tɕ':
            ons = "ch"
            _offset = 2
        else:
            ons_key, ons_value = get_dict_by_value(chars[_offset:], onsets)
            ons = ons_key
            _offset += len(ons_value)

        # nuclei
        if len(chars[_offset:]) > 0:
            nuc_key, nuc_value = get_dict_by_value(chars[_offset:], offglides)
            if nuc_key == "":
                nuc_key, nuc_value = get_dict_by_value(chars[_offset:], nuclei)
            if nuc_key == "":
                nuc_key, nuc_value = get_dict_by_value(chars[_offset], onoffglides)
            nuc = nuc_key
            _offset += len(nuc_value)

        # last
        if len(chars[_offset:]) > 0:
            _dict_special = {
                "ng": "ŋ͡m",
                "c": "k͡p",
                "nh": "ʲŋ",
                "ch": "ʲk"
            }
            cod_key, cod_value = get_dict_by_value(chars[_offset:], _dict_special)
            if cod_key == "":
                cod_key, cod_value = get_dict_by_value(chars[_offset:], codas)
            cod = cod_key
            _offset += len(cod_value)
        # tone
        tone = chars[-2:]
        try:
            if tone == 'ᴬ¹':
                pass
            elif tone == 'ᴬ²':
                nuc = nuc[0] + tone_unicode["huyen"] + nuc[1:]
            elif tone == 'ᴮ¹':
                nuc = nuc[0] + tone_unicode["sac"] + nuc[1:]
            elif tone == 'ᴮ²':
                nuc = nuc[0] + tone_unicode["nang"] + nuc[1:]
            elif tone == 'ᶜ¹':
                nuc = nuc[0] + tone_unicode["hoi"] + nuc[1:]
            elif tone == 'ᶜ²':
                nuc = nuc[0] + tone_unicode["nga"] + nuc[1:]
            elif tone == 'ᴰ¹':
                nuc = nuc[0] + tone_unicode["sac"] + nuc[1:]
            elif tone == 'ᴰ²':
                nuc = nuc[0] + tone_unicode["nang"] + nuc[1:]
        except IndexError:
            pass

    output = " ".join([ons + nuc + cod])
    return output


def ipa_to_vn(fh: str = ""):
    chars = _split_chars(fh)
    result = [_convert_by_char(c) for c in chars]
    return " ".join(filter(None, result))
