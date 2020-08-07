#!/usr/bin/python

# python37 scripts/translate-jsons.py

import os
import json
from googletrans import Translator

translator = Translator(service_urls=["translate.google.cn"])

blackList = ("keyword", "id")


def translate(str):
    # return "测试"
    return translator.translate(str, src="en", dest="zh-CN").text


def translateRecusively(data):
    keys = data
    if isinstance(data, list):
        keys = range(len(data))
    for key in keys:
        value = data[key]
        if isinstance(value, list) or isinstance(value, dict):
            translateRecusively(value)
        elif key not in blackList and isinstance(value, str) and value != "":
            data[key] = translate(data[key])


baseDir = os.path.join(os.path.dirname(__file__), "../src/assets")
files = ("heroes/details.en.json", "items/infos.en.json",
         "synergies/infos.en.json")

for file in files:
    filePath = os.path.abspath(os.path.join(baseDir, file))

    enJsonFile = open(filePath, "r", encoding="utf-8")
    enJsonString = enJsonFile.read()
    enJsonFile.close()
    enJson = json.loads(enJsonString)

    translateRecusively(enJson)

    cnJsonFile = open(filePath.replace(
        ".en.", ".zh-CN."), "w", encoding="utf-8")
    cnJsonString = json.dumps(enJson, indent=2, ensure_ascii=False)
    cnJsonFile.write(cnJsonString)
    cnJsonFile.close()

exit
