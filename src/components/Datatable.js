import React from 'react'
import MUIDataTable from "mui-datatables";

const Datatable = ({ data, columns, title, options }) => {
    return (
        <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options}
            className=""
        />
    )
}

export default Datatable;