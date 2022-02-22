import { Box, Checkbox, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { MdDelete } from 'react-icons/md';
import { Container, Content, Flex, Header, Hovertips } from "../";
import { useThemeSettings } from "../../hooks";
import useSounds from "../../hooks/useSounds";
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
  const { remove, pop_off, pop_on } = useSounds();
  const isAllSelected = items.length !== 0 && selectedItems.length === items.length;
  return <Container className={`List select-none flex-col-1 ${className}`}>
    <Header header={header} sideElements={[
      <Flex>
        <Hovertips popoverText={`${isAllSelected ? "Deselect" : "Select"} all items`}>
          <Checkbox color="primary" key={"checkbox"} onClick={(e) => {
            if ((e.target as any).checked) {
              pop_off();
              setSelectedItems(items.map(item => item._id))
            }
            else {
              pop_on();
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
            remove();
            const remainingItems = items.filter(item => !selectedItems.includes(item._id))
            setItems(remainingItems)
            props.onDelete && props.onDelete(remainingItems, selectedItems)
            setSelectedItems([])
          }} />
        </Hovertips>
      </Flex>
    ]} />

    <Content className={`h-full bg-dark flex-col-1`}>
      {items.length > 0 ?
        items.map((item, index) => {
          const { _id } = item
          return <Box className={`List-content-item flex items-center p-1.5 rounded-sm ${index%2 === 0 ? "bg-light" : "bg-base"}`} key={_id}>
            <Box className="List-content-item-icons p-1 flex items-center">
              <Checkbox color="primary" className="List-content-item-icons-checkbox" key={_id + "checkbox" + index} onClick={(e: any) => {
                e.persist();
                if (settings.sound) {
                  e.target.checked ? pop_off() : pop_on();
                }
                setSelectedItems(applyCheckboxShortcut(e, items.map(item => item._id), selectedItems, index));
              }} checked={selectedItems.includes(_id)} value={_id} />
              <Hovertips key={_id + "icon" + index} popoverText="Delete this item">
                <MdDelete size={20} className="List-content-item-icons-cancel" fill={red[500]} onClick={() => {
                  remove();
                  const remainingItems = items.filter(_item => _item._id !== _id);
                  props.onDelete && props.onDelete(remainingItems, [item._id])
                  setItems(remainingItems)
                  setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== _id))
                }} style={{ fill: theme.palette.error.dark }} />
              </Hovertips>
            </Box>
            <Box className="flex flex-1 justify-between p-1 ">
              {fields.map((field, index) => <Box className="List-content-item-field flex items-center" key={_id + field + index}>
                <Typography variant="body1" component="div" className="text-lg">
                  {typeof field === "function" ? field(item) : item[field]}
                </Typography>
              </Box>)}
            </Box>
          </Box>
        }) : <Box className="center text-center flex items-center justify-center bold p-1">
          <Typography variant="h5">
            {emptyListMessage}
          </Typography>
        </Box>}
    </Content>
  </Container>
}