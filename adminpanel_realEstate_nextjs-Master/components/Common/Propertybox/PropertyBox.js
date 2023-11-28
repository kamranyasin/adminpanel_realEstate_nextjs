
import Link from "next/link";
import React from "react";
import { Camera, Heart } from "react-feather";
import ImageSlider from "../../myproperties/ImageSlider";
import AddToCompareProducts from "./AddToCompareProducts";
import PropertyLabel from "./PropertyLabel";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const PropertyBox = ({ data }) => {



    const symbol = '$';
    const currencyValue = 1
    const router = useRouter();
    const NavigateFavourit = () => {
        toast.success('Add Favourites Successful..');
        router.push('/myproperties/favourites')
    }


    const dateString = data.date;
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'numeric', year: 'numeric' };

    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'numeric' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });

    const formattedOutput = `${weekday}-${month}-${year}`;


    return (
        <>
            <div className="property-box">
                <div className="property-image">
                    <ImageSlider images={data} />
                    <div className="labels-left">
                        {/* <PropertyLabel labels={data.label} /> */}
                    </div>
                    <div className="seen-data">
                        <Camera />
                        <span>{data.media?.length}</span>
                    </div>
                    <div className="overlay-property-box">
                        {/* <Link href='https://sheltos-react.vercel.app/pages/user-panel/compare-property' className="effect-round" title="Compare">
                            <AddToCompareProducts id={data.id} />
                        </Link>
                        <div className="effect-round like" onClick={() => { NavigateFavourit() }} title="wishlist">
                            <Heart />
                        </div> */}
                    </div>
                </div>
                <div className="property-details">
                    <span className="font-roboto">{data.country} </span>
                    <Link href="#">
                        <h3>{data.beds} Beds {data.property_type} for {data.property_status}</h3>
                    </Link>
                    <h6>
                        {symbol}
                        {(data.price * currencyValue).toFixed(2) || (48596.0 * currencyValue).toFixed(2)}*
                    </h6>
                    <p className="font-roboto">{`${data.description.substring(0, 120)}`}. . . </p>
                    <ul>
                        <li>
                            <img src="/assets/images/svg/icon/double-bed.svg" className="img-fluid" alt="" />
                            Bed : {data.beds}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/bathroom.svg" className="img-fluid" alt="" />
                            Baths : {data.baths}
                        </li>
                        <li>
                            <img src="/assets/images/svg/icon/square-ruler-tool.svg" className="img-fluid ruler-tool" alt="" />
                            Sq Ft : {data.area}
                        </li>
                    </ul>
                    <div className="property-btn d-flex">
                        <span>{formattedOutput}</span>
                        <Link href={`/myproperties/edit-property/${data.slug}`}>
                            <button type="button" className="btn btn-dashed btn-pill">
                                Edit
                            </button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyBox;
