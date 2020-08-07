import React from "react";
import ListItemContained from "../ListItemContained";
import {useStyles} from "./styles";
import clsx from "clsx";

function ListItem({children, type = "circle", ...props}, ref) {
    const classes = useStyles();
    const containers = React.Children.map(children, child => child.type === ListItemContained ? child : null);
    if (containers.length > 1) console.error("MaterialDocs: List item can contain only one ListItemContained element");

    const containedItems = containers[0] && containers[0].props && containers[0].props.children;
    const content = React.Children.map(children, child => child.type === ListItemContained ? null : child);

    let listTypeClass = classes.typeCircle;
    switch (type) {
        case "square":
            listTypeClass = classes.typeSquare;
            break;
        case "upper-roman":
            listTypeClass = classes.typeRoman;
            break;
        case "lower-alpha":
            listTypeClass = classes.typeAlpha;
            break;
        case "none":
            listTypeClass = classes.typeNone;
            break;
    }

    return (
        <li {...props} ref={ref} className={clsx(classes.root, listTypeClass)}>
            <div>
                <div>
                    {content}
                </div>
                {containedItems &&
                <ul className={classes.list}>
                    {containedItems}
                </ul>
                }
            </div>
        </li>
    );
}

export default React.forwardRef(ListItem);