import React from "react";
import CommonBreadcramb from "../../components/Layout/CommonBreadcramb";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Input,
    Row,
} from "reactstrap";
import {
    ListShape,
    SearchIcon,
    SquareShape,
    StarIcon,
    ThreeDotsSvg,
} from "../../components/svgIcons/commonSvgIcons";
import CommonDocter from "../../components/common/CommonDocter";
import { useNavigate } from "react-router-dom";
import AddIcon from '../../assets/svg/add_icon.svg'
export default function Doctors() {
    const navigate = useNavigate()
    return (
        <>
            {" "}
            <CommonBreadcramb heading={"Manage Admins"} />
            <Card className="border-0 mb-4 ">
                <CardHeader className="border-0">
                    <Row>
                        <Col sm={5}>
                            <div className="form-group has-search">
                                <i className="form-control-feedback">
                                    <SearchIcon />
                                </i>
                                <Input
                                    type="text"
                                    className="form-control mb-0 "
                                    placeholder="Search for name, tasks, projects or something..."
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex doctors_heqader">
                                <button className="active">
                                    <SquareShape />
                                </button>
                                <button>
                                    <ListShape />
                                </button>
                                <span
                                    className="create-product-button "
                                    onClick={() => navigate("/doctors/create")}
                                >
                                    <img src={AddIcon} alt="" />
                                    <p>Add Memebers</p>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
            </Card>
            <Row>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>
                <Col md={3} className="mb-4">
                    <CommonDocter />
                </Col>

            </Row>
        </>
    );
}
