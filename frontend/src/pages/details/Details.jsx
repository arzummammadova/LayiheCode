import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../redux/features/productSlice';
import './details.scss';
import count from '../../assets/images/counticon.png'
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { LuShare2 } from "react-icons/lu";
import { FaRegHeart } from 'react-icons/fa';
import ShareModal from '../../components/modals/share/ShareModal';

const Details = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showShareModal, setShowShareModal] = useState(false); // New state for modal visibility

    useEffect(() => {
        dispatch(fetchProduct()).finally(() => setLoading(false));
        window.scrollTo(0, 0);
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find((item) => item._id === id);
            setSelected(foundProduct);
        }
    }, [products, id]);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!selected) {
        return <div>Product not found!</div>;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}.${day}.${year}`;
    };
    return (
        <>
            <section id='detail'>
                <div className="container">
                    <div className="details">
                        <div className="row detail-top">
                            <div className="col-lg-4 col-md-4 detail-image">
                                <img src={selected.image} alt="" />
                            </div>
                            <div className="col-lg-8 col-md-8 detail-right-top">
                                <div className="info">
                                    <p className="name">{selected.name}</p>
                                    <div className="info">
                                        <img style={{ width: "27px", height: "30px" }} src={count} alt="" /> 100k+</div>
                                    <p className="author">{selected.author}</p>
                                </div>
                                <div className="detail-actions ">
                                    <button className="btnn  hover-filled-slide-down btn-style">
                                        <span>Oxumağa əlavə et</span>
                                    </button>
                                    <button className="btnn  hover-filled-slide-down btn-style">

                                        <span> Oxumuşam</span>
                                    </button>
                                    <button className="btnn  hover-filled-slide-down btn-style">
                                        <span> Favorilərə əlavə et <BsHeartFill /></span>
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="detail-info-box row">
                            <div className="detail-actions">
                                <LuShare2 size={20} className='share' onClick={() => setShowShareModal(true)} />
                                <FaRegHeart className='fav' size={20} />
                            </div>
                            <div className="col-lg-6">
                                <div className="desc">
                                    <p>Description</p>
                                    <p>{selected.description}</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <p className="genre">Genre:{selected.genre}</p>
                                <div className="category">Category:{selected.category}</div>
                                <p className="lang">Lang:{selected.lang}</p>
                                <p className="publishedDate">
                                    Published Date: {formatDate(selected.publishedDate)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
        </>
    );
};

export default Details;


