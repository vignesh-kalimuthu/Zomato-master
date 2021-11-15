//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { FoodModel } from "../../database/allModels";

//validations
import { ValidateRestaurantId , ValidateCategory } from "../../validation/food";

const Router = express.Router();

/*
Route             /
Description       Get All the foods based on particular restaurant
Parameters        id
Access            Public
Method            GET
*/

Router.get("/:_id", async(req,res)=>{
    try{

        await ValidateRestaurantId(req.params); 
         const {_id} = req.params;
         const foods = await FoodModel.find({restaurant: _id});
         return res.json({ foods });
   
        }catch(error){
            return res.status(500).json({error: error.message});
        }
});


/*
Route             /
Description       Get particular restaurant for all the food based on particular category
Parameters        category
Access            Public
Method            GET  
*/

Router.get("/r/:category", async(req,res) => {
    try{
        await ValidateCategory(req.params);
        const {category} = req.params; 
        const foods = await FoodModel.find({
            category: { $regex: category , $options: "i"}
        });
     return res.json({foods});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
})

export default Router;