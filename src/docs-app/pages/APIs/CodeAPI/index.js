/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import React from "react";
import {Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {
    DocsPage,
    Code,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    List,
    ListItem,
    useLang,
    H1,
    H2,
    H3
} from "@danilandreev/material-docs";

const importCode = `
import {Code} from "@danilandreev/material-docs";
// or
import Code from "@danilandreev/material-docs/components/Code";
`.trim();

export default function CodeAPI() {
    const {lang} = useLang();
    const locale = lang.locale.pages.CodeAPI;
    const localeSpells = lang.locale.common.spells;
    const componentAPILocale = lang.locale.common.ComponentAPI;
    return (
        <DocsPage
            name={"Code API"}
            searchTags={["code", "highlight", "language", "api"]}
            searchDescription={locale.pageSearchDescription}
        >
            <H1 noDivider>Code API</H1>
            <H3 noDivider noTag>{locale.pageAbout}</H3>
            <H2>{localeSpells.Import}</H2>
            <Code language={"javascript"} theme={"darcula"}>
                {importCode}
            </Code>
            <Typography>
                {componentAPILocale.importDifferenceText.text1}&nbsp;
                <Link href={"https://material-ui.com/guides/minimizing-bundle-size/"}>
                    {componentAPILocale.importDifferenceText.link1}
                </Link>
                {componentAPILocale.importDifferenceText.text2}
            </Typography>
            <H2>{componentAPILocale.ComponentNameHeader}</H2>
            {locale.ComponentNameText}
            <H2>Props</H2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{componentAPILocale.propName}</TableCell>
                        <TableCell>{componentAPILocale.propType}</TableCell>
                        <TableCell>{componentAPILocale.propDefault}</TableCell>
                        <TableCell>{componentAPILocale.propDescription}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>language</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{locale.props.language}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>theme</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{locale.props.theme}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>children</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{locale.props.children}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <H2>CSS</H2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{componentAPILocale.ruleName}</TableCell>
                        <TableCell>{componentAPILocale.ruleDescription}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>root</TableCell>
                        <TableCell>{locale.css.root}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>highlighterContainer</TableCell>
                        <TableCell>{locale.css.highlighterContainer}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {componentAPILocale.customizationText}
            <List>
                <ListItem>
                    {componentAPILocale.customizationRule}&nbsp;
                    <Link href={"https://material-ui.com/customization/components/#overriding-styles-with-classes"}>
                        classes object prop
                    </Link>
                    .
                </ListItem>
                <ListItem>
                    {componentAPILocale.customizationClass}&nbsp;
                    <Link
                        href={"https://material-ui.com/customization/components/#overriding-styles-with-global-class-names"}>
                        global class name
                    </Link>
                    .
                </ListItem>
                <ListItem>
                    {componentAPILocale.customizationTheme}&nbsp;
                    <Link href={"https://material-ui.com/customization/globals/#css"}>
                        overrides property
                    </Link>
                    .
                </ListItem>
            </List>
            {componentAPILocale.customizationFooterText}
            <H2>Demos</H2>
            <List>
                <ListItem><Link>Code showers</Link></ListItem>
            </List>
        </DocsPage>
    );
}