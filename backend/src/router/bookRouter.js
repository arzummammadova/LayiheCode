import express from 'express'
import { addReview, deleteBook, deleteReview, dislikeReview, editBook, filterByCategory, getBook, getBookById, getBooksByGenre, getReviews, likeReview, postBook, searchBooks, sortByLang, sortPriceHighToLow, sortPriceLowToHigh, sortRatingHighToLow, sortRatingLowToHigh, updateOwnReview, updateReview, uploadImage} from '../controller/productControllers.js'
import multer from 'multer';
import path from 'path'
import { adminProtect, protect } from '../middleware/auth/authMiddleware.js';
const router=express.Router()



const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => 
      cb(null, Date.now() + path.extname(file.originalname)) 
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
router.get('/genre/:genre/:excludeId', getBooksByGenre);
router.get("/",getBook)
router.get("/search", searchBooks);
router.delete("/:id",deleteBook)
router.get("/:id", getBookById);
router.get("/sort/price-high-to-low", sortPriceHighToLow);  
router.get("/sort/price-low-to-high", sortPriceLowToHigh);  
router.get("/sort/rating-low-to-high", sortRatingLowToHigh); 
router.get("/sort/rating-high-to-low",sortRatingHighToLow)
router.put('/:id', editBook);
router.get("/sort/lang", sortByLang);
router.get("/filter/category", filterByCategory);


//? review aid 
router.get("/:productId/reviews",getReviews);
router.post("/:productId",protect, addReview);
router.delete("/:productId/:reviewId",protect, deleteReview);
router.put("/:productId/:reviewId", protect, updateOwnReview);
router.put("/:productId/reviews/:reviewId/like", protect, likeReview);
router.put("/:productId/reviews/:reviewId/dislike", protect, dislikeReview);





// router.delete("/admin/:productId/:reviewId", protect, adminProtect, deleteReview); 

// router.put("/:productId/:reviewId",protect,adminProtect, updateReview);
export default router