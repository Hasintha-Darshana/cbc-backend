import  Order  from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req,res){
    //get user info
    if(req.user == null){
        res.status(403).json({
            message : "You are not authorized to create an order. Please login first."
        })
        return
    }

    //add user name

    const orderInfo = req.body
    if(orderInfo.name == null){
        orderInfo.name = req.user.firstName + " " + req.user.lastName
    }

    //order id generate
    let orderId = "CBC00001"

    const lastOrder = await Order.find().sort({date : -1}).limit(1)

    if(lastOrder.length > 0){
        const lastOrderId = lastOrder[0].orderID //"CBC00051"
        const lastOrderString =lastOrderId.replace("CBC", "")    //"00051"
        const lastOrderNumber = parseInt(lastOrderString)//51
        const newOrderNumber = lastOrderNumber + 1 //52
        const newOrederString = String(newOrderNumber).padStart(5, '0') //00052

        orderId = "CBC" + newOrederString //CBC00052

    }
    
    

    try{

        let total = 0
        let labelledTotal = 0
        let products = []

        for(let i =0 ; i<orderInfo.products.length; i++){
            const item = await Product.findOne({productId : orderInfo.products[i].productId})

            if(item == null){
                res.status(404).json({
                    message : "Product not found"
                })
                return
            }
            if(item.isAvailable == false){
                res.status(404).json({
                    message : "Product is not available"
                })
                return
            } 

            

            products[i] ={
                productInfo : {
                    productId : item.productId,
                    name : item.name,
                    altNames : item.altNames,
                    description : item.description,
                    image : item.image,
                    labledPrice : item.labeledPrice,
                    price : item.price,
                },
                quantity : orderInfo.products[i].qty,
            }
            total += (item.price * orderInfo.products[i].qty)
            labeledTotal += (item.labeledPrice * orderInfo.products[i].qty)

        }
            

        const order =new Order({
            orderId : orderId,
            email : req.user.email,
            name : orderInfo.name,
            address : orderInfo.address,
            total : 0,
            phone : orderInfo.phone,
            products : products,
            labeledTotal : labeledTotal,
            total : total
        })

        const createdOrder = await order.save()
        res.json({
            message : "Order created successfully",
            order : createdOrder
        })

    }catch(err){
        res.status(500).json({
            message : "Order not created",
            error : err
            
        })

    }


}