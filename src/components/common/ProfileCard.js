import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { StarIcon, ThreeDotsSvg } from "../svgIcons/commonSvgIcons";

export default function ProfileCard() {
    return (
        <>
            {" "}
            <Card className="border-0 dr_info">
                <CardBody>
                    <div className="d-flex">
                        <div className="d-flex gap-3">
                            <span>
                                <StarIcon />
                            </span>
                            <div>
                                <p className="text-dark mb-0">Nancy Martino</p>
                                <p className="mb-0 text-muted ">Team Leader & HR</p>
                                <p className="mb-0 text-muted ">nancy2244@gmail.com</p>
                            </div>
                        </div>
                        <span>
                            <ThreeDotsSvg />
                        </span>
                    </div>
                    <Button color="primary" className="bg-primary border-0 mt-4">
                        View Profile
                    </Button>
                </CardBody>
            </Card>
        </>
    );
}
