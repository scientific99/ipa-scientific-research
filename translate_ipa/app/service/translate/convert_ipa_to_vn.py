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
    if nuc[:2] in ["iê", "yê", "uô", "ươ", "uâ"] and len(nuc) >= 2:
        index_tone = 1
    elif sum(list_vowel_bool) == 0:
        index_tone = 0
    elif sum(list_vowel_bool) == 1:
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

def _get_key_nuc(char):
    nuc_key = ""
    nuc_value = ""
    if char == "oːj":
        nuc_key = "ôi"
    elif len(char) > 0:
        nuc_key, nuc_value = _get_dict_by_value(char, offglides)
        if nuc_key == "":
            nuc_key, nuc_value = _get_dict_by_value(char, nuclei)
        if nuc_key == "":
            nuc_key, nuc_value = _get_dict_by_value(char, onoffglides)

    if nuc_value != char:
        return ""
    else:
        return nuc_key

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
        chars_fix = chars[_offset:]

        # tone
        tone = chars_fix[-2:]
        chars_fix = chars_fix[:-2]

        # cod
        _dict_special = {
            "ng": "ŋ͡m",
            "c": "k͡p",
            "nh": "ʲŋ",
            "ch": "ʲk"
        }
        for spec in _dict_special:
            if chars_fix.endswith(_dict_special[spec]):
                cod = spec
                chars_fix = chars_fix[:-len(_dict_special[spec])]
                break
        if cod == "":
            cod_key, cod_value = _get_dict_by_value(chars_fix[-1], codas)
            if cod_value != "":
                chars_fix = chars_fix[:-1]
                cod = cod_key

        # nuc
        nuc_mid = _get_key_nuc(chars_fix)
        if nuc_mid == "":
            chars_fix = chars_fix.replace(":", "").replace(chr(720), "")
            nuc = _get_key_nuc(chars_fix)

        nuc += nuc_mid
        if len(nuc) == 0:
            if chars_fix[0] == 'ʷ':
                nuc = "u"
                nuc_mid = _get_key_nuc(chars_fix[1:])

            nuc += nuc_mid

        # refactor
        if len(nuc) >= 3:
            if ("i" in nuc[1: len(nuc) - 1]) or (nuc[-1] == "i" and cod != "") :
                nuc = nuc.replace("i", "y")

        if nuc == "uya" and cod != "":
            nuc = "uyê"
        elif nuc == "ôô":
            nuc = "ô"

        if cod != "":
            if nuc[-2:] == "ia":
                nuc = nuc[0:-2] + "iê"
            elif nuc[-2:] == "ưa":
                nuc = nuc[0:-2] + "ươ"
            elif nuc[-2:] == "ua":
                nuc = nuc[0:-2] + "uô"

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
