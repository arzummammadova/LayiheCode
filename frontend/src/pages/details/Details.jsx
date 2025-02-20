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
import Swal from "sweetalert2";
import { addtoRead, addtoreaded, deleteFromToRead } from '../../redux/features/userSlice';
import { ToastContainer ,toast} from 'react-toastify';
import Comment from '../../components/comment/Comment';
import Recomendationbook from '../../components/recomendationbooks/Recomendationbook';
import Chat from '../../components/chat/Chat';
const Details = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showShareModal, setShowShareModal] = useState(false); 
  const userId = useSelector((state) => state.auth.user?._id);
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


    //!funskiyalar
      const handleAddToRead = (bookId) => {
            if (!userId) {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please log in to add books to your 'to-read' list",
                    confirmButtonColor: "#ff0000"
                });
            }
            dispatch(addtoRead({ userId, bookId }));
            Swal.fire({
                icon: "success",
                title: "Added!",
                text: "Successfully added to Read Later!",
                confirmButtonColor: "#00c851"
            });
        };
  const handleAddToReaded = (userId, bookId) => {
        if (!userId) {
            return toast.error("Zəhmət olmasa, oxundu kimi işarələmək üçün daxil olun.");
        }
        dispatch(addtoreaded({ userId, bookId })).then(() => {
            dispatch(deleteFromToRead({ userId, bookId }));
            toast.success("Kitab oxundu kimi işarələndi!");
        });
    };
    
    
    return (
        <>
            <section id='detail'>
                <ToastContainer/>
                <Chat/>
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
                                    <button  onClick={(e) => { e.stopPropagation(); handleAddToRead(selected._id); }} className="btnn  hover-filled-slide-down btn-style">
                                        <span>Oxumağa əlavə et</span>
                                    </button>
                                    <button  onClick={() => handleAddToReaded(userId,selected._id)} className="btnn  hover-filled-slide-down btn-style">

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


                     <Comment productID = {selected._id}/>

                     <Recomendationbook genre={selected.genre} excludeId={selected._id} />
                     


                    </div>
                </div>
            </section>

            {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
        </>
    );
};

export default Details;


