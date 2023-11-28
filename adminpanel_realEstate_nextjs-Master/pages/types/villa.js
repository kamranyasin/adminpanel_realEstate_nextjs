import React,{useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import VillaList from '../../components/types/villa/VillaList'
import {allProperties} from '../../lib/actions/propertyaction'
import { useSelector } from "react-redux";
import store from '../../lib/store/store';


const villa = () => {


    const {properties} = useSelector((state)=>state.properties);

    useEffect(() => {
  
        store.dispatch(allProperties());
    
      }, []);

    const filteredProperties = properties && properties.filter(
        (property) => property.property_type.toLowerCase() === 'villa'
    );



    return (
        <>
            <Breadcrumb title='Villa' titleText='Welcome To Admin Panel' parent='Types' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <div className="property-admin">
                            <div className="property-section section-sm">
                                <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                    <VillaList villa={filteredProperties}/>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default villa
