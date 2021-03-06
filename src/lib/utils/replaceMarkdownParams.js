/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import React from "react";
import {getFieldFromLang} from "./index";

export default function replaceMarkdownParams(markdown, storage = {}, lang) {
    function replaceParams(ref) {
        let affected = false;
        for (const key in storage) {
            if (ref.current.includes(`&&${key}`) || ref.current.includes(`$$${key}`))
                affected = true;
            ref.current = ref.current
                .replace(`&&${key}`, String(storage[key]))
                .replace(`$$${key}`, String(storage[key]));
        }
        return affected;
    }

    function replaceNextLocale(ref, startDelimiter = "${", endDelimiter = "}$") {
        if (!lang) return false;
        const start = ref.current.indexOf(startDelimiter);
        if (start < 0) return false;
        const end = ref.current.indexOf(endDelimiter, start);
        if (end < 0) return false;
        const variable = ref.current.slice(start, end + 2);
        const path = variable.slice(2, variable.length - 2);
        const locale = getFieldFromLang(lang, path);
        if (typeof locale !== "string") {
            ref.current = ref.current.replace(variable, `__incorrect locale(${path && "```" + path + "```"})__`);
            return true;
        }
        ref.current = ref.current.replace(variable, locale);
        return true;
    }

    function unScreen(ref) {
        ref.current = ref.current
            .replace(/\\&/g, "&")
            .replace(/\\\{/g, "{")
            .replace(/\\}/g, "}");
    }

    if (lang && typeof lang !== "object")
        throw new TypeError(`MaterialDocs: invalid param "lang", expected "Lang" got "${typeof lang}"`)
    if (lang && typeof lang.locale !== "object")
        throw new TypeError(`MaterialDocs: invalid param "lang.locale", expected "object" got "${typeof lang.object}"`)
    if (typeof markdown !== "string")
        throw new TypeError(`MaterialDocs: invalid param "markdown", expected "string" got "${typeof markdown}"`);
    if (typeof storage !== "object")
        throw new TypeError(`MaterialDocs: invalid param "storage", expected "object" got "${typeof storage}"`);

    const ref = React.createRef();
    ref.current = markdown;

    while (replaceParams(ref) || replaceNextLocale(ref) || replaceNextLocale(ref, "&{", "}&")) {
    }
    unScreen(ref)
    return ref.current;
}
