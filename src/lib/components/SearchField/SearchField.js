/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import React from "react";
import {styles} from "./styles";
// Components
import SearchMenuItem from "./SearchMenuItem";
// MaterialUI components
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItem from "@material-ui/core/ListItem";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
// MaterialUI icons
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
// PropTypes validators
import PropTypes from "prop-types";
import SearchDataItemValidator from "../../validators/SearchDataItemValidator";
// Utils
import {withStyles} from "@material-ui/styles";
import {useChangeRoute} from "routing-manager";
import clsx from "clsx";
import {useLang} from "../../hooks";
import {getFieldFromLang} from "../../utils";


export const displayName = "MaterialDocs-SearchField";

const SearchField = React.forwardRef(function SearchField(props, ref) {
    const {
        className,
        style,
        searchData = [],
        doSearch,
        classes,
        ...other
    } = props;
    const {changeRoute} = useChangeRoute();
    const {lang} = useLang()
    const [text, setText] = React.useState("");
    const [focused, setFocused] = React.useState(false);
    const [found, setFound] = React.useState([]);
    const [selected, setSelected] = React.useState(0);
    const rootRef = React.useRef(null);
    const inputRef = React.useRef(null);

    // Effect for setting selected first element when query is changed
    React.useEffect(() => {
        setSelected(0);
    }, [text]);

    /**
     * handleSearchItemSelected - made search panel close on found item select.
     * @function
     * @param {Event} event
     */
    function handleSearchItemSelected(event) {
        event.preventDefault();
        event.stopPropagation();
        setText("");
        setFocused(false);
        inputRef.current && inputRef.current.blur();
    }

    /**
     * handleTextInput - handles user query text input and auto search.
     * @function
     * @throws TypeError
     * @param {event} event
     */
    function handleTextInput(event) {
        setText(event.target.value);
        if (doSearch && typeof doSearch !== "function")
            throw new TypeError(`MaterialDocs: Incorrect type for doSearch prop, expected function, got ${typeof doSearch}`);
        if (doSearch) {
            doSearch(event.target.value, searchData).then(result => setFound(result));
        } else {
            search(event.target.value || "").then(result => setFound(result));
        }
    }

    /**
     * handleItemAction - handling found item action when it is selected.
     * @function
     * @param {SearchDataItem} data
     * @throws TypeError
     */
    function handleItemAction(data) {
        switch (typeof data.redirect) {
            case "string":
                window.location.href = data.redirect;
                break;
            case "function":
                data.redirect();
                break;
            case "object":
                changeRoute(data.redirect);
                break;
            default:
                throw new TypeError(`MaterialDocs: Incorrect type for redirect. Got ${typeof data.redirect}, expected object | string | function`);
        }
    }

    /**
     * handleKeyDown - function for handling keyboard events in found items list.
     * @function
     * @param {KeyboardEvent} event
     */
    function handleKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                setSelected(prev => prev > 0 ? prev - 1 : found.length - 1);
                event.preventDefault();
                event.stopPropagation();
                break;
            case "ArrowDown":
                setSelected(prev => prev < found.length - 1 ? prev + 1 : 0);
                event.preventDefault();
                event.stopPropagation();
                break;
            case "Enter":
                found[selected] && handleItemAction(found[selected]);
                found[selected] && setText("");
                inputRef.current.blur();
                setFocused(false);
                break;
            case "Escape":
                inputRef.current.blur();
                setFocused(false);
                break;
        }
    }

    /**
     * search - function, designed to do search from searchData by query string input.
     * @function
     * @param {string} input
     * @throws TypeError
     * @returns {SearchDataItem[]}
     */
    async function search(input) {
        if (input && typeof input !== "string")
            throw new TypeError(`MaterialDocs: incorrect type ${typeof input} for search query, expected string!`);
        if (!input) return [];
        const query = input.toLowerCase().replace(/  /g, "").split(" ").filter(item => item);
        const result = new Set();
        for (const keyword of query) {
            for (const item of searchData) {
                let added = false;
                if (!item) throw new TypeError(`MaterialDocs: invalid search data object, expected SearchDataItem, got ${item}`);
                if (typeof item.label !== "string")
                    throw new TypeError(`MaterialDocs: incorrect type ${typeof item.label} for label, expected string!`);
                if (item.description && typeof item.description !== "string")
                    throw new TypeError(`MaterialDocs: incorrect type ${typeof item.description} for description, expected string!`);
                for (const tag of item.tags) {
                    if (typeof tag !== "string")
                        throw new TypeError(`MaterialDocs: incorrect type ${typeof tag} for tag, expected string!`);
                    if (tag.toLowerCase().includes(keyword)) {
                        result.add(item);
                        added = true;
                        break;
                    }
                }
                if (!added && item.label.toLowerCase().includes(keyword)) {
                    result.add(item);
                    added = true;
                }
                if (!added && item.description && item.description.toLowerCase().includes(keyword)) result.add(item);
            }
        }
        return [...result];
    }

    return (
        <ClickAwayListener
            onClickAway={event => {
                setFocused(false);
                inputRef.current && inputRef.current.blur()
            }}
        >
            <Paper
                elevation={0}
                className={clsx(classes.root, focused && classes.rootFocused, className)}
                ref={element => {
                    rootRef.current = element;
                    if (ref) ref.current = element;
                }}
                style={style}
                onClick={event => inputRef.current && inputRef.current.focus()}
            >
                <SearchIcon className={classes.icon}/>
                <InputBase
                    onChange={handleTextInput}
                    value={text}
                    className={classes.input}
                    placeholder={getFieldFromLang(lang, "MaterialDocs/SearchField/label")}
                    onFocus={event => setFocused(true)}
                    onKeyDown={handleKeyDown}
                    inputRef={inputRef}
                />
                <CloseIcon
                    className={clsx(classes.icon, classes.iconClickable)}
                    onClick={event => setText("")}
                />
                <Popper
                    id="search-menu"
                    disablePortal={false}
                    anchorEl={rootRef.current}
                    open={!!text && focused}
                    placement={"bottom-end"}
                    className={classes.popper}
                    popperOptions={{positionFixed: true}}
                >
                    <Paper className={classes.listPaper} elevation={2}>
                        <List disablePadding>
                            {found.map((item, index) =>
                                <SearchMenuItem
                                    onBeforeSelected={handleSearchItemSelected}
                                    active={index === selected}
                                    onMouseMove={event => setSelected(index)}
                                    data={item}
                                    key={`search-menu-item-${item.label}`}
                                />
                            )}
                            {!found.length &&
                            <ListItem>
                                <ListItemIcon>
                                    <ErrorOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={"No results found"}
                                    secondary={"Try to rephrase the query"}
                                />
                            </ListItem>
                            }
                        </List>
                    </Paper>
                </Popper>
            </Paper>
        </ClickAwayListener>
    );
});

SearchField.displayName = displayName;

SearchField.propTypes = {
    // SearchFieldProps
    searchData: PropTypes.arrayOf(SearchDataItemValidator),
    doSearch: PropTypes.func,
    // Stylable
    style: PropTypes.object,
    className: PropTypes.string,
    classes: PropTypes.object,
}

export default withStyles(styles, {name: displayName})(SearchField);
