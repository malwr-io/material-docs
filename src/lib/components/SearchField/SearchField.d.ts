/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

/// <reference types="react" />
import Stylable from "../../interfaces/Stylable";
import SearchDataItem from "../../interfaces/SearchDataItem";

export const displayName: string;

export interface SearchFieldProps
    extends Stylable {
    /**
     * searchData - array of SearchDataItem items to do search from.
     * @type SearchDataItem[]
     */
    searchData?: SearchDataItem[];

    /**
     * doSearch - callback, called on search. If defined, default search function will not be called. Must return array of SearchDataItem.
     * @function
     * @async
     * @param {string} query
     * @param {SearchDataItem[]} searchData
     * @return SearchDataItem[]
     */
    doSearch?(query: string, searchData: SearchDataItem[]): Promise<SearchDataItem[]>;
}

/**
 * SearchField - react component, designed to provide search mechanism.
 * @param {SearchFieldProps} props
 * @constructor
 * @see http://material-docs.com/component-apis/system-components/searchfield
 * @example
 * <SearchField searchData={...data...} />
 */
export default function SearchField(props: SearchFieldProps): JSX.Element;
