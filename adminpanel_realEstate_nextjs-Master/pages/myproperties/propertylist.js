import React, {useEffect} from 'react'
import { Col, Container, Input, Label, Row } from 'reactstrap'
import Breadcrumb from '../../components/Common/Breadcrumb'
import Listview from '../../components/myproperties/PropertyList/Listview'
import store from '../../lib/store/store';
import {allProperties} from '../../lib/actions/propertyaction'
import { useSelector } from "react-redux";
import Loader from '../../layout/Loader'


const Propertylist = () => {

  const {properties, loading} = useSelector((state)=>state.properties);


    useEffect(() => {
  
      store.dispatch(allProperties());
  
    }, []);


    const propertyCount = properties?.length;

  return (
    <>
      <Breadcrumb title='Property list' titleText='Welcome to admin panel' parent='My properties' />
      {loading ? <Loader/> : (
        <Container fluid={true}>
          <Row>
            <Col lg='12'>
              <div className='property-admin'>
                <div className="property-section section-sm">
                  <Row className='ratio_55 property-grid-2 property-map map-with-back'>
                    <Col className='col-12'>
                      <div className="filter-panel">
                        <div className="listing-option">
                          <h5 className="mb-0">Showing <span>{propertyCount}</span> Listings</h5>
                          <div>
                            {/* <div className="d-flex">
                              <span className="m-r-10">Map view</span>
                              <Label className="switch">
                                <Input type="checkbox" className="option-list" name="step_1" defaultValue="ani1" defaultChecked /><span className="switch-state" />
                              </Label>
                              <span className="m-l-10">List view</span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Listview properties={properties}/>
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

export default Propertylist