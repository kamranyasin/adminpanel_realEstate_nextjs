import React, {useEffect} from 'react'
import { Card, CardBody, CardHeader, Col, Container, Form, Row, Button } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import EditProjectForm from '../../components/myprojects/editProject/EditProjectForm'
// import { singleProperties, deleteProperty } from '../../lib/actions/propertyaction';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditProject = ({project}) => {


    const dispatch = useDispatch();
    const router = useRouter()

    // useEffect(() => {
    //     if (slug) {
    //     console.log('Dispatching SingleAgent action');
    //     dispatch(singleProperties(slug));
    //     }
    // }, [dispatch, slug]);


    // const { property } = useSelector((state) => state.property);
    // const {isDeleted} = useSelector((state)=> state.deleteProduct)
    
    // console.log("property", property);

    // const deletePropertyHandler = (slug) =>{
    //    dispatch(deleteProperty(slug))
    //    toast.success("Property Deleted")
    //    router.push('/myproperties/propertylist')
    // }

    //console.log("property",property.properties[0].area);

    return (
        <>
            <Breadcrumb title='Edit Project' titleText='Welcome to admin panel' parent='My Projects' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <Card className="card">
                            <CardHeader className="card-header pb-0">
                                <h5>Edit Proejct details</h5>
                            </CardHeader>
                            <CardBody className="card-body admin-form">
                                <EditProjectForm project={project}/>
                            </CardBody>
                            <div className="delete_btn">
                                <Button type="submit" className="btn btn-gradient btn-pill" onClick={() => deletePropertyHandler(property.properties && property.properties.length > 0 ? property.properties[0].slug : "")}>Delete</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default EditProject