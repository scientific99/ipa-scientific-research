from .rules import *
import re

_split_chars = lambda fh: [c for c in re.sub(r'\s+', ' ', fh).split(" ")]
_check_dau_phu = lambda x: x in ["ă", "â", "ư", "ê", "ô", "ơ"]


def _add_tone(ons, nuc, cod, tone):
    if nuc == "":
        return nuc
    tone_name = ""
    if tone == 'ᴬ¹':
        return nuc
    elif tone == 'ᴬ²':
        tone_name = "huyen"
    elif tone == 'ᴮ¹':
        tone_name = "sac"
    elif tone == 'ᴮ²':
        tone_name = "nang"
    elif tone == 'ᶜ¹':
        tone_name = "hoi"
    elif tone == 'ᶜ²':
        tone_name = "nga"
    elif tone == 'ᴰ¹':
        tone_name = "sac"
    elif tone == 'ᴰ²':
        tone_name = "nang"

    list_vowel_bool = [c in list_vowel for c in nuc]
    index_tone = -1
    # print(list_vowel_bool)
    if sum(list_vowel_bool) == 0:
        index_tone = 0
    if sum(list_vowel_bool) == 1:
        index_tone = list_vowel_bool.index(True)
    else:
        index_tone = list_vowel_bool.index(True)
        # index_tone = -1
        # for _i in range(len(nuc)):
        #     if _check_dau_phu(nuc[_i]):
        #         index_tone = _i
        #         break

    if index_tone != -1:
        nuc = nuc[: index_tone + 1] + tone_unicode[tone_name] + nuc[index_tone + 1:]

    # try:
    #     nuc = nuc[0] + tone_unicode[tone_name] + nuc[1:]
    # except IndexError:
    #     return nuc

    return nuc


def _get_dict_by_value(chars: str, _dict: dict):
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
            ons = ""
            nuc = "u"
            _offset = 1
        elif chars[:2] == 'tɕ':
            ons = "ch"
            _offset = 2
        else:
            ons_key, ons_value = _get_dict_by_value(chars[_offset:], onsets)
            ons = ons_key
            _offset += len(ons_value)

        # nuclei
        if len(chars[_offset:]) > 0:
            nuc_key, nuc_value = _get_dict_by_value(chars[_offset:], offglides)
            if nuc_key == "":
                nuc_key, nuc_value = _get_dict_by_value(chars[_offset:], nuclei)
            if nuc_key == "":
                nuc_key, nuc_value = _get_dict_by_value(chars[_offset], onoffglides)
            nuc += nuc_key
            _offset += len(nuc_value)

        # last
        if len(chars[_offset:]) > 0:
            _dict_special = {
                "ng": "ŋ͡m",
                "c": "k͡p",
                "nh": "ʲŋ",
                "ch": "ʲk"
            }
            cod_key, cod_value = _get_dict_by_value(chars[_offset:], _dict_special)
            if cod_key == "":
                cod_key, cod_value = _get_dict_by_value(chars[_offset:], codas)
            cod = cod_key
            _offset += len(cod_value)

        # refactor
        if len(nuc) >= 3:
            if ("i" in nuc[1: len(nuc) - 1]) or (nuc[-1] == "i" and cod != "") :
                nuc = nuc.replace("i", "y")

        if nuc == "uya" and cod != "":
            nuc = "uyê"
        # tone
        tone = chars[-2:]
        nuc = _add_tone(ons, nuc, cod, tone)

    output = " ".join([ons + nuc + cod])
    return output


def ipa_to_vn(fh: str = ""):
    chars = _split_chars(fh)
    result = [_convert_by_char(c) for c in chars]
    return " ".join(filter(None, result))


if __name__ == '__main__':
    # luyến
    ipa_to_vn("lʷiənᴮ¹")
