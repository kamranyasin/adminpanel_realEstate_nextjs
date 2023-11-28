
import Link from "next/link";
import React from "react";
import { Camera, Heart } from "react-feather";
import ImageSlider from "../../myblogs/ImageSlider";
//import AddToCompareProducts from "./AddToCompareProducts";
//import PropertyLabel from "./PropertyLabel";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const BlogBox = ({ data }) => {


    const router = useRouter();
    const NavigateFavourit = () => {
        toast.success('Add Favourites Successful..');
        router.push('/myproperties/favourites')
    }

    


    const dateString = data.createdAt;
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'numeric', year: 'numeric' };
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'numeric' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });

    const formattedOutput = `${weekday}-${month}-${year}`;

    const content = data.content
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

                </div>
                <div className="property-details">
                    <Link href="#">
                        <h3>{data.title}</h3>
                    </Link>
                    <h6>
                        {data.category}
                    </h6>
                    <p className="font-roboto" dangerouslySetInnerHTML={{__html: limitedContent}}></p>
                    <div className="property-btn d-flex">
                        <span>{formattedOutput}</span>
                        <Link href={`/myblogs/edit-blog/${data.slug}`}>
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

export default BlogBox;
