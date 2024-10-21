import Category from "../Models/category.js";

//Create category function
export function createCategory(req,res){
    if(req.user==null){
        res.status(401).json({
            message:"Unauthorized user.Please log in"
        })
        return
    }
    if(req.user.type!="admin"){
        res.status(403).json({
            message:"Forbidden.You are not authorized to create a cetogory"
        })
        return
    }

    const newCategory=new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message:"Category created successfully",
                result:result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"Category creation failed",
                error:err
            })
        }
    )

}

//Delete Cetogory Function
//If you want to delete something by using one parameter in the API.Not in the "Body" of the request
export function DeleteCategory(req,res){
    if(req.user==null){
        res.status(401).json({
            message:"Unauthorized user.Please log in to system"
        })
        return
    }

    if(req.user.type!="admin"){
        res.status(403).json({
            message:"You are not authorized to delete a category"
        })
        return
    }

    const name=req.params.name;
    Category.findOneAndDelete({name:name}).then(
        ()=>{
            res.json({
                message:"Category deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Category deletion failed"
            })
        }
    )
}

//Get Category List
export function getCategoryList(req,res){
    Category.find().then(
        (result)=>{
            res.json({
                message:"Category list found",
                result:result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Category list not found"
            })
        }
    )
}

//Get one category by category name
export function getCategoryByName(req,res){
    const name=req.params.name;
    Category.findOne({name:name}).then(
        (result)=>{
            if(result==null){
                res.json({
                    message:"Category not found" //While searched category name is incorrect
                })
            }else{
                res.json({
                    message:"Category found successfully",
                    category:result
                })
            }
        }
    ).catch(
        ()=>{
            res.json({
                message:"Failed to get category" //If there is a connection issue while connecting to the database
            })
        }
    )
}
   
