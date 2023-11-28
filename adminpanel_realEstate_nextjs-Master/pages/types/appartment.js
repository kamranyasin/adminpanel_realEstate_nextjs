import React,{useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import AppartmentList from '../../components/types/appartmentlist/AppartmentList'
import {allProperties} from '../../lib/actions/propertyaction'
import { useSelector } from "react-redux";
import store from '../../lib/store/store';
import Loader from '../../layout/Loader'

const Appartment = () => {


    const {properties, loading} = useSelector((state)=>state.properties);

    useEffect(() => {
  
        store.dispatch(allProperties());
    
      },[]);

    const filteredProperties = properties && properties.filter(
        (property) => property.property_type.toLowerCase() === 'appartment'
    );

    return (
        <>
            <Breadcrumb title='Appartment' titleText='Welcome To Admin Panel' parent='Types' />
            {loading ? <Loader/> :(
                <Container fluid={true}>
                    <Row>
                        <Col lg='12'>
                            <div className="property-admin">
                                <div className="property-section section-sm">
                                    <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                        <AppartmentList appartment={filteredProperties}/>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default Appartment