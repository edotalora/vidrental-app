import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    const {
      items,
      valueProperty,
      textProperty,
      onItemSelect,
      selectedItem,
    } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => {
          return (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={
                item === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[textProperty]}
            </li>
          );
        })}
      </ul>
    );
  }
}
//Defining default props
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
