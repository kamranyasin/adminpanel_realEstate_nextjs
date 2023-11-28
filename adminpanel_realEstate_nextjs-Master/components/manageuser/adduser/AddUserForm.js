import { Field, Form, Formik} from 'formik';
import React,{useState} from 'react'
import * as Yup from 'yup';
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Row } from 'reactstrap';
import { ReactstrapInput, ReactstrapSelect } from '../../utils/ReactStarpInputsValidation';
import {useDispatch} from 'react-redux';
import {addAgent} from '../../../lib/actions/useractions'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AddUserForm = () => {

    const router = useRouter()
    const dispatch = useDispatch();
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const getUploadParams = () => {
        return { url: `${process.env.UPLOAD}`, fieldname: 'medias'}
    }


    const handleSubmit = async (values, { setSubmitting }) => {
        setIsSubmitting(true);
    
        try {
          const {
            firstname,
            lastname,
            gender,
            email,
            phoneno,
            dataOfBirth,
            password,
            confirmpw,
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
            password,
            confirmpw,
            description,
            address,
            zipCode,
            medias: medias.length > 0 ? [medias[0]] : [],
          };
          
          console.log(agentData);
          dispatch(addAgent(agentData));
          toast.success('Agent is Created');
          router.reload();
          router.push('/dashboard');
        } catch (error) {
            toast.error('Dublicate Email or Phoneno')
            console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      };
    

    
return(
    <Formik
        initialValues={{
            firstname: '',
            lastname: '',
            gender: '',
            email: '',
            phoneno: '',
            dataOfBirth: '',
            password: '',
            confirmpw: '',
            description: '',
            address: '',
            zipCode: '',
            medias: [],
        }}
        validationSchema={Yup.object().shape({
            firstname: Yup.string().required(),
            lastname: Yup.string().required(),
            gender: Yup.string().required(),
            email: Yup.string().required(),
            phoneno: Yup.string().min(9).max(14).required(),
            dataOfBirth: Yup.string().required(),
            password: Yup.string().required(),
            confirmpw: Yup.string().required(),
            description: Yup.string().required(),
            address: Yup.string().required(),
            zipCode: Yup.string().min(4).max(6).required(),
        })} 
        onSubmit={handleSubmit}
        >
    
    
    {({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} area-autoComplete='off'>
            <Row className="gx-3">
                <Col sm="4" className="form-group">
                    <Field name="firstname" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Name" label="First Name" />
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
                    <Field name="phoneno" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Phone no" label="Phone no" autoComplete="off"/>
                </Col>
                <Col sm="4" className="form-group">
                    <Field name="dataOfBirth" component={ReactstrapInput} type='date' className="form-control" label="Date of birth" />
                </Col>
                <Col sm="4" className="form-group">
                    <Field name="email" type="email" component={ReactstrapInput} className="form-control" placeholder="Enter Your Email" label="Email Address" />
                </Col>
                <Col sm="6" className="form-group">
                    <Field name="password" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Password" label="Password" />
                </Col>
                <Col sm="6" className="form-group">
                    <Field name="confirmpw" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Password" label="Confirm Password" />
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
                <h6>Media *</h6>
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
                        <span>{!isMediaUploaded ? 'Please wait during upload' : 'Lets proceed'}</span>
                    </div>
                </div>
                <Col sm='12' className="form-btn">
                    <Button type="submit" className="btn btn-gradient btn-pill" disabled={!isMediaUploaded}>Submit</Button>
                    <Button className="btn btn-dashed btn-pill">Cancel</Button>
                </Col>
            </div>
        </Form>
    )}
    </Formik>
    )
}

export default AddUserForm