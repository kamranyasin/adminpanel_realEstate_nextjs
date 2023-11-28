import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, login} from '../../lib/actions/useractions'
import * as Yup from 'yup';
import { Lock, Mail } from 'react-feather'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Img from '../../components/Common/Image';
import Cookies from 'js-cookie';


const LogIn = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const {error, isAuthenticated} = useSelector(state=>state.user);


    const [showpassword, setShowpassword] = useState(false);


    useEffect(() => {
       
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            router.push('/dashboard');
        }

          
    }, [error, isAuthenticated, router, dispatch])

   


    const handleLogin = async (values, { resetForm }) => {
        
        try {
          const response = await dispatch(login(values.email, values.password));
          if (response.success) {
            // Store token in cookies
            Cookies.set('token', response.token, { expires: 7, path: '/' });
      
            // Redirect to the dashboard
            router.push('/dashboard');
      
            const token = Cookies.get('token');
            console.log("token", token);
          } else {
            // Display error message
            toast.error(response.message);
          }
        } catch (error) {
          // Handle error
          console.error(error);
          toast.error("An error occurred during login.");
        }
        
        resetForm();
      };
      
    
    return (
        <div className="authentication-box">
            <Container fluid={true} className="container-fluid">
                <Row className="log-in">
                    <Col xxl='3' xl='4' lg='5' md='6' sm='8' className="form-login">
                        <Card className="card">
                            <CardBody className="card-body">

                                <div className="title-3 text-start">
                                    <h2>Log in</h2>
                                </div>

                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: ""
                                    }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().email('Enter a valid Email..!').required('Email is required..!'),
                                        password: Yup.string().required('Password is required..!')
                                    })}
                                    onSubmit={handleLogin}
                                    >

                                    {({handleSubmit, handleChange, values, errors, touched }) => (
                                        <Form onSubmit={handleSubmit}>



                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <Mail size={20} />
                                                    </div>

                                                    <Field type="email" value={values.email} onChange={handleChange} className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} name='email' placeholder="Enter email" />
                                               
                                                </div>
                                                {(errors.email && touched.email) && <div className='text-danger ms-4'>{errors.email}</div>}
                                            </div>



                                            <div className="form-group">
                                                <div className="input-group">

                                                    <div className="input-group-prepend">
                                                        <Lock size={20} />
                                                    </div>

                                                    <Field type={`${showpassword ? 'text' : 'password'}`} value={values.password} onChange={handleChange}  name='password' id="pwd-input" className={`form-control ${(errors.password && touched.password) ? 'is-invalid' : ''}`} placeholder="Password" />
                                                    
                                                    <div className="input-group-apend">
                                                        <i id="pwd-icon" className={`far fa-eye${!showpassword ? '-slash' : ''}`} onClick={() => { setShowpassword(!showpassword) }} />
                                                    </div>
                                                </div>

                                                {(errors.password && touched.password) && <div className='text-danger ms-4'>{errors.password}</div>}
                                                {/* <div className="important-note">
                                                    password should be a minimum of 8 characters and should contains letters and numbers
                                                </div> */}
                                            </div>


                                            <div className="d-flex">
                                                <label className="d-block mb-0" htmlFor="chk-ani">
                                                    <input className="checkbox_animated" id="chk-ani" type="checkbox" /> Remember me
                                                </label>
                                                <Link href='https://sheltos-react.vercel.app/pages/other-pages/forgot-password' className="font-rubik">Forgot password ?</Link>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn btn-gradient btn-pill me-sm-3 me-2">Log in</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                
                                
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xxl='7' xl='7' lg='6' className="offset-xxl-1 auth-img">
                        <Img src={`/assets/images/login.jpg`} alt='' className='bg-img' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LogIn

LogIn.getLayout = function getLayout(LogIn) {
    return (
        <>
            {LogIn}
        </>
    )
}