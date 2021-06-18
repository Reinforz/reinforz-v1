import { Checkbox, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React from "react";
import { MdDelete } from 'react-icons/md';
import { Container, Content, Flex, Header, Hovertips } from "../";
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
  return <Container className={`List flex fd-c ${className}`}>
    <Header header={header} sideElements={[
      <Flex>
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
      </Flex>,
      <Flex>
        <Hovertips popoverText={`Remove ${selectedItems.length} selected items`} key={"delete icon"} >
          <MdDelete size={20} className={"List-header-icons-cancel"} fill={red[500]} onClick={() => {
            settings.sound && sounds.remove.play();
            const remainingItems = items.filter(item => !selectedItems.includes(item._id))
            setItems(remainingItems)
            props.onDelete && props.onDelete(remainingItems, selectedItems)
            setSelectedItems([])
          }} />
        </Hovertips>
      </Flex>
    ]} />

    <Content className={`${items.length > 0 ? "pb-0" : ""}`}>
      {items.length > 0 ?
        items.map((item, index) => {
          const { _id } = item
          return <div className="List-content-item flex ai-c bg-light p-5 mb-5 pr-0" key={_id}>
            <div className="List-content-item-icons p-5 mr-5 flex ai-c">
              <Checkbox color="primary" className="List-content-item-icons-checkbox" key={_id + "checkbox" + index} onClick={(e: any) => {
                e.persist();
                settings.sound && e.target.checked ? sounds.pop_off.play() : sounds.pop_on.play();
                setSelectedItems(applyCheckboxShortcut(e, items.map(item => item._id), selectedItems, index));
              }} checked={selectedItems.includes(_id)} value={_id} />
              <Hovertips key={_id + "icon" + index} popoverText="Delete this item">
                <MdDelete size={20} className="List-content-item-icons-cancel" fill={red[500]} onClick={() => {
                  settings.sound && sounds.remove.play();
                  const remainingItems = items.filter(_item => _item._id !== _id);
                  props.onDelete && props.onDelete(remainingItems, [item._id])
                  setItems(remainingItems)
                  setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== _id))
                }} style={{ fill: theme.palette.error.dark }} />
              </Hovertips>
            </div>
            <div className="flex flex-1 jc-sb p-5 mr-5">
              {fields.map((field, index) => <div className="List-content-item-field" key={_id + field + index}>
                <Typography variant="body1" className="fs-18">
                  {typeof field === "function" ? field(item) : item[field]}
                </Typography>
              </div>)}
            </div>
          </div>
        }) : <div className="center ta-c flex ai-c jc-c bold p-5">
          <Typography variant="h5">
            {emptyListMessage}
          </Typography>
        </div>}
    </Content>
  </Container>
}