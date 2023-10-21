// import { TableContainer } from '@material-ui/core'
import React from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableContainer,
    TableSortLabel,
} from '@material-ui/core';
import { useState } from 'react';
export default function CommonTable({ headings, data }) {
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>   <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {headings.map((item) => (
                            <TableCell key={item}>
                                <TableSortLabel
                                    active={orderBy === item}
                                    direction={orderBy === item ? order : 'asc'}
                                    onClick={() => handleSort(item)}
                                >
                                    {item}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product.product}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.mrp}</TableCell>
                            <TableCell>{product.orders}</TableCell>
                            <TableCell>{product.sale}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
