import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

export default function CommonTable(props) {
    const { data, customClass, responsiveClass, columns } = props
    return (
        <>
            <div className={responsiveClass + " table-responsive"}>

                <BootstrapTable
                    id="myTable"
                    classes={customClass + " small table-sm"}
                    striped={true}
                    bootstrap4
                    keyField="id"
                    data={data}
                    columns={columns}
                    bordered={true}
                />
            </div>

        </>
    )
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import { visuallyHidden } from '@mui/utils';
// import { Button, ButtonGroup, Grid, Typography } from '@mui/material';

// const rows = [
//     { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//     { id: 2, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
//     { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//     { id: 4, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//     { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
//     { id: 6, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
//     { id: 7, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
//     { id: 8, name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
//     { id: 9, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
//     { id: 10, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
// ];

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: true,
//         label: 'Dessert (100g serving)',
//     },
//     {
//         id: 'calories',
//         numeric: true,
//         disablePadding: false,
//         label: 'Calories',
//     },
//     {
//         id: 'fat',
//         numeric: true,
//         disablePadding: false,
//         label: 'Fat (g)',
//     },
//     {
//         id: 'carbs',
//         numeric: true,
//         disablePadding: false,
//         label: 'Carbs (g)',
//     },
//     {
//         id: 'protein',
//         numeric: true,
//         disablePadding: false,
//         label: 'Protein (g)',
//     },
// ];

// function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//         props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };

//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding="checkbox">
//                     <Checkbox
//                         color="primary"
//                         indeterminate={numSelected > 0 && numSelected < rowCount}
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         inputProps={{
//                             'aria-label': 'select all desserts',
//                         }}
//                     />
//                 </TableCell>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={headCell.numeric ? 'right' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// export default function EnhancedTable() {
//     const [order, setOrder] = React.useState('asc');
//     const [orderBy, setOrderBy] = React.useState('calories');
//     const [selected, setSelected] = React.useState([]);
//     const [page, setPage] = React.useState(1);

//     const rowsPerPage = 5;

//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             const newSelected = rows.map((n) => n.id);
//             setSelected(newSelected);
//             return;
//         }
//         setSelected([]);
//     };

//     const handleClick = (event, id) => {
//         const selectedIndex = selected.indexOf(id);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, id);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1),
//             );
//         }
//         setSelected(newSelected);
//     };

//     const isSelected = (id) => selected.indexOf(id) !== -1;

//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows =
//         page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//     const visibleRows = React.useMemo(
//         () =>
//             stableSort(rows, getComparator(order, orderBy)),
//         [order, orderBy, page, rowsPerPage],
//     );

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Paper sx={{ width: '100%', mb: 2 }}>
//                 <TableContainer>
//                     <Table
//                         sx={{ minWidth: 750 }}
//                         aria-labelledby="tableTitle"
//                         size={'medium'}
//                     >
//                         <EnhancedTableHead
//                             numSelected={selected.length}
//                             order={order}
//                             orderBy={orderBy}
//                             onSelectAllClick={handleSelectAllClick}
//                             onRequestSort={handleRequestSort}
//                             rowCount={rows.length}
//                         />
//                         <TableBody>
//                             {visibleRows.map((row, index) => {
//                                 const isItemSelected = isSelected(row.id);
//                                 const labelId = `enhanced-table-checkbox-${index}`;

//                                 return (
//                                     <TableRow
//                                         hover
//                                         onClick={(event) => handleClick(event, row.id)}
//                                         role="checkbox"
//                                         aria-checked={isItemSelected}
//                                         tabIndex={-1}
//                                         key={row.id}
//                                         selected={isItemSelected}
//                                         sx={{ cursor: 'pointer' }}
//                                     >
//                                         <TableCell padding="checkbox">
//                                             <Checkbox
//                                                 color="primary"
//                                                 checked={isItemSelected}
//                                                 inputProps={{
//                                                     'aria-labelledby': labelId,
//                                                 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell
//                                             component="th"
//                                             id={labelId}
//                                             scope="row"
//                                             padding="none"
//                                         >
//                                             {row.name}
//                                         </TableCell>
//                                         <TableCell align="right">{row.calories}</TableCell>
//                                         <TableCell align="right">{row.fat}</TableCell>
//                                         <TableCell align="right">{row.carbs}</TableCell>
//                                         <TableCell align="right">{row.protein}</TableCell>
//                                     </TableRow>
//                                 );
//                             })}
//                             {emptyRows > 0 && (
//                                 <TableRow
//                                     style={{
//                                         height: 53 * emptyRows,
//                                     }}
//                                 >
//                                     <TableCell colSpan={6} />
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <Grid container>
//                     <Grid item lg={4}>
//                         <Typography>Showing 1 to 10 of 12 results</Typography>
//                     </Grid>
//                     <Grid item lg={8} container justifyContent="flex-end">
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 '& > *': {
//                                     m: 1,
//                                 },
//                             }}
//                         >
//                             <ButtonGroup color="secondary" aria-label="medium secondary button group" spacing={2} fullWidth>
//                                 <Button color="primary" variant="outlined" disabled>Previous</Button>
//                                 <Button color="primary" variant="outlined">1</Button>
//                                 <Button color="primary" variant="outlined">2</Button>
//                                 <Button color="primary" variant="outlined">Next</Button>
//                             </ButtonGroup>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </Box>
//     );
// }