import React, {useEffect, useMemo, useState} from 'react'
import {usePagination, useSortBy, useTable} from "react-table";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {showLoader} from "../../../../redux/actions/loader.actions";
import {getAllBooksRequest} from "../../../../redux/actions";

const BooksTable = (props: any) => {
    const BOOKS = useSelector((state: any ) => state.booksReducer.books);
    const data = BOOKS;
    const dispatch = useDispatch();
    const ON_INIT: any[] = [];

    useEffect(() => {
        dispatch(showLoader());
        dispatch(getAllBooksRequest());

    }, ON_INIT);


   const columns = useMemo(
       () => [
           {
               Header: 'Title',
               accessor: 'title',
           },
           {
               Header: 'Price',
               accessor: 'price',
           },
           {
               Header: 'Description',
               accessor: 'description',
           },
           {
               Header: 'Actions',
               accessor: 'col4',
           },
       ],
       [],
   )
   const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       page,
       canPreviousPage,
       canNextPage,
       prepareRow,
       pageOptions,
       pageCount,
       gotoPage,
       nextPage,
       previousPage,
       setPageSize,
       state: { pageIndex, pageSize },
   } = useTable({
       columns,
           data
       },
       useSortBy,
       usePagination)
   return (
       <>
       <TableContainer component={Paper}>
           <Table  {...getTableProps()}  aria-label="simple table">
               <TableHead>
               {headerGroups.map(headerGroup => (
                   <TableRow {...headerGroup.getHeaderGroupProps()}>
                       {headerGroup.headers.map(column => (
                           <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                               {column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                           </TableCell>
                       ))}
                   </TableRow>
               ))}
               </TableHead>
               <TableBody {...getTableBodyProps()}>
               {page.map(row => {
                   prepareRow(row)
                   return (
                       <TableRow  {...row.getRowProps()}>
                           {row.cells.map(cell => {
                               return (
                                   <TableCell
                                       {...cell.getCellProps()}
                                       style={{
                                           padding: '10px',
                                       }}
                                   >
                                       {cell.render('Cell')}
                                   </TableCell>
                               )
                           })}

                       </TableRow>
                   )
               })}
               </TableBody>
           </Table>
       </TableContainer>
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
              Page{' '}
                <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
            </span>{' '}
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    </>
   )
}
export default BooksTable;
