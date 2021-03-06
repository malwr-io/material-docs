/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

/// <reference types="react" />
import PagesGroupData from "../../interfaces/PagesGroupData";
import Containerable from "../../interfaces/Containerable";

export const displayName: string;

export interface PagesGroupProps
    extends Containerable {
    /**
     * name - name of the group.
     * @type string
     */
    name: string;
    /**
     * getData - callback, used to get group data.
     * @function
     * @param {PagesGroupData} data
     * @return void
     */
    getData?(data: PagesGroupData): void;
    /**
     * defaultExpanded - if true, menu group will be expanded on startup.
     * @type boolean
     */
    defaultExpanded?: boolean;
    /**
     * order - as lower order as higher will be displayed menu item.
     * @type number
     */
    order?: number;
}

/**
 * PagesGroup - function, used to group pages by sense. Used with AutoDocsMenu.
 * @param {PagesGroupProps} props
 * @constructor
 * @see http://material-docs.com/component-apis/pagesgroup
 * @example
 * <PagesGroup name="Cool group">
 *     <DocsPage name="Cool page"> ... </DocsPage>
 *     <DocsPage name="Cooler page"> ... </DocsPage>
 * </PagesGroup>
 */
export default function PagesGroup(props: PagesGroupProps): JSX.Element;