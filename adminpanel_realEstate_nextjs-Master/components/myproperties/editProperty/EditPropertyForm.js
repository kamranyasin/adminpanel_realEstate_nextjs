import React,{useState} from 'react'
import { Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect } from '../../utils/ReactStarpInputsValidation';
import {useDispatch} from 'react-redux';
import {updateProperties} from '../../../lib/actions/propertyaction'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';



const EditPropertyForm = ({property}) => {

    const dispatch = useDispatch()
    const router = useRouter();
    const [isMediaUploaded, setIsMediaUploaded] = useState(false);
    // const getUploadParams = () => {
    //     return { url: `${process.env.UPLOAD}` }
    // }

    const {slug} =router.query

    const data = property.properties && property.properties.length > 0 ? property.properties[0] : {};
    console.log(data.id);

    const prpertyType = data.property_type
    const propertyStatus = data.property_status
    const pp_price = data.property_price
    const pmaxrooms = data.max_rooms
    const pbeds = data.beds
    const pbaths = data.baths
    const parea = data.area
    const pprice = data.price
    const pagencies = data.agencies
    const pdescription = data.description
    const paddress = data.address
    const zip = data.zipCode
    const pcountry = data.country
    const pcity = data.city
    const plandmark = data.land_mark
    const purl = data.video_url


    return (
        <Formik
            initialValues={{
                property_type: prpertyType || "",
                property_status: propertyStatus || "",
                property_price: pp_price || "",
                max_rooms: pmaxrooms || "",
                beds: pbeds || "",
                baths: pbaths || "",
                area: parea || "",
                price: pprice || "",
                agencies: pagencies || "",
                description: pdescription || "",
                address: paddress || "",
                zipCode: zip || "",
                country: pcountry || "",
                city: pcity || "",
                land_mark: plandmark || "",
                video_url: purl || "",
                additional_features: "",
                media: [],
            }}
            validationSchema={Yup.object().shape({
                property_type: Yup.string().required(),
                property_status: Yup.string().required(),
                property_price: Yup.string().required(),
                max_rooms: Yup.string().required(),
                beds: Yup.string().required(),
                baths: Yup.string().required(),
                area: Yup.string().required(),
                price: Yup.string().required(),
                agencies: Yup.string().required(),
                description: Yup.string().required(),
                address: Yup.string().required(),
                zipCode: Yup.string().min(4).max(6).required(),
                country: Yup.string().required(),
                city: Yup.string().required(),
                land_mark: Yup.string().required(),
            })}
            onSubmit={(values) => {
                const {
                property_type,
                property_status,
                property_price,
                max_rooms,
                beds,
                baths,
                area,
                price,
                agencies,
                description,
                address,
                zipCode,
                country,
                city,
                land_mark,
                video_url,
                additional_features,
                media
               } = values

               const property = {
                property_type,
                property_status,
                property_price,
                max_rooms,
                beds,
                baths,
                area,
                price,
                agencies,
                description,
                address,
                zipCode,
                country,
                city,
                land_mark,
                video_url,
                additional_features,
                media: media.length > 0 ? media : [], 
                }
                console.log(property)
                dispatch(updateProperties(slug, property))
                toast.success("Your data is submitted");
            }}
            >
            {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Row className="gx-3">
                        <Col sm="4" className="form-group">
                            <Field name="property_type" component={ReactstrapSelect} className="form-control" label="Villa"
                                inputprops={{ options: ["Villa", "Appartment", "room", "Cottage", "Family House", "Condominium"] }}
                            />
                        </Col>
                        <Col sm='4' className="form-group">
                            <Field name="property_status" component={ReactstrapSelect} className="form-control" label="Property Status"
                                inputprops={{ options: ["For Rent", "For sale"], defaultOption: "Property Status" }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="property_price" type="number" className="form-control" component={ReactstrapInput} label="Property Price" placeholder="$2800" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="max_rooms" component={ReactstrapSelect} className="form-control" label="Max Rooms"
                                inputprops={{ options: ["1", "2", "3", "4", "5", "6"], defaultOption: "Max Rooms" }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="beds" component={ReactstrapSelect} className="form-control" label="Beds"
                                inputprops={{ options: ["1", "2", "3", "4", "5", "6"], defaultOption: "Beds" }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="baths" component={ReactstrapSelect} className="form-control" label="Baths"
                                inputprops={{ options: ["1", "2", "3", "4", "5", "6"], defaultOption: "Baths" }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="area" type="text" className="form-control" component={ReactstrapInput} label="Area" placeholder="85 Sq Ft" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="price" type="number" className="form-control" component={ReactstrapInput} label="Price" placeholder="$3000" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="agencies" component={ReactstrapSelect} className="form-control" label="Agencies"
                                inputprops={{ options: ["1", "2", "3", "4", "5", "6"], defaultOption: "Agencies" }} />
                        </Col>
                        <Col sm="12" className="form-group">
                            <Field type="textarea" name="description" component={ReactstrapInput} className="form-control" rows={4} label="Description" />
                        </Col>
                    </Row>
                    <div className="form-inputs">
                        <h6>Address</h6>
                        <Row className=" gx-3">
                            <Col sm="6" className="form-group">
                                <Field type="text" name="address" component={ReactstrapInput} className="form-control" label="Address" placeholder="Address of your property" />
                            </Col>
                            <Col sm="6" className="form-group">
                                <Field type="text" name="zipCode" component={ReactstrapInput} className="form-control" label="Zip code" placeholder="39702" />
                            </Col>
                            <Col sm="4" className="form-group">
                                <Field name="country" component={ReactstrapSelect} className="form-control" label="Country"
                                    inputprops={{ options: ["Turkey"], defaultOption: "Select"}}
                                />
                            </Col>
                            <Col sm="4" className="form-group">
                                <Field name="city" type="text" className="form-control" component={ReactstrapInput} label="City" placeholder="Istanbul" />
                            </Col>
                            <Col sm="4" className="form-group">
                                <Field name="land_mark" type="text" component={ReactstrapInput} className="form-control" placeholder="landmark place name" label="Landmark" />
                            </Col>
                        </Row>
                    </div>
                    <div className="dropzone-admin form-inputs">
                        <label>Media</label>
                        {/* <div className="dropzone" id="multiFileUpload">
                            <div className="dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <Dropzone
                                    getUploadParams={getUploadParams}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    inputContent="Drop A File"
                                    accept="image/*,audio/*,video/*"
                                    styles={{
                                        dropzoneActive: { borderColor: "green" },
                                    }}

                                    onChangeStatus={({ meta, file }, status) => {
                                        if (status === 'done') {
                                            setFieldValue('media', [...values.media, file]);
                                            console.log('Media uploaded:', file);
                                            setIsMediaUploaded(true);
                                        }else{
                                            setIsMediaUploaded(false);
                                        }
                                    }}
                                />
                                <h6>Drop files here or click to upload.</h6>
                                <span className="note needsclick">
                                    (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                                </span>
                            </div>
                        </div> */}
                        <Row className="gx-3">
                            <Col sm="12" className="form-group">
                                <Field name="mp4Link" component={ReactstrapInput} type="text" className="form-control" placeholder="mp4 video link" label="Video (mp4)" />
                            </Col>
                            <Col sm="12" className="form-group mb-0">
                                <label>Additional features</label>
                                <div className="additional-checkbox">
                                    <Label htmlFor="chk-ani">
                                        <Field name="additional_features" value="Emergency Exit" className="checkbox_animated" id="chk-ani" type="checkbox" /> Emergency Exit
                                    </Label>
                                    <Label htmlFor="chk-ani1">
                                        <Field name="additional_features" value="CCTV" className="checkbox_animated" id="chk-ani1" type="checkbox" /> CCTV
                                    </Label>
                                    <Label htmlFor="chk-ani2">
                                        <Field name="additional_features" value="Free Wi-Fi" className="checkbox_animated" id="chk-ani2" type="checkbox" /> Free Wi-Fi
                                    </Label>
                                    <Label htmlFor="chk-ani3">
                                        <Field name="additional_features In The Area" value="Free Parking In The Area" className="checkbox_animated" id="chk-ani3" type="checkbox" /> Free Parking In The Area
                                    </Label>
                                    <Label htmlFor="chk-ani4">
                                        <Field name="additional_features" value="Air Conditioning" className="checkbox_animated" id="chk-ani4" type="checkbox" /> Air Conditioning
                                    </Label>
                                    <Label htmlFor="chk-ani5">
                                        <Field name="additional_features" value="Air Conditioning" className="checkbox_animated" id="chk-ani5" type="checkbox" /> Security Guard
                                    </Label>
                                    <Label htmlFor="chk-ani6">
                                        <Field name="additional_features" value="Air Conditioning" className="checkbox_animated" id="chk-ani6" type="checkbox" /> Terrance
                                    </Label>
                                    <Label htmlFor="chk-ani7">
                                        <Field name="additional_features" value="Air Conditioning" className="checkbox_animated" id="chk-ani7" type="checkbox" /> Laundry Service
                                    </Label>
                                    <Label htmlFor="chk-ani8">
                                        <Field name="additional_features" value="Air Conditioning" className="checkbox_animated" id="chk-ani8" type="checkbox" /> Elevator Lift
                                    </Label>
                                    <Label htmlFor="chk-ani9">
                                        <Field name="additional_features" value="Air Conditioning" className="checkbox_animated" id="chk-ani9" type="checkbox" /> Balcony
                                    </Label>
                                </div>
                            </Col>
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

export default EditPropertyForm