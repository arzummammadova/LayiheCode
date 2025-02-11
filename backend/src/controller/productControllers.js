import book from "../models/productModels.js";
import path from 'path';


export const postBook = async (req, res) => {
  try {
    const { image, ...bookData } = req.body;

    // Validation
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
