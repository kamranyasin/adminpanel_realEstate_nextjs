
import Link from "next/link";
import React from "react";
import { Camera, Heart } from "react-feather";
import ImageSlider from "../../myprojects/ImageSlider";
import AddToCompareProducts from "./AddToCompareProjects";
import PropertyLabel from "./ProjectLabel";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProjectBox = ({ data }) => {



    const symbol = '$';
    const currencyValue = 1
    const router = useRouter();
    const NavigateFavourit = () => {
        toast.success('Add Favourites Successful..');
        router.push('/myproperties/favourites')
    }


    const dateString = data.date;
    const date = new Date(dateString);


    const content = data.description
    const limitContent = (text, limit) => {
        if (text.length > limit) {
          return text.substring(0, limit) + '...';
        }
        return text;
      };
    
      const limitedContent = limitContent(content, 60);

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
                    </div>
                </div>
                <div className="property-details">
                    <span className="font-roboto">{data.country} </span>
                    <Link href="#">
                        <h3>{data.title}</h3>
                    </Link>
                    <h6>
                        {symbol}
                        {(data.starting_price * currencyValue).toFixed(2) || (48596.0 * currencyValue).toFixed(2)}*
                    </h6>
                    <p className="font-roboto" dangerouslySetInnerHTML={{__html: limitedContent}}></p>
                    
                    <div className="property-btn d-flex">
                        <span>{data.life_style}</span>
                        <Link href={`/myprojects/edit-project/${data.slug}`}>
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

export default ProjectBox;
