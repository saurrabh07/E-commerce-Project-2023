import express  from "express";
import { loginController,
    testController ,
    registerController ,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    orderStatusController,
    getAllOrdersController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// import cors from "cors";
// // const app = express();
// router.use(cors());

// router Object 
const router = express.Router();


// routing 
// Register || Method Post 
router.post('/register' , registerController);
 
// lOGIN || POST 
router.post('/login' , loginController);

// forgot Password || POST
router.post('/forgot-password' , forgotPasswordController);
 
// text routes
router.get('/test'  , requireSignIn , isAdmin, testController);

//protected user route auth
router.get("/user-auth" , requireSignIn , (req , res) =>{
    res.status(200).send({ok : true});
});

//protected admin route auth
router.get("/admin-auth" , requireSignIn ,isAdmin, (req , res) =>{
    res.status(200).send({ok : true});
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );


export default router ; 