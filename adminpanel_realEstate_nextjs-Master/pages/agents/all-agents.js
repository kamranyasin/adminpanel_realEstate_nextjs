import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import PropertyBoxFour from '../../components/Common/Propertybox/PropertyBoxOne'
import store from '../../lib/store/store';
import {allAgent} from '../../lib/actions/useractions'
import { useSelector } from "react-redux";
import Loader from '../../layout/Loader'
import {userProperties} from '../../lib/actions/propertyaction'

const AllAgents = () => {



    const {agents, loading} = useSelector((state)=>state.agents);
    const {properties} = useSelector((state)=>state.properties);


    useEffect(() => {
  
      store.dispatch(allAgent());
  
    }, []);



    useEffect(() => {
  
      store.dispatch(userProperties());
  
    }, []);



    return (
        <>
            <Breadcrumb title='All Agents' titleText='welcome to admin panel' parent='Agents' />
            {loading ? <Loader/> : (
                <Container fluid={true}>
                    <Row className="agent-section property-section agent-lists">
                        <Col lg='12'>
                            <div className="ratio2_3">
                                <Row className="property-2 column-sm property-label property-grid">
                                    {
                                        agents && agents.map((item, i) => {
                                            return (
                                                <Col xl='4' sm='6' key={i} className='wow fadeInUp'>
                                                    <PropertyBoxFour data={item} properties={properties} label={true} />
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default AllAgents