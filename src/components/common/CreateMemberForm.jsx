import React from 'react'
import { Button, Col, Row } from "reactstrap";
import { InputWithLabel } from "../../components/InputWithLabel";

const CreateMember = () => {
    return (
        <>
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
            </Row>
            <Row>
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
            </Row>{" "}
            <Row>
                <Col md={6}>
                    <InputWithLabel
                        heading={"Password"}
                        type="password"
                        placeholder="**********************"
                    // onChange={handleSkuChange}
                    // value={sku_code}
                    />
                </Col>
                <Col md={6}></Col>
            </Row>
            <Button className="gradiant_btn">Submit</Button>
        </>
    )
}

export default CreateMember