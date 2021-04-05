import React from 'react';
const Rating = ({rating,viewers}) => {
    var value = rating;
    var star;
    if(value>=5)
    {
        star="fa fa-star"
    }
    else if(value>=4.5)
    {
        star=" fa fa-star-half-o"
    }
    else{
        star = "fa fa-star-o"
    }

    return ( 
        <div>
            rated {rating}<i className={star}></i> by {viewers} viewers
        </div>
    );
}
 
export default Rating;