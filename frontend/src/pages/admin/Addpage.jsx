import React, { useEffect, useState } from 'react';
import '../table.scss';
import '../css/spinner.css';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../../components/chat/Chat'
import {
    deleteProduct,
    fetchProduct,
    filterByCategory,
    postProduct,
    sortByLang,
    sortPriceHigh,
    sortPriceLow,
    sortRatingHtL,
    sortRatingLtH,
} from '../../redux/features/productSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import schema from '../../components/schema/productSchema';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Addpage = () => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const categories = ['Classics', 'Klassik Ədəbiyyat', 'Fantasy', 'Satire', 'Dystopia'];
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    // Apply saved category filter on component mount
    useEffect(() => {
        if (selectedCategory) {
            dispatch(filterByCategory(selectedCategory));
        }
    }, [selectedCategory, dispatch]);

    // Apply saved sort order on component mount
    useEffect(() => {
        if (sortOrder) {
            applySortOrder(sortOrder);
        }
    }, [sortOrder, dispatch]);

    // Handle search input change with debounce
    useEffect(() => {
        if (searchQuery) {
            const debounceTimer = setTimeout(() => {
                handleSearch(searchQuery);
            }, 500); // 500ms debounce
            return () => clearTimeout(debounceTimer);
        } else {
            setSearchResults([]); // Clear search results if query is empty
        }
    }, [searchQuery]);

    const applySortOrder = (order) => {
        switch (order) {
            case 'priceLowToHigh':
                dispatch(sortPriceLow());
                break;
            case 'priceHighToLow':
                dispatch(sortPriceHigh());
                break;
            case 'ratingLowToHigh':
                dispatch(sortRatingLtH());
                break;
            case 'ratingHighToLow':
                dispatch(sortRatingHtL());
                break;
            case 'langAsc':
                dispatch(sortByLang('asc'));
                break;
            case 'langDesc':
                dispatch(sortByLang('desc'));
                break;
            default:
                break;
        }
    };

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/search?query=${query}`);
            const data = await response.json();
            setSearchResults(data); 
        } catch (error) {
            console.error('Search error:', error);
            Swal.fire('Error!', 'Failed to fetch search results.', 'error');
        }
    };
   
    const handleOpen = () => {
        setEditMode(false);
        formik.resetForm();
        setImagePreview('');
        setOpen(true);
    };

    const handleEditOpen = (product) => {
        setEditMode(true);
        setSelectedProductId(product._id);
        formik.setValues(product);
        setImagePreview(product.image);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleImageUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/api/books/upload', {
                method: 'POST',
                body: formData,
            });
            const { imageUrl } = await response.json();
            formik.setFieldValue('image', imageUrl);
            // Swal.fire('Success!', 'Image uploaded successfully.', 'success');
        } catch (error) {
            console.error('Yükləmə xətası:', error);
            Swal.fire('Error!', 'Image upload failed.', 'error');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFilterByCategory = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        localStorage.setItem('selectedCategory', category);
        dispatch(filterByCategory(category));
        Swal.fire('Filter Applied!', `Category: ${category}`, 'success');
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            image: '',
            description: '',
            category: '',
            author: '',
            genre: '',
            publishedDate: '',
            lang: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            if (!values.image) {
                Swal.fire('Error!', 'Please upload an image.', 'error');
                return;
            }

            if (editMode) {
                try {
                    await fetch(`http://localhost:5000/api/books/${selectedProductId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    });
                    Swal.fire('Success!', 'Product updated successfully!', 'success');
                } catch (error) {
                    console.error('Update error:', error);
                    Swal.fire('Error!', 'Failed to update product.', 'error');
                }
            } else {
                dispatch(postProduct(values));
                Swal.fire('Success!', 'Product created successfully!', 'success');
            }

            handleClose();
            formik.resetForm();
            setImagePreview('');
            dispatch(fetchProduct());
        },
    });

    const sortlh = () => {
        setSortOrder('priceLowToHigh');
        localStorage.setItem('sortOrder', 'priceLowToHigh');
        dispatch(sortPriceLow());
        Swal.fire('Sorted!', 'Price: Low to High', 'success');
    };

    const sorthl = () => {
        setSortOrder('priceHighToLow');
        localStorage.setItem('sortOrder', 'priceHighToLow');
        dispatch(sortPriceHigh());
        Swal.fire('Sorted!', 'Price: High to Low', 'success');
    };

    const sortbyratinghl = () => {
        setSortOrder('ratingLowToHigh');
        localStorage.setItem('sortOrder', 'ratingLowToHigh');
        dispatch(sortRatingLtH());
        Swal.fire('Sorted!', 'Rating: Low to High', 'success');
    };

    const sortbyratinglth = () => {
        setSortOrder('ratingHighToLow');
        localStorage.setItem('sortOrder', 'ratingHighToLow');
        dispatch(sortRatingHtL());
        Swal.fire('Sorted!', 'Rating: High to Low', 'success');
    };

    const sortByLangAsc = () => {
        setSortOrder('langAsc');
        localStorage.setItem('sortOrder', 'langAsc');
        dispatch(sortByLang('asc'));
        Swal.fire('Sorted!', 'Language: A-Z', 'success');
    };

    const sortByLangDesc = () => {
        setSortOrder('langDesc');
        localStorage.setItem('sortOrder', 'langDesc');
        dispatch(sortByLang('desc'));
        Swal.fire('Sorted!', 'Language: Z-A', 'success');
    };

    const removeProduct = (id) => {
        dispatch(deleteProduct(id));
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
    };

    // Determine which products to display (search results or all products)
    const displayedProducts = searchQuery ? searchResults : products;

    return (
        <div>
            <div className="container">
                <h1 className="mb-3">Admin Page</h1>
                
                <Chat/>
                <Link to="/user" className="mainbtn mx-4">
                    User
                </Link>
                <br />
                <br />
                <br />
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input-admin"
                />
                <button onClick={handleOpen} style={{ backgroundColor: 'red' }} className="btnn btn-1 hover-filled-slide-down">
                    <span>Create</span>
                </button>
                {/* <button onClick={sortlh} className="btnn btn-1 hover-filled-slide-down">
                    <span>High To Low</span>
                </button>
                <button onClick={sorthl} className="btnn btn-1 hover-filled-slide-down">
                    <span>Low to High</span>
                </button> */}
                <button onClick={sortbyratinghl} className="btnn btn-1 hover-filled-slide-down">
                    <span>Low to High(by rating)</span>
                </button>
                <button onClick={sortbyratinglth} className="btnn btn-1 hover-filled-slide-down">
                    <span>High to Low(by rating)</span>
                </button>
                <button onClick={sortByLangAsc} className="btnn btn-1 hover-filled-slide-down">
                    <span> Sort by Language (A-Z)</span>
                </button>
                <button onClick={sortByLangDesc} className="btnn btn-1 hover-filled-slide-down">
                    <span> Sort by Language (Z-A)</span>
                </button>
                <div className="select-container">
                    <select onChange={handleFilterByCategory} value={selectedCategory}>
                        <option disabled value="">
                            Select Category
                        </option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <h3>Books: {displayedProducts.length}</h3>

                {/* Modal for Create/Edit Product */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style} className="modalbox">
                        <Typography variant="h6">{editMode ? 'EDIT PRODUCT' : 'CREATE NEW PRODUCT'}</Typography>
                        <form onSubmit={formik.handleSubmit} className="modalform">
                            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} placeholder="add name" />
                            {formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>}

                            <input type="file" onChange={handleFileChange} accept="image/*" className="fileinput" />
                            <button style={{display:"block"}} className="buttonimage" type="button" onClick={handleImageUpload}>
                                Şəkli Təstiqlə
                            </button>

                            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px' }} />}
                            <input id="price" name="price" type="number" placeholder="add price" onChange={formik.handleChange} value={formik.values.price} />
                            {formik.errors.price && <div style={{ color: 'red' }}>{formik.errors.price}</div>}

                            <input id="description" name="description" type="text" placeholder="add description" onChange={formik.handleChange} value={formik.values.description} />
                            {formik.errors.description && <div style={{ color: 'red' }}>{formik.errors.description}</div>}
                            <input id="category" name="category" type="text" placeholder="add category" onChange={formik.handleChange} value={formik.values.category} />
                            {formik.errors.category && <div style={{ color: 'red' }}>{formik.errors.category}</div>}
                            <input id="author" name="author" type="text" placeholder="add author" onChange={formik.handleChange} value={formik.values.author} />
                            {formik.errors.author && <div style={{ color: 'red' }}>{formik.errors.author}</div>}
                            <input id="genre" name="genre" type="text" placeholder="add genre" onChange={formik.handleChange} value={formik.values.genre} />
                            {formik.errors.genre && <div style={{ color: 'red' }}>{formik.errors.genre}</div>}
                            <input id="publishedDate" name="publishedDate" type="date" onChange={formik.handleChange} value={formik.values.publishedDate} />
                            {formik.errors.publishedDate && <div style={{ color: 'red' }}>{formik.errors.publishedDate}</div>}
                            <input id="lang" name="lang" type="text" placeholder="add language" onChange={formik.handleChange} value={formik.values.lang} />
                            {formik.errors.lang && <div style={{ color: 'red' }}>{formik.errors.lang}</div>}

                            <div className="button-container-3" type="submit">
                                <span className="mas">{editMode ? 'Update' : 'Create'}</span>
                                <button type="submit">{editMode ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
                    
                {/* Table for displaying products */}
                <div className="table">
                    <div className="table-header">
                        <div className="header__item">Book name</div>
                        <div className="header__item">Image</div>
                        <div className="header__item">Description</div>
                        {/* <div className="header__item">Price</div> */}
                        <div className="header__item">Category</div>
                        <div className="header__item">Genre</div>
                        <div className="header__item">Author</div>
                        <div className="header__item">Published Date</div>
                        <div className="header__item">Lang</div>
                        <div className="header__item">Rating</div>
                        <div className="header__item">Actions</div>
                    </div>
                    <div className="table-content">
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product) => (
                                <div className="table-row" key={product._id}>
                                    <div className="table-data">{product.name}</div>
                                    <div className="table-data" style={{ height: '150px' }}>
                                    <Link to={`/details/${product._id}`}> {/* Məhsulun detallar səhifəsinə yönləndir */}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Link>
                                    </div>
                                    <div className="table-data">{product.description.slice(0, 80)}...</div>
                                    {/* <div className="table-data">${product.price}</div> */}
                                    <div className="table-data">{product.category}</div>
                                    <div className="table-data">{product.genre}</div>
                                    <div className="table-data">{product.author}</div>
                                    <div className="table-data">{product.publishedDate}</div>
                                    <div className="table-data">{product.lang}</div>
                                    <div className="table-data">{product.averageRating}</div>
                                    <div className="table-data">
                                        <button className="btn btn-danger mx-1" onClick={() => removeProduct(product._id)}>
                                            Delete
                                        </button>
                                        <button className="btn btn-warning mt-1" onClick={() => handleEditOpen(product)}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="lds-facebook">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addpage;