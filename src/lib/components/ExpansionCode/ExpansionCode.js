/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import React from "react";
import {styles} from "./styles";
// Components
import Tooltip from "@material-ui/core/Tooltip";
import H3 from "../H3";
import Code from "../Code";
// MaterialUI components
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// MaterialUI icons
import CodeIcon from '@material-ui/icons/Code';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// PropTypes validators
import PropTypes, {arrayOf} from "prop-types";
import DemoCodeActionValidator from "../../validators/DemoCodeActionValidator";
// Utils
import {withStyles} from "@material-ui/styles";
import {useSnackbar} from "notistack";
import {useCommonStyles} from "../../stylesheets/commonStyles";
import clsx from "clsx";
import copyToClipboard from "../../utils/copyToClipboard";
import {getFieldFromLang} from "../../utils";
import {useLang} from "../../hooks";


export const displayName = "MaterialDocs-ExpansionCode";

const ExpansionCode = React.forwardRef(function ExpansionCode(props, ref) {
    const {
        language,
        children,
        name,
        noTag,
        style,
        className,
        collapsedHeight = 100,
        actions,
        classes,
        ...other
    } = props;
    const commonClasses = useCommonStyles();
    const {lang} = useLang();
    const {enqueueSnackbar} = useSnackbar();
    const [expand, setExpand] = React.useState(false);
    const menuAnchor = React.useRef(null);
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <Box className={clsx(classes.root, commonClasses.pageBlock, className)} style={style} ref={ref}>
            <Toolbar className={classes.toolbar}>
                {actions &&
                <React.Fragment>
                    <Tooltip title={getFieldFromLang(lang, "MaterialDocs/ExpansionCode/moreActions")}>
                        <IconButton ref={menuAnchor} onClick={event => setMenuOpen(true)}>
                            <MoreVertIcon fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={menuAnchor.current}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        open={menuOpen}
                        onClose={event => setMenuOpen(false)}
                    >
                        {actions.map(action =>
                            <a
                                className={classes.menuButtonLink}
                                key={`menu-item-${action.label} ${action.link}`}
                                href={action.link}
                            >
                                <MenuItem button>
                                    {action.label}
                                </MenuItem>
                            </a>
                        )}

                    </Menu>
                </React.Fragment>
                }
                <Tooltip title={getFieldFromLang(lang, "MaterialDocs/ExpansionCode/copyToClipboard")}>
                    <IconButton
                        onClick={() => {
                            copyToClipboard(children)
                                .then(res => enqueueSnackbar(getFieldFromLang(lang, "MaterialDocs/notices/codeCopied"), {variant: "success"}))
                                .catch(error => enqueueSnackbar(getFieldFromLang(lang, "MaterialDocs/notices/codeNotCopied"), {variant: "error"}));
                        }}
                    >
                        <FileCopyIcon fontSize={"small"}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={getFieldFromLang(lang, "MaterialDocs/ExpansionCode/expand")}>
                    <IconButton onClick={event => setExpand(!expand)}>
                        <CodeIcon fontSize={"small"}/>
                    </IconButton>
                </Tooltip>
                {name &&
                <H3 className={classes.codeName} noDivider>{name}</H3>
                }
            </Toolbar>
            <Collapse
                in={expand}
                collapsedHeight={collapsedHeight}
                className={classes.collapse}
                disableStrictModeCompat
            >
                <Code {...other}>
                    {children}
                </Code>
            </Collapse>
        </Box>
    );
});

ExpansionCode.displayName = displayName;

ExpansionCode.propTypes = {
    // ExpansionCodeProps
    name: PropTypes.string,
    noTag: PropTypes.bool,
    collapsedHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    actions: arrayOf(DemoCodeActionValidator),
    // CodeProps
    theme: PropTypes.oneOf(["light", "dark", "darcula"]),
    language: PropTypes.oneOf([
        "1c", "abnf", "accesslog", "actionscript", "ada", "angelscript", "apache", "applescript", "arcade",
        "arduino", "armasm", "asciidoc", "aspectj", "autohotkey", "autoit", "avrasm", "awk", "axapta", "bash",
        "basic", "bnf", "brainfuck", "c-like", "c", "cal", "capnproto", "ceylon", "clean", "clojure-repl", "clojure",
        "cmake", "coffeescript", "coq", "cos", "cpp", "crmsh", "crystal", "csharp", "csp", "css", "d", "dart",
        "delphi", "diff", "django", "dns", "dockerfile", "dos", "dsconfig", "dts", "dust", "ebnf", "elixir",
        "elm", "erb", "erlang-repl", "erlang", "excel", "fix", "flix", "fortran", "fsharp", "gams", "gauss",
        "gcode", "gherkin", "glsl", "gml", "go", "golo", "gradle", "groovy", "haml", "handlebars", "haskell",
        "haxe", "hsp", "htmlbars", "http", "hy", "inform7", "ini", "irpf90", "isbl", "java", "javascript",
        "jboss-cli", "json", "julia-repl", "julia", "kotlin", "lasso", "latex", "ldif", "leaf", "less", "lisp",
        "livecodeserver", "livescript", "llvm", "lsl", "lua", "makefile", "markdown", "mathematica", "matlab",
        "maxima", "mel", "mercury", "mipsasm", "mizar", "mojolicious", "monkey", "moonscript", "n1ql", "nginx",
        "nim", "nix", "nsis", "objectivec", "ocaml", "openscad", "oxygene", "parser3", "perl", "pf", "pgsql",
        "php-template", "php", "plaintext", "pony", "powershell", "processing", "profile", "prolog", "properties",
        "protobuf", "puppet", "purebasic", "python-repl", "python", "q", "qml", "r", "reasonml", "rib", "roboconf",
        "routeros", "rsl", "ruby", "ruleslanguage", "rust", "sas", "scala", "scheme", "scilab", "scss", "shell",
        "smali", "smalltalk", "sml", "sqf", "sql", "stan", "stata", "step21", "stylus", "subunit", "swift",
        "taggerscript", "tap", "tcl", "thrift", "tp", "twig", "typescript", "vala", "vbnet", "vbscript-html",
        "vbscript", "verilog", "vhdl", "vim", "x86asm", "xl", "xml", "xquery", "yaml", "zephir"
    ]),
    children: PropTypes.string,
    // Stylable
    style: PropTypes.object,
    className: PropTypes.string,
    classes: PropTypes.object,
}

export default withStyles(styles, {name: displayName})(ExpansionCode);