import Review from "../models/review.js"

export async function createReview(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "Please login and try again"
        })
        return
    }
}