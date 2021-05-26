import { TableFooter } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import createDOMPurify from 'dompurify';
import marked from "marked";
import React, { Fragment, useState } from 'react';
import { MdPlayArrow } from "react-icons/md";
import { useThemeSettings } from '../../hooks';
import { ExtendedTheme, TableHeaderProps, TableProps, TableRowsProps } from "../../types";
import Icon from "../Icon";
import "./style.scss";

const DOMPurify = createDOMPurify(window);

const useStyles = makeStyles((theme: ExtendedTheme) => ({
  th: {
    fontWeight: 'bolder',
    fontSize: '1rem',
    userSelect: "none",
    borderBottom: 0,
    textAlign: 'center',
    backgroundColor: theme.color.dark,
    padding: "15px 0px"
  },
  td: {
    fontWeight: 500,
    userSelect: "none",
    borderBottom: 0,
    textAlign: 'center'
  },
  tr: {
    borderBottom: 0
  }
}));

function TableRows(props: TableRowsProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { title, content, headers, index, collapseContents, transformValue } = props;
  const { theme } = useThemeSettings();

  return <Fragment>
    {title && <div className="Table-title">{title}</div>}
    <TableRow className={classes.tr} >
      {collapseContents && <TableCell className={classes.td}>
        <Icon popoverText="Click to show explanation" >
          <KeyboardArrowUpIcon onClick={() => setOpen(!open)} style={{ display: !open ? "initial" : "none", color: theme.color.opposite_dark }} />
        </Icon>
        <Icon popoverText="Click to hide explanation" >
          <KeyboardArrowDownIcon onClick={() => setOpen(!open)} style={{ display: open ? "initial" : "none", color: theme.color.opposite_dark }} />
        </Icon>
      </TableCell>}
      <TableCell className={classes.td}>{index + 1}</TableCell>
      {headers.map((header, index) => <TableCell className={classes.td} key={header + 'row' + index} align="center">{transformValue ? transformValue(header, content) : content[header]?.toString() ?? "N/A"}</TableCell>)}
    </TableRow>
    {collapseContents && <TableRow className={classes.tr}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headers.length} className={classes.td}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {collapseContents.map((collapseContent, collapseContentIndex) => <div key={index + "collapse" + collapseContent + collapseContentIndex}>
            <div className="Table-row-collapseheader">
              {collapseContent}
            </div>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content[collapseContent].toString())) }} className="Table-row-collapsecontent" />
          </div>)}
        </Collapse>
      </TableCell>
    </TableRow>}
  </Fragment>
}

function TableHeaders(props: TableHeaderProps) {
  const [headers_sort_orders, setHeadersSortOrders] = useState(Array(props.headers.length).fill("").map(() => "ASC") as ("ASC" | "DESC")[])
  const classes = useStyles();
  return <TableRow className={classes.tr}>
    {props.collapseContents && <TableCell style={{ cursor: "pointer" }} className={classes.th}></TableCell>}
    <TableCell style={{ cursor: "pointer" }} className={classes.th}>No.</TableCell>
    {props.headers.map((header, index) =>
      <TableCell style={{ cursor: "pointer" }} onClick={() => {
        headers_sort_orders[index] = headers_sort_orders[index] === "ASC" ? "DESC" : "ASC"
        setHeadersSortOrders([...headers_sort_orders])
        props.onHeaderClick && props.onHeaderClick(header, headers_sort_orders[index])
      }} className={classes.th} key={header + "header" + index} align="center">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content"
        }}>
          <MdPlayArrow style={{ transform: `rotateZ(${headers_sort_orders[index] === "ASC" ? 30 : -30}deg)` }} />
          {header.split("_").map(c => c.charAt(0).toUpperCase() + c.substr(1)).join(" ")}
        </div>
      </TableCell>
    )}
  </TableRow>
}

export default React.memo((props: TableProps<Record<string, any>>) => {
  const classes = useStyles();
  const accumulator: Record<string, Array<any>> = {};
  const { theme } = useThemeSettings();
  props.headers.forEach(header => {
    accumulator[header] = [];
    props.contents.forEach(content => accumulator[header].push(content[header]))
  });

  return (
    <TableContainer component={Paper} className={`Table ${props.className || ''}`}>
      <Table stickyHeader>
        <TableHead className="Table-header" style={{ backgroundColor: theme.color.dark }}>
          <TableHeaders headers={props.headers} collapseContents={props.collapseContents} onHeaderClick={props.onHeaderClick} />
        </TableHead>
        <TableBody className="Table-body" style={{ backgroundColor: theme.color.base }}>
          {props.contents.map((content, index) => <TableRows transformValue={props.transformValue} collapseContents={props.collapseContents} key={content._id} content={content} headers={props.headers} index={index} />)}
        </TableBody>
        <TableFooter className="Table-footer" style={{ backgroundColor: theme.color.dark }}>
          <TableRow>
            {props.collapseContents && <TableCell className={classes.th}></TableCell>}
            <TableCell className={classes.th}>{props.contents.length}</TableCell>
            {props.headers.map((header, index) => <TableCell className={classes.th} key={header + "footer" + index} align="center">{props.accumulator(header, accumulator[header])?.toString() ?? "N/A"}</TableCell>)}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}, ((prevProp, currentProp) => prevProp.contents.length === currentProp.contents.length))
