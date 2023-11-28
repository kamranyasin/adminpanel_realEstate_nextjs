import Link from "next/link";
import React, { useState } from "react";
import Img from "../../utils/Img";
import SocialAccounts from "../SocialAccounts";


const ProjectBoxFour = ({ data, label, properties }) => {


    const [show, setShow] = useState();

    const idMatched = properties.find(property => property.userid.toString()) 
    const matchedProperty = idMatched?.userid == data?.userid

    let firstImage = null;
    if (matchedProperty && idMatched.media && idMatched.media.length > 0) {
        firstImage = idMatched.media[0];
        console.log(firstImage?.imageUrl);
    }

    console.log("phoneno", data.phoneno);

    return (
        <>
            <div className="property-box">
                <div className="agent-image">
                    <div>
                        <Img src={firstImage?.imageUrl} className="bg-img" alt="" />
                        {label ? data?.properties && <span className="label label-shadow">{data.properties}</span>
                            : data?.label && <span className="label label-shadow">New User</span>}
                        <div className="agent-overlay"></div>
                        <div className="overlay-content">
                            <SocialAccounts />
                            <span>Connect</span>
                        </div>
                    </div>
                </div>
                <div className="agent-content">
                    <h3>
                        <Link href={`/agents/profile/${data.userid}`}>{data.firstname}{data.lastname}</Link>
                    </h3>
                    <p className="font-roboto">${data.description}</p>
                    <ul className="agent-contact">
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span className="character">+91 {data.phoneno === show ? data.phoneno : data.phoneno.toString().slice(0, 5) + "*****"}</span>
                            <span
                                className="label label-light-danger"
                                onClick={() => {
                                    setShow(data.phoneno);
                                    data.phoneno === show && setShow();
                                }}>
                                {show === data.phoneno ? "show" : "hide"}
                            </span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> {data.email}
                        </li>
                        <li>
                            <i className="fas fa-fax"></i> {data.zipCode}
                        </li>
                    </ul>
                    <Link href={`/agents/profile/${data.userid}`}>
                        View profile <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProjectBoxFour;

