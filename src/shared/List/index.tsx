import { Checkbox } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import React from "react";
import { useThemeSettings } from "../../hooks";
import Icon from "../Icon";
import "./style.scss";

export interface Props<T extends { _id: string } & Record<string, any>> {
  header: string
  setItems: (data: T[]) => void
  setSelectedItems: (data: string[]) => void
  fields: (keyof T | ((data: T) => string))[]
  icons?: ((index: number, _id: string) => void)[]
  onDelete?: (items: T[]) => void
  items: T[]
  selectedItems: string[]
}

export default function List<T extends { _id: string }>(props: Props<T>) {
  const { items, selectedItems, setItems, setSelectedItems, header, fields } = props;
  const { theme } = useThemeSettings();

  return <div className="List" style={{ backgroundColor: theme.color.base }}>
    <div className="List-header" style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }}>
      <Checkbox color="primary" key={"checkbox"} onClick={(e) => {
        if ((e.target as any).checked) {
          setSelectedItems(items.map(item => item._id))
        }
        else {
          setSelectedItems([])
        }
      }} checked={items.length !== 0 && selectedItems.length === items.length} />
      {selectedItems.length}/{items.length}
      <div className="List-header-title">{header}</div>
      <div className="List-header-icons">
        <Icon popoverText={`Remove ${selectedItems.length} selected items`} key={"deleteicon"} >
          <CancelIcon className={"List-header-icons--cancel"} onClick={() => {
            const remainingItems = items.filter(item => !selectedItems.includes(item._id))
            setItems(remainingItems)
            props.onDelete && props.onDelete(remainingItems)
          }} />
        </Icon>
      </div>
    </div>
    <div className="List-content" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.dark }}>
      {items.length > 0 ?
        items.map((item, index) => {
          const { _id } = item
          return <div className="List-content-item" key={_id} style={{ backgroundColor: theme.color.light }}>
            <div className="List-content-item-icons">
              <Checkbox color="primary" className="List-content-item-icons--checkbox" key={_id + "checkbox" + index} onClick={(e) => {
                if ((e.target as any).checked) {
                  setSelectedItems([...selectedItems, _id])
                }
                else {
                  setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== _id))
                }
              }} checked={selectedItems.includes(_id)} value={_id} />
              <Icon key={_id + "icon" + index} popoverText="Delete this item">
                <CancelIcon className="List-content-item-icons--cancel" onClick={() => {
                  props.onDelete && props.onDelete([item])
                  setItems(items.filter(_item => _item._id !== _id))
                }} style={{ fill: theme.palette.error.dark }} />
              </Icon>
            </div>
            {fields.map((field, index) => <div className="List-content-item-field" key={_id + field + index}>{typeof field === "function" ? field(item) : item[field]}</div>)}
          </div>
        }) : <div style={{ fontSize: "1.25em", fontWeight: "bold", position: "absolute", transform: "translate(-50%,-50%)", top: "50%", left: "50%", textAlign: 'center' }}>No items uploaded</div>}
    </div>
  </div>
}