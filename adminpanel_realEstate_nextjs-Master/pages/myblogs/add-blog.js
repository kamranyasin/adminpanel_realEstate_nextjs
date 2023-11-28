import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb';
import AddBlogForm from '../../components/myblogs/addBlog/AddBlogForm';

const AddBlog = () => {
    return (
        <>
            <Breadcrumb title='Add Blog' titleText='Welcome to admin panel' parent='My Properties' />
            <Container fluid={true} className="container-fluid">
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Add Blog details</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <AddBlogForm />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddBlog