/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import React from "react";
import {useCommonStyles} from "../../stylesheets/commonStyles";
import {styles} from "./styles";
// PropTypes validators
import PropTypes from "prop-types";
// Utils
import {withStyles} from "@material-ui/styles";
import generateMaterialDocsFromMarkdown from "../../utils/generateMaterialDocsFromMarkdown";
import clsx from "clsx";
import replaceMarkdownParams from "../../utils/replaceMarkdownParams";
import {getFieldFromLang} from "../../utils";
import {useLang} from "../../hooks";


export const displayName = "MatDocMarkdown";

const Markdown = React.forwardRef(function Markdown(props, ref) {
    const {
        children,
        className,
        style,
        inline = false,
        data = {},
        classes,
        typographyInheritSize,
        locale,
        ...other
    } = props;
    const {lang} = useLang();
    const commonClasses = useCommonStyles();
    const [content, setContent] = React.useState(null);

    React.useEffect(() => {
        if (lang && typeof locale === "string" && typeof getFieldFromLang(lang, locale) === "string") {
            setContent(getFieldFromLang(lang, locale));
        } else {
            try {
                let child = "";
                if (children)
                    child = React.Children.map(children, String).join("");
                if (typeof data === "object") child = replaceMarkdownParams(child, data);
                setContent(generateMaterialDocsFromMarkdown(child, data, {typographyInheritSize}));
            } catch (error) {
                setContent(null);
                console.error(error);
            }
        }
    }, [children, locale]);

    if (inline) {
        return (
            <span ref={ref} className={clsx(commonClasses.pageBlock, classes.root, className)} style={style}>
                {content}
            </span>
        );
    }

    return (
        <div ref={ref} className={clsx(commonClasses.pageBlock, classes.root, className)} style={style}>
            {content}
        </div>
    );
});

Markdown.displayName = displayName;

Markdown.propTypes = {
    // MarkdownProps
    inline: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    // Stylable
    style: PropTypes.object,
    className: PropTypes.string,
    classes: PropTypes.object,
    // Containerable
}

export default withStyles(styles, {name: displayName})(Markdown);