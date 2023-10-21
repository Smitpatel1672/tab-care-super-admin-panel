import React from "react";
import CommonBreadcramb from "../../components/Layout/CommonBreadcramb";
import { Card, CardBody, CardHeader } from "reactstrap";
import CreateMemberForm from "../../components/common/CreateMemberForm";

export default function CreatePharmacist() {
    return (
        <>
            <CommonBreadcramb heading={"Profile"} button={"Edit Profile"} />
            <div className="create_member">
                <Card className="border-0">
                    <CardHeader>Admin profile</CardHeader>
                    <CardBody>
                        <CreateMemberForm />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
