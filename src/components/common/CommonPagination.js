import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function CommonPagination() {
    return (
        <>
            <div className="custom_pagination">
                <p>Showing 1 to 10 of 12 results</p>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink href="#">Previous</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="active">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" next>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        </>
    );
}
