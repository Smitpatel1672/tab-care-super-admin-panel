import React from "react";
import { BellIconSvg, SquarIconSvg } from "../svgIcons/commonSvgIcons";
import User from "../../assets/images/User.png"
export default function Header() {
    return (
        <div className="header">
            <div className="search-component">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="header_above">
                <span>
                    <SquarIconSvg />
                </span>
                <span>
                    <BellIconSvg />
                </span>
                <div className="user_login">
                    <img src={User} />
                    <span>
                        <h6 className="mb-0">
                            Anna Adame
                        </h6>
                        <small>
                            Founder
                        </small>
                    </span>
                </div>
            </div>
        </div>
    );
}
