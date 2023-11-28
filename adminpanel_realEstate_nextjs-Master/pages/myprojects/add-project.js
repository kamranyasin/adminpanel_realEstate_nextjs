import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb';
import AddProjectForm from '../../components/myprojects/addProject/AddProjectForm';

const AddProperty = () => {
    return (
        <>
            <Breadcrumb title='Add Project' titleText='Welcome to admin panel' parent='My Properties' />
            <Container fluid={true} className="container-fluid">
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Add Project details</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <AddProjectForm />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddProperty