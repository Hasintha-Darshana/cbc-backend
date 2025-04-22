import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true
    },
    comment :{
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    images : [
        {
            type : String
        }
    ],
    isHidden : {
        type : Boolean,
        default : false,
        required : true
    }
})

const Review = mongoose.model("reviews", reviewSchema);
export default Review;