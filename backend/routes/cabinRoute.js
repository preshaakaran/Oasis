import express from 'express'
import { addCabin, deleteCabin, fetchCabins, fetchCabinsAll } from '../controllers/cabinControllers.js';
import multer from 'multer';

const cabinRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

cabinRouter.post('/add',upload.single('image'), addCabin);
cabinRouter.get('/list', fetchCabinsAll);
cabinRouter.get('/list/:id', fetchCabins);
cabinRouter.delete('/delete/:id', deleteCabin);


export default cabinRouter;