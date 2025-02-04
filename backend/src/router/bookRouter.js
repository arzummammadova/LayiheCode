import express from 'express'
import { deleteBook, getBook, getBookById, postBook, searchBooks, sortPriceHighToLow, sortPriceLowToHigh, sortRatingHighToLow, sortRatingLowToHigh, uploadImage} from '../controller/productControllers.js'
import multer from 'multer';
import path from 'path'
const router=express.Router()



const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => 
      cb(null, Date.now() + path.extname(file.originalname)) // Düzəliş edildi
  });
  
  const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) cb(null, true);
      else cb(new Error('Only images are allowed!'), false);
    }
  });
// Routes
router.post("/upload", upload.single('image'), uploadImage);

router.post("/",postBook)
router.get("/",getBook)
router.get("/search", searchBooks);
router.delete("/:id",deleteBook)
router.get("/:id", getBookById);
router.get("/sort/price-high-to-low", sortPriceHighToLow);  
router.get("/sort/price-low-to-high", sortPriceLowToHigh);  
router.get("/sort/rating-low-to-high", sortRatingLowToHigh); 
router.get("/sort/rating-high-to-low",sortRatingHighToLow)


export default router