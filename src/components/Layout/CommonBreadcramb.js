import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

export default function CommonBreadcramb({ heading, button }) {
    return (
        <>
            <Breadcrumb className="breadcrumb_main">
                <BreadcrumbItem active>
                    <h5 className="text-dark mb-0">{heading} </h5>
                    {button && <button className="create-product-button border-5 text-white   m-0">
                        {button}
                    </button>}
                </BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}
