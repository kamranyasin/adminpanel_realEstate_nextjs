import { Field, Form, Formik } from 'formik';
import React,{useState} from 'react'
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect } from '../../utils/ReactStarpInputsValidation';
import {useDispatch} from 'react-redux';
import {UpdateAgent} from '../../../lib/actions/useractions'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditUserdataForm = ({agent}) => {

    const dispatch = useDispatch()
    const router = useRouter();
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);

    const {id} = router.query;

    const agentData = agent?.data?.user;

    let DOB = agent?.data?.user.dataOfBirth
    if (DOB) {
        DOB = new Date(DOB).toLocaleDateString('en-US');
    }

    const getUploadParams = () => {
        return { url: `${process.env.UPLOAD}`}
    }

    const initialValues ={
        firstname: agentData?.firstname || "",
        lastname: agentData?.lastname || "",
        gender: agentData?.gender || "",
        email: agentData?.email || "",
        phoneno: agentData?.phoneno || "",
        dataOfBirth: "",
        description: agentData?.description || "",
        address: agentData?.address || "",
        zipCode: agentData?.zipCode || "",
        medias: [],
    }

    return (
        <Formik
            initialValues={initialValues}

            validationSchema={Yup.object().shape({
                firstname: Yup.string().required(),
                lastname: Yup.string().required(),
                gender: Yup.string().required(),
                email: Yup.string().required(),
                phoneno: Yup.string().required(),
                dataOfBirth: Yup.string().required(),
                description: Yup.string().required(),
                address: Yup.string().required(),
                zipCode: Yup.string().min(4).max(6).required(),
            })}
            onSubmit={(values) => {
            const {
                firstname,
                lastname,
                gender,
                email,
                phoneno,
                dataOfBirth,
                description,
                address,
                zipCode,
                medias,
            } = values;

            const agentData = {
                firstname,
                lastname,
                gender,
                email,
                phoneno,
                dataOfBirth,
                description,
                address,
                zipCode,
                medias: medias.length > 0 ? [medias[0]] : [],
            };
                
                dispatch(UpdateAgent(id, agentData))
                toast.success("Agen Profile updated")
                router.push('/agents/all-agents');
                
            }}
            >
    
    
            {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Row className="gx-3">
                        <Col sm="4" className="form-group">
                            <Field name="firstname" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Name" label="First Name"/>
                        </Col>
                        <Col sm='4' className="form-group">
                            <Field name="lastname" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Surname" label="Last Name" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="gender" component={ReactstrapSelect} className="form-control" label="Gender"
                                inputprops={{ options: ["Male", "Female"], defaultOption: "Gender" }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="phoneno" component={ReactstrapInput} type='text' className="form-control" placeholder='Enter Your Mobile Number' label="Phone number" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="dataOfBirth" component={ReactstrapInput} type='date' className="form-control" label="Date of birth" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="email" type="email" component={ReactstrapInput} className="form-control" placeholder="Enter Your Email" label="Email Address" />
                        </Col>
                        <Col sm="12" className="form-group">
                            <Field type="textarea" name="description" component={ReactstrapInput} className="form-control" rows={4} label="Description" />
                        </Col>
                        <Col sm="6" className="form-group">
                            <Field type="text" name="address" component={ReactstrapInput} className="form-control" label="Address" placeholder="Enter Your Address" />
                        </Col>
                        <Col sm="6" className="form-group">
                            <Field type="text" name="zipCode" component={ReactstrapInput} className="form-control" label="Zip code" placeholder="Enter Pin Code" />
                        </Col>
                    </Row>
                    <div className="dropzone-admin mb-0">
                        <label className='label-color form-label'>Media *</label>
                        <div className="dropzone form" id="multiFileUpload">
                            <div className="dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <Dropzone
                                    getUploadParams={getUploadParams}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    inputContent="Drop A File"
                                    accept="image/*"
                                    styles={{
                                        dropzoneActive: { borderColor: "green" },
                                    }}
                                    onChangeStatus={({ meta, file }, status) => {
                                        if (status === 'done') {
                                            setFieldValue('medias', [file]);
                                            console.log('Media uploaded:', file);
                                            setIsMediaUploaded(true);
                                        }else{
                                            setIsMediaUploaded(false);
                                        }
                                    }}
                                    >
                                    <h6>Drop files here or click to upload.</h6>
                                    <span className="note needsclick">
                                        (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                                    </span>
                                </Dropzone>
                            </div>
                        </div>
                        <Col sm='12' className="form-btn">
                            <Button type="submit" className="btn btn-gradient btn-pill">Submit</Button>
                            <Button className="btn btn-dashed btn-pill">Cancel</Button>
                        </Col>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EditUserdataForm