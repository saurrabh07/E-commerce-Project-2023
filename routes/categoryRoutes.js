import  express  from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { createCategoryController 
    , deleteCategoryController, getCategoryController 
    , singleCategoryController 
    , updateCategoryController
} from "../controllers/categoryController.js";


const router = express.Router() 

//routes
router.post( "/create-category"
 , requireSignIn 
 , isAdmin 
 , createCategoryController  )

 router.put( "/update-category/:id" 
   ,requireSignIn 
   , isAdmin 
   , updateCategoryController
   )

// getAll category 
 router.get( "/get-category" ,
   getCategoryController
   )


// get single category 
 router.get( "/single-category/:slug" ,
   singleCategoryController
   )

// Delete category 
 router.delete( "/delete-category/:id" ,
   deleteCategoryController
   )
 
export default router; 