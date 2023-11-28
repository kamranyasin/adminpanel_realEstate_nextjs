import React,{useState, useEffect} from 'react'
import { Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect } from '../../utils/ReactStarpInputsValidation';
import {useDispatch} from 'react-redux';
import {updateBlog} from '../../../lib/actions/blogaction'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash/debounce';


const QuillEditor = dynamic(() => import('react-quill'), {
    ssr: false // Ensure Quill is only loaded on the client-side
});


const EditBlogForm = ({blog}) => {

    const dispatch = useDispatch()
    const router = useRouter();
    const {slug} =router.query

    const [isMediaUploaded, setIsMediaUploaded] = useState(false);

    const data = blog && blog.project
    const content = data && data.length > 0 ? data[0].content : "";
    const category = data && data.length > 0 ? data[0].category : "";
    const title = data && data.length > 0 ? data[0].title : "";
    const [descriptions, setDescription] = useState(content);

    const getUploadParams = () => {
        return { url: `${process.env.UPLOAD}` }
    }

    const debouncedOnChange = debounce((value) => {
        console.log(value);
      }, 3000); 

    useEffect(() => {
        import('quill').then(() => {
        });
      }, []);
    

    return (
        <Formik
        initialValues={{
            category: category ||"",
            title: title || "",
            content: "",
            image: [],
            images: []
        }}
        validationSchema={Yup.object().shape({
            category: Yup.string().required(),
            title: Yup.string().required(),
        })}
        onSubmit={(values) => {
           const {
            category,
            title,
            content,
            image,
            images
           } = values
        
        const blog = {
            category,
            title,
            content: descriptions,
            image: image.length > 0 ? image : [] ,
            images: images.length > 0 ? images : [] 
        }
            console.log(blog)
            dispatch(updateBlog(slug, blog))
            toast.success("Your data is submitted");
            router.reload()
            router.push('/myblogs/bloglist')
        }}
        >
        {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>

                <div className="dropzone-admin form-inputs">
                    <h6>Image</h6>
                        <div className="dropzone" id="multiFileUpload">
                            <div className="dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />    
                                <Dropzone
                                    getUploadParams={getUploadParams}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={true}
                                    inputContent="Drop A File"
                                    accept="image/*"
                                    styles={{
                                        dropzoneActive: { borderColor: 'green' },
                                    }}
                                    
                                    onChangeStatus={({ meta, file }, status) => {
                                        if (status === 'done') {
                                            setFieldValue('image', [...values.image, file]);
                                            console.log('Media uploaded:', file);
                                            setIsMediaUploaded(true);
                                        }else{
                                            setIsMediaUploaded(false);
                                        }
                                    }}
                                />
                                <span>{!isMediaUploaded ? 'Please wait during upload' : 'Lets proceed'}</span>
                            </div>
                        </div>
                </div>
                

                <Row className="gx-3">
                    <Col sm="4" className="form-group">
                        <Field name="title" type="text" className="form-control" component={ReactstrapInput} label="Title" placeholder="This is a Blog" />
                    </Col>
                    <Col sm="4" className="form-group">
                        <Field name="category" component={ReactstrapSelect} className="form-control" label="Category"
                            inputprops={{ options: ["Villa", "Appartment", "room", "Cottage", "Family House", "Condominium"] }}
                        />
                    </Col>
                </Row>

                <div className="form-inputs">
                    <h6>Description</h6>
                    <div className='quill-editor'>
                    <QuillEditor
                        value={descriptions}
                        onChange={(value) => {
                            setDescription(value);
                            debouncedOnChange(value);
                        }}
                        placeholder="Enter description"
                    />
                    </div>
                </div>

                <div className="dropzone-admin form-inputs">
                    <h6>Image</h6>
                        <div className="dropzone" id="multiFileUpload">
                            <div className="dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />    
                                <Dropzone
                                    getUploadParams={getUploadParams}
                                    maxFiles={2}
                                    multiple={true}
                                    canCancel={true}
                                    inputContent="Drop A File"
                                    accept="image/*"
                                    styles={{
                                        dropzoneActive: { borderColor: 'green' },
                                    }}
                                    
                                    onChangeStatus={({ meta, file }, status) => {
                                        if (status === 'done') {
                                            setFieldValue('images', [...values.images, file]);
                                            console.log('Media uploaded:', file);
                                            setIsMediaUploaded(true);
                                        }else{
                                            setIsMediaUploaded(false);
                                        }
                                    }}
                                />
                                <span>{!isMediaUploaded ? 'Please wait during upload' : 'Lets proceed'}</span>
                            </div>
                        </div>
                </div>

                
                <div className="dropzone-admin form-inputs">
                    
                    <Row className="gx-3">
                        <Col sm='12' className="form-btn">
                            <Button type="submit" className="btn btn-gradient btn-pill">Submit</Button>
                            <Button type="submit" className="btn btn-dashed btn-pill">Cancel</Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        )}
    
    </Formik>
    )
}

export default EditBlogForm