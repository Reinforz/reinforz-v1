import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useThemeSettings } from "../../hooks";
import Icon from "../Icon";
import "./style.scss";

interface Props {
  header: string
  items: string[]
  sorts: [string, 'ASC' | 'DESC'][]
  setSorts: React.Dispatch<React.SetStateAction<[string, 'ASC' | 'DESC'][]>>
  menuItemLabel: (item: string) => string
  maxSort?: number
}

export default function Sort(props: Props) {
  const { theme } = useThemeSettings();
  const { maxSort, items, header, sorts, setSorts, menuItemLabel } = props;

  return <FormGroup className="Sort">
    <InputLabel className="Sort-header">{header}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="Sort-content">
      {sorts.map((sort, index) => {
        const [item, order] = sort;
        return <div key={`${item}.${order}`} className="Sort-content-item" style={{ background: theme.color.base, display: 'flex', padding: 5, margin: 2.5 }}>
          <MuiSelect style={{ background: theme.color.light, flex: 1, marginRight: 5 }} value={item}
            onChange={(e) => {
              sort[0] = e.target.value as any;
              setSorts(JSON.parse(JSON.stringify(sorts)))
            }}>
            {items.map(item =>
              <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
            )}
          </MuiSelect>

          <MuiSelect style={{ background: theme.color.light, flex: 1 }} value={order}
            onChange={(e) => {
              sort[1] = e.target.value as any;
              setSorts(JSON.parse(JSON.stringify(sorts)))
            }}>
            {["ASC", "DESC"].map(item =>
              <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
            )}
          </MuiSelect>
          <div className="Sort-delete">
            <Icon popoverText={`Delete ${item} by ${order} sort`}>
              <MdDelete size={20} fill={red[500]} onClick={() => {
                sorts[index] = null as any;
                setSorts(sorts.filter(sort => sort))
              }} />
            </Icon>
          </div>
        </div>
      })}
    </div>
    {sorts.length !== maxSort && <div className="Sort-add">
      <Icon popoverText="Add Sort">
        <AiFillPlusCircle size={25} fill={green[500]} onClick={() => setSorts([...sorts, [items[0], 'ASC']])} />
      </Icon>
    </div>}
  </FormGroup>
}