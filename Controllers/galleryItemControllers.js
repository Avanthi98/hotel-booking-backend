import GalleryItem from "../Models/galleryItems.js"

export function createGalleryItems(req,res){
    const user=req.user
    if(user==null){
        res.status(404).json({
            message:"Unauthorizes User! Please log in to create gallery items"
        })
        return;
    }
    if(user.type!="admin"){
        res.status(403).json({
            message:"You are not authorized to create gallery items"
        })
        return;
    }

    const galleryItem=req.body.item
    const newGalleryItem=new GalleryItem(galleryItem)

    newGalleryItem.save().then(
        ()=>{
            res.json({
                message:"Gallery Items saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Gallery Items creation failed"
            })
        }
    )}

    export function getGalleryItems(req,res){
        GalleryItem.find().then(
            (ItemList)=>{
                res.json({
                    List:ItemList
                })
            }
        )}
