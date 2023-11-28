import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Button, Col, Label, Row } from "reactstrap";
import * as Yup from "yup";
import {
  ReactstrapInput,
  ReactstrapSelect,
} from "../../utils/ReactStarpInputsValidation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone-uploader";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import debounce from "lodash/debounce";
import { createProject } from "../../../lib/actions/projectaction";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false, // Ensure Quill is only loaded on the client-side
});

const AddProjectForm = () => {
    
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMediaUploaded, setIsMediaUploaded] = useState(false);
  const [descriptions, setDescription] = useState("");

  const getUploadParams = () => {
    return { url: `${process.env.UPLOAD}` };
  };

  const debouncedOnChange = debounce((value) => {
    console.log(value);
  }, 3000);

  useEffect(() => {
    import("quill").then(() => {});
  }, []);

  const [inputFields, setInputFields] = useState([
    {
      area: "",
      beds: "",
      baths: "",
      price: "",
      available: "",
      image: "",
    },
  ]);

  const [blueprintImage, setblueprintImage] = useState("");
  const addInputField = () => {
    if (inputFields.length < 3) {
      setInputFields([
        ...inputFields,
        {
          area: "",
          beds: "",
          baths: "",
          price: "",
          available: "",
          image: "",
        },
      ]);
    }
  };

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const [bimages, setBimages] = useState([]);
  const handleChange = (index, evnt) => {
    const { name, value, files } = evnt.target;
    const list = [...inputFields];
    console.log(files);

    if (name == "image" && files.length > 0) {
      console.log(files);
      if (bimages.length < 1) {
        setBimages(evnt.target.files);
      } else {
        setBimages((prev) => [...prev, ...evnt.target.files]);
      }
      //   list[index][name] = evnt.target.files[0];
      console.log(bimages);
    } else {
      list[index][name] = value;
    }
    setInputFields(list);
  };

  const [listingInputFields, setListingInputFields] = useState([
    {
      area: "",
      beds: "",
      baths: "",
      price: "",
      apartment: "",
    },
  ]);

  const addListingInputField = () => {
    if (listingInputFields.length < 5) {
      setListingInputFields([
        ...listingInputFields,
        {
          area: "",
          beds: "",
          baths: "",
          price: "",
          apartment: "",
        },
      ]);
    }
  };


  const removeListingInputFields = (index) => {
    const rows = [...listingInputFields];
    rows.splice(index, 1);
    setListingInputFields(rows);
  };

  const handleListingChange = (index, evnt) => {
    const { name, value, files } = evnt.target;
    const list = [...listingInputFields];
    console.log(files);

    list[index][name] = value;
    setListingInputFields(list);
  };

  console.log(inputFields);
  console.log(bimages);

  return (
    <Formik
      initialValues={{
        title: "",
        tags: "",
        project_type: "",
        country: "",
        city: "",
        location_area: "",
        life_style: "",
        map_pin: "",
        starting_price: "",
        images: [],
        yt_video: "",
        developer_name: "",
        first_installment: "",
        construction_status: "",
        handover_status: "",
        blue_prints: [],
        features: "",
        description: "",
        listing: "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required(),
        project_type: Yup.string().required(),
        country: Yup.string().required(),
        city: Yup.string().required(),
        location_area: Yup.string().required(),
        life_style: Yup.string().required(),
        map_pin: Yup.string().required(),
        starting_price: Yup.number().required(),
        yt_video: Yup.string().required(),
        developer_name: Yup.string().required(),
        first_installment: Yup.number().min(1).max(100).required(),
        construction_status: Yup.number().min(1).max(100).required(),
        handover_status: Yup.number().min(1).max(100).required(),
      })}
      onSubmit={(values) => {
        const {
          title,
          tags,
          project_type,
          country,
          city,
          location_area,
          life_style,
          map_pin,
          starting_price,
          images,
          yt_video,
          developer_name,
          first_installment,
          construction_status,
          handover_status,
          blue_prints,
          features,
          listing,
        } = values;

        const project = {
          title,
          tags,
          project_type,
          country,
          city,
          location_area,
          life_style,
          map_pin,
          starting_price,
          images: images.length > 0 ? images : [],
          yt_video,
          developer_name,
          first_installment,
          construction_status,
          handover_status,
          blue_prints: Array.from(inputFields),
          blue_print_images: Array.from(bimages),
          features,
          description: [descriptions],
          listing: listingInputFields,
        };

        console.log(project);
        dispatch(createProject(project));
        toast.success("Your data is submitted");
        // router.reload()
        // router.push('/myprojects/projectlist')
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="gx-3">
            <Col sm="4" className="form-group">
              <Field
                name="title"
                type="text"
                className="form-control"
                component={ReactstrapInput}
                label="Title"
                placeholder="Latest homes & beyonds project"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="project_type"
                component={ReactstrapSelect}
                className="form-control"
                label="Project Type"
                inputprops={{
                  options: [
                    "Villa",
                    "Appartment",
                    "room",
                    "Cottage",
                    "Family House",
                    "Condominium",
                  ],
                }}
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="starting_price"
                type="number"
                className="form-control"
                component={ReactstrapInput}
                label="Starting From"
                placeholder="$2800"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="location_area"
                type="text"
                className="form-control"
                component={ReactstrapInput}
                label="Area"
                placeholder="Park Avenue"
              />
            </Col>
            <Col sm="4" className="form-group">
              <Field
                name="life_style"
                type="text"
                className="form-control"
                component={ReactstrapInput}
                label="Life Style"
                placeholder="Luxury"
              />
            </Col>

            <div className="form-inputs">
              <h6>Description</h6>
              <div className="quill-editor">
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
          </Row>

          <div className="form-inputs">
            <h6>Address</h6>
            <Row className=" gx-3">
              <Col sm="4" className="form-group">
                <Field
                  name="map_pin"
                  type="text"
                  className="form-control"
                  component={ReactstrapInput}
                  label="Location"
                  placeholder="Enter Google Location"
                />
              </Col>

              <Col sm="4" className="form-group">
                <Field
                  name="country"
                  component={ReactstrapSelect}
                  className="form-control"
                  label="Country"
                  inputprops={{ options: ["Turkey"], defaultOption: "Select" }}
                />
              </Col>
              <Col sm="4" className="form-group">
                <Field
                  name="city"
                  type="text"
                  className="form-control"
                  component={ReactstrapInput}
                  label="City"
                  placeholder="Istanbul"
                />
              </Col>
              <Col sm="4" className="form-group">
                <Field
                  name="developer_name"
                  type="text"
                  component={ReactstrapInput}
                  className="form-control"
                  placeholder="Jhon Deo"
                  label="Developer name"
                />
              </Col>
            </Row>
          </div>

          <div className="form-inputs">
            <h6>Status</h6>
            <Row className=" gx-3">
              <Col sm="4" className="form-group">
                <Field
                  name="construction_status"
                  type="number"
                  className="form-control"
                  component={ReactstrapInput}
                  label="Construction Status"
                  placeholder="40% Done"
                />
              </Col>

              <Col sm="4" className="form-group">
                <Field
                  name="handover_status"
                  type="number"
                  className="form-control"
                  component={ReactstrapInput}
                  label="Handed Over"
                  placeholder="50% Done"
                />
              </Col>
              <Col sm="4" className="form-group">
                <Field
                  name="first_installment"
                  type="number"
                  component={ReactstrapInput}
                  className="form-control"
                  placeholder="10%"
                  label="Installments From"
                />
              </Col>
            </Row>
          </div>

          <div className="dropzone-admin form-inputs">
            <h6>Images</h6>
            <div className="dropzone" id="multiFileUpload">
              <div className="dz-message needsclick">
                <i className="fas fa-cloud-upload-alt" />
                <Dropzone
                  getUploadParams={getUploadParams}
                  maxFiles={10}
                  multiple={true}
                  canCancel={false}
                  inputContent="Drop A File"
                  accept="image/*"
                  styles={{
                    dropzoneActive: { borderColor: "green" },
                  }}
                  onChangeStatus={({ meta, file }, status) => {
                    if (status === "done") {
                      setFieldValue("images", [...values.images, file]);
                      console.log("Images uploaded:", file);
                      setIsMediaUploaded(true);
                    } else {
                      setIsMediaUploaded(false);
                    }
                  }}
                />
                <span>
                  {!isMediaUploaded
                    ? "Please wait during upload"
                    : "Lets proceed"}
                </span>
              </div>
            </div>
            <Row className="gx-3">
              <Col sm="12" className="form-group">
                <Field
                  name="yt_video"
                  component={ReactstrapInput}
                  type="text"
                  className="form-control"
                  placeholder="Youtube video link"
                  label="Video URL"
                />
              </Col>
              <Col sm="12" className="form-group mb-0">
                <label>Tags (only 3)</label>
                <div className="additional-checkbox">
                  <Label htmlFor="chk-ani">
                    <Field
                      name="tags"
                      value="Brand New"
                      className="checkbox_animated"
                      id="chk-ani"
                      type="checkbox"
                    />{" "}
                    Brand New
                  </Label>
                  <Label htmlFor="chk-ani1">
                    <Field
                      name="tags"
                      value="Opportunity"
                      className="checkbox_animated"
                      id="chk-ani1"
                      type="checkbox"
                    />{" "}
                    Opportunity
                  </Label>
                  <Label htmlFor="chk-ani2">
                    <Field
                      name="tags"
                      value="Installments"
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />{" "}
                    Installments
                  </Label>
                  <Label htmlFor="chk-ani3">
                    <Field
                      name="tags"
                      value="Used"
                      className="checkbox_animated"
                      id="chk-ani3"
                      type="checkbox"
                    />{" "}
                    Used
                  </Label>
                </div>
              </Col>
            </Row>
            <Row className="gx-3 additional_features">
              <Col sm="12" className="form-group mb-0 mt-10">
                <label>Additional Features</label>
                <div className="additional-checkbox">
                  <Label htmlFor="chk-ani">
                    <Field
                      name="features"
                      value="Emergency Exit"
                      className="checkbox_animated"
                      id="chk-ani4"
                      type="checkbox"
                    />{" "}
                    Emergency Exit
                  </Label>
                  <Label htmlFor="chk-ani1">
                    <Field
                      name="features"
                      value="Trukish Bath"
                      className="checkbox_animated"
                      id="chk-ani5"
                      type="checkbox"
                    />{" "}
                    Trukish Bath
                  </Label>
                  <Label htmlFor="chk-ani2">
                    <Field
                      name="features"
                      value="Otopark"
                      className="checkbox_animated"
                      id="chk-ani6"
                      type="checkbox"
                    />{" "}
                    Otopark
                  </Label>
                  <Label htmlFor="chk-ani3">
                    <Field
                      name="features"
                      value="Sauna"
                      className="checkbox_animated"
                      id="chk-ani7"
                      type="checkbox"
                    />{" "}
                    Sauna
                  </Label>
                  <Label htmlFor="chk-ani4">
                    <Field
                      name="features"
                      value="Swimming pool"
                      className="checkbox_animated"
                      id="chk-ani8"
                      type="checkbox"
                    />{" "}
                    Swimming pool
                  </Label>
                  <Label htmlFor="chk-ani5">
                    <Field
                      name="features"
                      value="Playground"
                      className="checkbox_animated"
                      id="chk-ani9"
                      type="checkbox"
                    />{" "}
                    Playground
                  </Label>
                  <Label htmlFor="chk-ani6">
                    <Field
                      name="features"
                      value="24/7 Security"
                      className="checkbox_animated"
                      id="chk-ani10"
                      type="checkbox"
                    />{" "}
                    24/7 Security
                  </Label>
                  <Label htmlFor="chk-ani7">
                    <Field
                      name="features"
                      value="Close to Airport"
                      className="checkbox_animated"
                      id="chk-ani11"
                      type="checkbox"
                    />{" "}
                    Close to Airport
                  </Label>
                  <Label htmlFor="chk-ani8">
                    <Field
                      name="features"
                      value="Close to Hospital"
                      className="checkbox_animated"
                      id="chk-ani12"
                      type="checkbox"
                    />{" "}
                    Close to Hospital
                  </Label>
                  <Label htmlFor="chk-ani9">
                    <Field
                      name="features"
                      value="Gym"
                      className="checkbox_animated"
                      id="chk-ani13"
                      type="checkbox"
                    />{" "}
                    Gym
                  </Label>
                </div>
              </Col>
              <Label className=" m-t-30">Blue Prints</Label>
              <div className="container ">
                <div className="row">
                  <div className="col-sm-12">
                    {inputFields.map((data, index) => {
                      const { area, beds, baths, price, available, image } =
                        data;
                      return (
                        <div className="row my-3" key={index}>
                          <div className="col">
                            <div className="form-group">
                              <Field
                                type="text"
                                onChange={(evnt) => handleChange(index, evnt)}
                                value={area}
                                name="area"
                                className="form-control"
                                placeholder="Area"
                              />
                            </div>
                          </div>

                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) => handleChange(index, evnt)}
                              value={beds}
                              name="beds"
                              className="form-control"
                              placeholder="Beds"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) => handleChange(index, evnt)}
                              value={baths}
                              name="baths"
                              className="form-control"
                              placeholder="baths"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) => handleChange(index, evnt)}
                              value={price}
                              name="price"
                              className="form-control"
                              placeholder="price"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) => handleChange(index, evnt)}
                              value={available}
                              name="available"
                              className="form-control"
                              placeholder="available"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="file"
                              onChange={(evnt) => handleChange(index, evnt)}
                              //   onChange={(evnt) => setblueprintImage(evnt.target.files)}
                              //   value={image}
                              name="image"
                              className="form-control"
                              placeholder="image"
                            />
                          </div>
                          <div className="col">
                            {inputFields.length !== 1 ? (
                              <div
                                className="btn btn-outline-danger"
                                onClick={removeInputFields}
                              >
                                Remove
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="row">
                      <div className="col-sm-12">
                        <div
                          className="btn btn-outline-success "
                          onClick={addInputField}
                        >
                          Add New
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4"></div>
              </div>
              <Label className=" m-t-30">Listing</Label>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    {listingInputFields.map((data, index) => {
                      const { area, beds, baths, price, apartment } = data;
                      return (
                        <div className="row my-3" key={index}>
                          <div className="col">
                            <div className="form-group">
                              <Field
                                type="text"
                                onChange={(evnt) =>
                                  handleListingChange(index, evnt)
                                }
                                value={area}
                                name="area"
                                className="form-control"
                                placeholder="Area"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) =>
                                handleListingChange(index, evnt)
                              }
                              value={apartment}
                              name="apartment"
                              className="form-control"
                              placeholder="Apartment no"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) =>
                                handleListingChange(index, evnt)
                              }
                              value={beds}
                              name="beds"
                              className="form-control"
                              placeholder="Beds"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) =>
                                handleListingChange(index, evnt)
                              }
                              value={baths}
                              name="baths"
                              className="form-control"
                              placeholder="baths"
                            />
                          </div>
                          <div className="col">
                            <Field
                              type="text"
                              onChange={(evnt) =>
                                handleListingChange(index, evnt)
                              }
                              value={price}
                              name="price"
                              className="form-control"
                              placeholder="price"
                            />
                          </div>

                          <div className="col">
                            {listingInputFields.length !== 1 ? (
                              <div
                                className="btn btn-outline-danger"
                                onClick={removeListingInputFields}
                              >
                                Remove
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="row">
                      <div className="col-sm-12">
                        <div
                          className="btn btn-outline-success "
                          onClick={addListingInputField}
                        >
                          Add New
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4"></div>
              </div>
              <Col sm="12" className="form-btn">
                <Button
                  type="submit"
                  className="btn btn-gradient btn-pill"
                  disabled={!isMediaUploaded}
                >
                  Submit
                </Button>
                <Button type="submit" className="btn btn-dashed btn-pill">
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProjectForm;
