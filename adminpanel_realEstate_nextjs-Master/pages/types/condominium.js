import React, {useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import CondominiumList from '../../components/types/condominiumproperty/CondominiumList'
import {allProperties} from '../../lib/actions/propertyaction'
import { useSelector } from "react-redux";
import store from '../../lib/store/store';



const Condominium = () => {

    
    const {properties} = useSelector((state)=>state.properties);

    useEffect(() => {
  
        store.dispatch(allProperties());
    
      }, []);

    const filteredProperties = properties.filter(
        (property) => property.property_type.toLowerCase() === 'condominium'
    );





    return (
        <>
            <Breadcrumb title='Condominium' titleText='Welcome To Admin Panel' parent='Types' />
            <Container fluid={true}>
                <Row>
                    <Col lg='12'>
                        <div className="property-admin">
                            <div className="property-section section-sm">
                                <Row className="ratio_55 property-grid-2 property-map map-with-back">
                                    <CondominiumList condominium={filteredProperties}/>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Condominium
