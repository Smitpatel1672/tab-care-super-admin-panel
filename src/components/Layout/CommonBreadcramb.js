import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

export default function CommonBreadcramb({ heading }) {
    return (
        <>
            <Breadcrumb className="breadcrumb_main">
                <BreadcrumbItem active>
                    <h5 className="text-dark mb-0">{heading} </h5>
                </BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}
