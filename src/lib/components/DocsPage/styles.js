/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import {createStyles} from "@material-ui/core/styles";

export const styles = theme => createStyles({
    root: {},
    contentItem: {
        borderLeft: "5px solid rgba(0,0,0,0)",
        "&:hover": {
            borderColor: theme.palette.type === "light" ? theme.palette.lightgrey.main : theme.palette.lightgrey.dark,
        }
    },
    contentItemActive: {
        borderColor: theme.palette.type === "light" ? theme.palette.lightgrey.main : theme.palette.lightgrey.dark,
    },
    contentLink: {
        textDecoration: "none",
        color: "inherit",
    },
    copyright: {
        backgroundColor: theme.palette.type === "light" ? theme.palette.whitesmoke : theme.palette.whitesmoke.dark,
        color: theme.palette.type === "light" ? theme.palette.lightgrey.main : theme.palette.lightgrey.dark,
    },
    typography: {
        overflowWrap: "break-word",
        maxWidth: `calc(10vw - ${theme.spacing(2)}px)`,
    },
    navigationList: {
        position: "fixed",
        width: "100%",
        maxHeight: `calc(100vh - ${theme.spacing(16)}px)`,
        overflowY: "auto",
    }
});