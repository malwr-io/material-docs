/*
 * Author: Andrieiev Danil |  danssg08@gmail.com | https://github.com/DanilAndreev
 * Copyright (C) 2020.
 */

import React from "react";
// PropTypes validators
import PropTypes from "prop-types";

export const displayName = "MaterialDocs-ListItemContained";

class ListItemContained extends React.Component {
    render() {
        return this.props.children;
    }
}

ListItemContained.displayName = displayName;

ListItemContained.propTypes = {
    // Containerable
    children: PropTypes.node,
}

export default ListItemContained;
