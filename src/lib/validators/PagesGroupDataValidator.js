/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import {pagesDataValidate} from "./PagesDataValidator";

/**
 * pagesGroupDataValidator - PropTypes validator for PagesGroupData interface.
 * @function
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns Error
 */
export function pagesGroupDataValidate(prop, propName, componentName) {
    if (typeof prop.name !== "string")
        return Error(`MaterialDocs: incorrect field 'name' type on prop ${propName} in component ${componentName}, expected "string", got "${typeof prop.name}"`);
    if (!Array.isArray(prop.pages))
        return Error(`MaterialDocs: incorrect field 'pages' type on prop ${propName} in component ${componentName}, expected "PageData[]", got "${typeof prop.name}"`)
    for (const item of prop.pages) {
        const validatePages = pagesDataValidate(prop.pages, propName, componentName);
        if (validatePages) return validatePages;
    }
    if (!Array.isArray(prop.groups))
        return Error(`MaterialDocs: incorrect field 'groups' type on prop ${propName} in component ${componentName}, expected "PagesGroupData[]", got "${typeof prop.name}"`)
    for (const item of prop.groups) {
        const validateGroups = pagesGroupDataValidate(prop.groups, propName, componentName);
        if (validateGroups) return validateGroups;
    }



}

export default function PagesGroupDataValidator(props, propName, componentName) {
    const prop = props[propName];
    if (prop) return pagesGroupDataValidate(prop, propName, componentName);
}
