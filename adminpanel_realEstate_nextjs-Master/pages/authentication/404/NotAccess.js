import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const NotAccess = () => {
    return (
        <>
            <div className="page-not-found">
                <Container fluid={true}>
                    <Row>
                        <Col lg='6' md='8' sm='10'>
                            <div className="not-found-img">
                                <img src="/assets/images/svg/3.svg" className="img-fluid" alt='' />
                                <div className="animation-error">
                                    <img src="/assets/images/svg/error.svg" className="img-fluid" alt='' />
                                </div>
                            </div>
                        </Col>
                        <Col lg='6' md='8' sm='10'>
                            <div className="not-found-content">
                                <h2>Sorry...You dont have to access.</h2>
                                <p className="font-roboto light-font">.</p>
                                <div className="btns">
                                    <Link href="/dashboard" className="btn btn-pill btn-gradient">
                                        go to home page
                                    </Link>
                                    <Link href="/dashboard" className="btn btn-pill btn-dashed ms-2">
                                        Report problem
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default NotAccess

NotAccess.getLayout = function getLayout(NotAccess) {
    return (
        <>
            {NotAccess}
        </>
    )
}