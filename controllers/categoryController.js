import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

// Create Category
export const createCategoryController = async (req , res)=>{
    try{
        const {name} = req.body ;
        if(!name)
        {
            return res.status(401).send({message : "Name is Required"});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true , 
                message : "Category Already Exists"
            })
        }

        const category = await new categoryModel({
            name , 
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success:true ,
            message: "new Category created",
            category,
        });
    } catch(error) {
        console.log(error) ;
        res.status(501).send({
                success:false , 
                error, 
                message: 'Error in Category',
            })
        
    }
}

// Update Category

export const updateCategoryController = async (req , res)=>{
    try{
        const {name} = req.body ;
        const {id} = req.params ;
        const category = await categoryModel.findByIdAndUpdate(id ,{name , slug:slugify(name)} , {new:true});
        res.status(200).send({
            success : true ,
            message : "Category updated successfully" , 
            category 
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: true ,
            message:"Error while updating the category" ,
            error
        })
    }
};

// get all category 
export const getCategoryController = async (req , res)=>{
    try{
        const category  = await categoryModel.find({});
        res.status(200).send({
            success : true , 
            message : "All category list" , 
            category
        })
    }
    catch(error){
        // console.log(error);
        res.status(500).send({
            success: false , 
            message : "Error in getAll category" , 
            error
        })
    }
};


// get single category 
export const singleCategoryController = async (req , res)=>{
    try{
        const category  = await categoryModel.findOne({slug : req.params.slug});
        res.status(200).send({
            success : true , 
            message : "single category " , 
            category
        })
    }
    catch(error){
        // console.log(error);
        res.status(500).send({
            success: false , 
            message : "Error in single category" , 
            error
        })
    }
};


// delete category 
export const deleteCategoryController = async (req , res)=>{
    try{
        const {id} = req.params ;
        const category  = await categoryModel.findByIdAndDelete(id );
        res.status(200).send({
            success : true , 
            message : "delete category successfully" , 
            category
        })
    }
    catch(error){
        // console.log(error);
        res.status(500).send({
            success: false , 
            message : "Error in delete category" , 
            error
        })
    }
};
