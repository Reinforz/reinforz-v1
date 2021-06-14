import { Checkbox, Typography } from "@material-ui/core";
import React from "react";
import { MdDelete } from 'react-icons/md';
import { Hovertips } from "../";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { applyCheckboxShortcut } from "../../utils";
import "./style.scss";

export interface ListProps<T extends { _id: string } & Record<string, any>> {
  header: string
  setItems: (data: T[]) => void
  setSelectedItems: (data: string[]) => void
  fields: (keyof T | ((data: T) => string | JSX.Element))[]
  onDelete?: (items: T[], deletedItems: string[]) => void
  items: T[]
  selectedItems: string[]
  emptyListMessage?: string
  className?: string
}

export default function List<T extends { _id: string }>(props: ListProps<T>) {
  const { items, selectedItems, setItems, setSelectedItems, header, fields, emptyListMessage = 'No items', className = '' } = props;
  const { theme, settings } = useThemeSettings();
  const isAllSelected = items.length !== 0 && selectedItems.length === items.length;
  return <div className={`List ${className}`} style={{ backgroundColor: theme.color.base }}>
    <div className="List-header" style={{ backgroundColor: theme.color.dark, color: theme.palette.text.primary }}>
      <Hovertips popoverText={`${isAllSelected ? "Deselect" : "Select"} all items`}>
        <Checkbox color="primary" key={"checkbox"} onClick={(e) => {
          if ((e.target as any).checked) {
            settings.sound && sounds.pop_off.play();
            setSelectedItems(items.map(item => item._id))
          }
          else {
            settings.sound && sounds.pop_on.play();
            setSelectedItems([])
          }
        }} checked={isAllSelected} />
      </Hovertips>
      <Typography>
        {selectedItems.length}/{items.length}
      </Typography>
      <div className="List-header-title">
        <Typography variant="h5">
          {header}
        </Typography>
      </div>
      <div className="List-header-icons">
        <Hovertips popoverText={`Remove ${selectedItems.length} selected items`} key={"delete icon"} >
          <MdDelete size={20} className={"List-header-icons-cancel"} onClick={() => {
            settings.sound && sounds.remove.play();
            const remainingItems = items.filter(item => !selectedItems.includes(item._id))
            setItems(remainingItems)
            props.onDelete && props.onDelete(remainingItems, selectedItems)
            setSelectedItems([])
          }} />
        </Hovertips>
      </div>
    </div>
    <div className="List-content" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.dark }}>
      {items.length > 0 ?
        items.map((item, index) => {
          const { _id } = item
          return <div className="List-content-item" key={_id} style={{ backgroundColor: theme.color.light }}>
            <div className="List-content-item-icons">
              <Checkbox color="primary" className="List-content-item-icons-checkbox" key={_id + "checkbox" + index} onClick={(e: any) => {
                e.persist();
                settings.sound && e.target.checked ? sounds.pop_off.play() : sounds.pop_on.play();
                setSelectedItems(applyCheckboxShortcut(e, items.map(item => item._id), selectedItems, index));
              }} checked={selectedItems.includes(_id)} value={_id} />
              <Hovertips key={_id + "icon" + index} popoverText="Delete this item">
                <MdDelete size={20} className="List-content-item-icons-cancel" onClick={() => {
                  settings.sound && sounds.remove.play();
                  const remainingItems = items.filter(_item => _item._id !== _id);
                  props.onDelete && props.onDelete(remainingItems, [item._id])
                  setItems(remainingItems)
                  setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== _id))
                }} style={{ fill: theme.palette.error.dark }} />
              </Hovertips>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
              {fields.map((field, index) => <div className="List-content-item-field" key={_id + field + index}>
                <Typography variant="h6">
                  {typeof field === "function" ? field(item) : item[field]}
                </Typography>
              </div>)}
            </div>
          </div>
        }) : <div className="center">
          <Typography>
            {emptyListMessage}
          </Typography>
        </div>}
    </div>
  </div>
}