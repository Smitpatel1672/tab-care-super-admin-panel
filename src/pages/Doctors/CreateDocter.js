import React from "react";
import CommonBreadcramb from "../../components/Layout/CommonBreadcramb";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { InputWithLabel } from "../../components/InputWithLabel";

export default function CreateDocter() {
    return (
        <>            <CommonBreadcramb heading={"Profile"} button={"Edit Profile"} />
            <div className="create_member">
                <Card className="border-0">
                    <CardHeader>
                        Admin profile
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <InputWithLabel
                                    heading={"Name"}
                                    placeholder="Marok"
                                // onChange={handleSkuChange}
                                // value={sku_code}
                                />
                            </Col>
                            <Col md={6}>
                                <p>&nbsp;</p>
                                <InputWithLabel
                                    // heading={"LastName "}
                                    placeholder="Joseph"
                                // onChange={handleSkuChange}
                                // value={sku_code}
                                />
                            </Col>
                        </Row>   <Row>
                            <Col md={6}>
                                <InputWithLabel
                                    heading={"Aadhar Number"}
                                    placeholder="98365482554"
                                // onChange={handleSkuChange}
                                // value={sku_code}
                                />
                            </Col>
                            <Col md={6}>

                                <InputWithLabel
                                    heading={"Email "}
                                    placeholder="Joseph23756@tabscare.com "
                                // onChange={handleSkuChange}
                                // value={sku_code}
                                />
                            </Col>
                        </Row>   <Row>
                            <Col md={6}>
                                <InputWithLabel
                                    heading={"Password"}
                                    type="password"
                                    placeholder="**********************"
                                // onChange={handleSkuChange}
                                // value={sku_code}
                                />
                            </Col>
                            <Col md={6}>
                            </Col>
                        </Row>
                        <Button className="gradiant_btn">
                            Submit
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
