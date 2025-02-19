import React, { useEffect, useState } from 'react';
import '../table.scss';
 import '../css/spinner.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProduct, filterByCategory, postProduct, sortByLang, sortPriceHigh, sortPriceLow, sortRatingHtL, sortRatingLtH } from '../../redux/features/productSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import schema from '../../components/schema/productSchema';
import { Link } from 'react-router-dom';


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
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const categories = ["Classics", "Klassik Ədəbiyyat", "Fantasy", "Satire", "Dystopia"]; 

 
  
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

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
        } catch (error) {
            console.error('Yükləmə xətası:', error);
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
        const selectedCategory = event.target.value;
        dispatch(filterByCategory(selectedCategory));
    };
    const formik = useFormik({
        initialValues: { name: '', price: '', image: '', description: '', category: '', author: '', genre: '', publishedDate: '', lang: '' },
        validationSchema: schema,
        onSubmit: async (values) => {
            if (!values.image) {
                alert('Şəkil təstiqlə');
                return;
            }

            if (editMode) {
                try {
                    await fetch(`http://localhost:5000/api/books/${selectedProductId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    });
                    alert('Product updated successfully!');
                } catch (error) {
                    console.error('Update error:', error);
                }
            } else {
                dispatch(postProduct(values));
                window.location.reload();
            }

            handleClose();
            formik.resetForm();
            setImagePreview('');
            dispatch(fetchProduct());
        },
    });
    
    
// console.log(products)
    const sortlh = () => dispatch(sortPriceLow());
    const sorthl = () => dispatch(sortPriceHigh());
    const removeProduct = (id) => dispatch(deleteProduct(id));
    const sortbyratinghl = () => dispatch(sortRatingLtH());
    const sortbyratinglth=()=>dispatch(sortRatingHtL())
    const sortByLangAsc = () => dispatch(sortByLang("asc"));
    const sortByLangDesc = () => dispatch(sortByLang("desc")); 
  

    return (
        <div>
            <div className="container">
                <h1 className="mb-3">Admin Page</h1>
                <Link to="/user" className="mainbtn mx-4">User</Link>
                <br /><br /><br />
                  <button onClick={handleOpen} style={{backgroundColor:"red"}} className="btnn btn-1 hover-filled-slide-down">
                    <span>Create</span>
                </button>
                <button onClick={sortlh} className="btnn btn-1 hover-filled-slide-down">
                    <span>High To Low</span>
                </button>
                <button onClick={sorthl} className="btnn btn-1 hover-filled-slide-down">
                    <span>Low to High</span>
                </button>
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
    <select onChange={handleFilterByCategory}>
        <option disabled value="">Select Category</option>
        {categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
        ))}
    </select>
</div>
                <h3>Books: {products.length}</h3>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={style} className="modalbox">
                        <Typography variant="h6">{editMode ? 'EDIT PRODUCT' : 'CREATE NEW PRODUCT'}</Typography>
                        <form onSubmit={formik.handleSubmit} className="modalform">
                            <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} placeholder="add name" />
                            {formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>}

                            <input type="file" onChange={handleFileChange} accept="image/*" className="fileinput" />
                            <button className="buttonimage" type="button" onClick={handleImageUpload}>Şəkli Təstiqlə</button>

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

                <div className="table">
                    <div className="table-header">
                        <div className="header__item">Book name</div>
                        <div className="header__item">Image</div>
                        <div className="header__item">Description</div>
                        <div className="header__item">Price</div>
                        <div className="header__item">Category</div>
                        <div className="header__item">Genre</div>
                        <div className="header__item">Author</div>
                        <div className="header__item">Published Date</div>
                        <div className="header__item">Lang</div>
                        <div className="header__item">Rating</div>
                        <div className="header__item">Actions</div>
                    </div>
                    <div className="table-content">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="table-row" key={product._id}>
                                    <div className="table-data">{product.name}</div>
                                    <div className="table-data" style={{ height: "150px" }}>
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="table-data">{product.description.slice(0, 100)}...</div>
                                    <div className="table-data">${product.price}</div>
                                    <div className="table-data">{product.category}</div>
                                    <div className="table-data">{product.genre}</div>
                                    <div className="table-data">{product.author}</div>
                                    <div className="table-data">{product.publishedDate}</div>
                                  
                                    <div className="table-data">{product.lang}</div>
                                    <div className="table-data">{product.averageRating}</div>
                                    <div className="table-data">
                                        <button className="btn btn-danger mx-1" onClick={() => removeProduct(product._id)}>Delete</button>
                                        <button className="btn btn-warning mt-1" onClick={() => handleEditOpen(product)}>Edit</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div class="lds-facebook">
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
}

export default Addpage;
