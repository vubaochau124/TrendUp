import express from 'express';
import { addStyle, addWearer, listStyle, listWearer, editStyle, editWearer, removeStyle, removeWearer, singleStyle, singleWearer, listProduct } from '../controllers/categoriesController.js';


const categotyRouter = express.Router();

categotyRouter.post('/addstyle' ,addStyle);
categotyRouter.post('/removestyle', removeStyle);
categotyRouter.post('/editstyle' , editStyle);
categotyRouter.get('/liststyle', listStyle);
categotyRouter.post('/singlestyle', singleStyle);

categotyRouter.post('/addwearer' ,addWearer);
categotyRouter.post('/removewearer', removeWearer);
categotyRouter.post('/editwearer' , editWearer);
categotyRouter.get('/listwearer', listWearer);
categotyRouter.post('/singlewearer', singleWearer);

categotyRouter.post('/listproduct', listProduct);


export default categotyRouter