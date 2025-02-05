import React, { useEffect } from 'react'
import './table.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchProduct, postProduct, sortPriceHigh, sortPriceLow } from '../redux/features/productSlice'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import schema from '../components/schema/productSchema';
import { useState } from 'react';
import { Formik } from 'formik';
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
    const products = useSelector((state) => state.products.products)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');



    useEffect(() => {

        dispatch(fetchProduct())
    }, [dispatch]);


    const removeProduct = (id) => {
        dispatch(deleteProduct(id))
    }
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
          formik.setFieldValue('image', imageUrl); // Formik dəyərini təyin et
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
    
    // const formik = useFormik({
    //     initialValues: {
    //         name: '',
    //         price: '',
    //         image: '',
    //         description: ''
    //     },
    //     validationSchema: schema,
    //     onSubmit: values => {
    //         dispatch(postProduct(values))
    //         handleClose()
    //         formik.resetForm()
    //     },
    // });
    const formik = useFormik({
        initialValues: { name: '', price: '', image: '', description: '' },
        validationSchema: schema,
        onSubmit: (values) => {
          if (!values.image) {
            alert('Şəkil yükləyin!');
            return;
          }
          dispatch(postProduct(values));
          handleClose();
          formik.resetForm();
          setImagePreview('');
        },
      });
    const sortlh = () => {
        dispatch(sortPriceLow())

    }
    const sorthl = () => {
        dispatch(sortPriceHigh())
    }


    return (
        <div>
            <div class="container">

                <h1>Admin Page</h1>
             <Link to='/user'className='mainbtn'>User</Link>
                <button className='btn btn-primary mx-2' onClick={() => { sortlh() }}>High to low</button>
                <button className='btn btn-primary ml-3' onClick={() => { sorthl() }}>  low to high</button>
                <button className='btn btn-warning' onClick={handleOpen}>create </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            create new product
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder='add name'
                            />
                            {formik.errors.name ? <div style={{ color: "red" }}>{formik.errors.name}</div> : null}

                            {/* <input
                                id="image"
                                name="image"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.image}
                                placeholder='add image url'
                            />

                            {formik.errors.image ? <div style={{ color: "red" }}>{formik.errors.image}</div> : null} */}
   <input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*" 
            />
            <button 
              type="button" 
              onClick={handleImageUpload}
            >
              Şəkli Yüklə
            </button>

            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ width: '100px' }} />
            )}
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder='add price'
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            />
                            {formik.errors.price ? <div style={{ color: "red" }}>{formik.errors.price}</div> : null}

                            <input
                                id="description"
                                name="description"
                                type="text"
                                placeholder='decjd'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            {formik.errors.description ? <div style={{ color: "red" }}>{formik.errors.description}</div> : null}
                            <button type="submit" className='mt-4 btn btn-danger'>Submit</button>
                        </form>

                    </Box>
                </Modal>

                <div class="table">
                    <div class="table-header">
                        <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                        <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Image</a></div>
                        <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">description</a></div>
                        <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">price</a></div>
                        <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">action</a></div>
                    </div>
                    <div class="table-content">


                        {
                            products.length > 0 ? (
                                products.map((product) =>
                                    <div class="table-row" key={product._id}>
                                        <div class="table-data">{product.name}</div>
                                        <div class="table-data" style={{ height: "70px" }}>
                                            <img src=
                                                {product.image} alt="" />
                                        </div>
                                        <div class="table-data">{product.description}</div>
                                        <div class="table-data">${product.price}</div>
                                        <div class="table-data">
                                            <button class='btn btn-danger' onClick={() => removeProduct(product._id)}>
                                                delete

                                            </button>
                                        </div>


                                    </div>)
                            ) : ("no product")
                        }




                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addpage
