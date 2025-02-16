import book from "../models/productModels.js";
import path from 'path';


export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // `user` obyektinin tam məlumatlarını gətirmək üçün `populate()` istifadə edirik
    const productItem = await book.findById(productId).populate("reviews.user", "name isAdmin isLogin isVerified email image");

    if (!productItem) {
      return res.status(404).json({ message: "Məhsul tapılmadı!" });
    }

    res.status(200).json({ reviews: productItem.reviews });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
};

export const addReview = async (req, res) => {
  try {
      const { productId } = req.params;
      const { userId, rating, comment } = req.body;

      if (!userId || !rating || !comment) {
          return res.status(400).json({ message: "Bütün sahələri doldurun!" });
      }

      const productItem = await book.findById(productId);
      if (!productItem) {
          return res.status(404).json({ message: "Məhsul tapılmadı!" });
      }

      
      productItem.reviews.push({
          user: userId,
          rating,
          comment,
          createdAt: new Date()
      });

      await productItem.save();
      res.status(201).json({ productItem });
  } catch (error) {
      res.status(500).json({ message: "Server xətası", error });
  }
};
export const deleteReview = async (req, res) => {
  try {
      const { productId, reviewId } = req.params;
      const productItem = await book.findById(productId);

      if (!productItem) {
          return res.status(404).json({ message: "Məhsul tapılmadı!" });
      }

      const review = productItem.reviews.id(reviewId);
      if (!review) {
          return res.status(404).json({ message: "Rəy tapılmadı!" });
      }

      // İstifadəçi ya rəyi yazan olmalıdır, ya da admin
      if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
          return res.status(403).json({ message: "Bu rəyi silməyə icazəniz yoxdur!" });
      }

      productItem.reviews = productItem.reviews.filter(r => r._id.toString() !== reviewId);
      await productItem.save();

      res.status(200).json({ productItem });
  } catch (error) {
      res.status(500).json({ message: "Server xətası", error });
  }
};

export const updateReview = async (req, res) => {
  try {
      const { productId, reviewId } = req.params;
      const { rating, comment } = req.body;

      console.log("Gələn Product ID:", productId);
      console.log("Gələn Review ID:", reviewId);
      console.log("İstifadəçi ID:", req.user._id);

      const productItem = await book.findById(productId);
      if (!productItem) {
          return res.status(404).json({ message: "Məhsul tapılmadı!" });
      }

     


      const review = productItem.reviews.id(reviewId);
      if (!review) {
          return res.status(404).json({ message: "Rəy tapılmadı!" });
      }

      console.log("Review User:", review.user);
      console.log("Review User (String):", review.user.toString());
      console.log("Logged-in User (String):", req.user._id.toString());

      // Yalnız review-u yazan istifadəçi dəyişə bilər
      if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
          return res.status(403).json({ message: "Bu rəyi redaktə etməyə icazəniz yoxdur!" });
      }

      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
      review.createdAt = new Date();

      await productItem.save();
      res.status(200).json({ message: "Rəy yeniləndi!", productItem });
  } catch (error) {
      console.error("Xəta:", error);
      res.status(500).json({ message: "Server xətası", error });
  }
};
export const updateOwnReview = async (req, res) => {
  try {
      const { productId, reviewId } = req.params;
      const { rating, comment } = req.body;

      const product = await book.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const review = product.reviews.id(reviewId);
      if (!review) return res.status(404).json({ message: "Review not found" });

      // İstifadəçinin öz rəyini yeniləməyə icazə verək
      if (review.user.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: "You can only edit your own reviews" });
      }

      review.rating = rating || review.rating;
      review.comment = comment || review.comment;
      review.updatedAt = Date.now();

      await product.save();
      res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};






export const postBook = async (req, res) => {
  try {
    const { image, ...bookData } = req.body;

    if (!image) throw new Error("Image URL is required!");

    const newBook = new book({ ...bookData, image });
    await newBook.save();
    
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ 
      message: 'Validation failed',
      error: error.message 
    });
  }
}
export const getBook = async (req, res) => {
    try {
      const books = await book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
}



export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
      const foundBook = await book.findById(id);
      if (!foundBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(foundBook);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch book by ID', error: error.message });
    }
}

export const searchBooks = async (req, res) => {
  const { query, genre, year } = req.query;

  const filters = {};
  if (genre) filters.genre = genre;
  if (year) filters.publicationYear = year;

  try {
    const searchResults = await book.find({
      $and: [
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
          ],
        },
        filters, 
      ],
    });

    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ message: 'Kitab axtarışı uğursuz oldu', error: error.message });
  }
};





export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await book.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(deletedBook);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
}

export const sortPriceHighToLow = async (req, res) => {
  try {
    const sortedBooks = await book.find().sort({ price: -1 });
    res.status(200).json(sortedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to sort books by price (High to Low)', error: error.message });
  }
};

export const sortPriceLowToHigh = async (req, res) => {
  try {
    const sortedBooks = await book.find().sort({ price: 1 });
    res.status(200).json(sortedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to sort books by price (Low to High)', error: error.message });
  }
};

export const sortRatingLowToHigh = async (req, res) => {
  try {
    const sortedBooks = await book.find().sort({ "ratings.average": 1 });
    res.status(200).json(sortedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to sort books by rating (Low to High)', error: error.message });
  }
};

export const sortRatingHighToLow = async (req, res) => {
  try {
    const sortedBooks = await book.find().sort({ "ratings.average": -1 });
    res.status(200).json(sortedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to sort books by rating (High to Low)', error: error.message });
  }
};



export const uploadImage = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      // Faylın URL-i
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('Uploaded file:', req.file);

      // res.status(200).json({ message: 'Uploaded successfully', imageUrl: imageUrl });
      res.status(200).json({ 
        message: 'Uploaded successfully', 
        imageUrl: `http://localhost:5000/uploads/${req.file.filename}` 
      });
  } catch (error) {
      console.error("Error in uploadImage:", error);  // Ətraflı xətanı loglayın
      res.status(500).json({ message: 'Failed to upload file', error: error.message });
  }
};



export const editBook = async (req, res) => {
  try {
    const { id } = req.params; 
    const { image, ...bookData } = req.body;

    const existingBook = await book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found!' });
    }

    existingBook.set({ ...bookData, image: image || existingBook.image });
    const updatedBook = await existingBook.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ 
      message: 'Update failed',
      error: error.message 
    });
  }
}
