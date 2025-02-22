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
import { addAndRemoveFav, addtoRead, addtoreaded, deleteFromToRead } from '../../redux/features/userSlice';
import { ToastContainer ,toast} from 'react-toastify';
import Comment from '../../components/comment/Comment';
import Recomendationbook from '../../components/recomendationbooks/Recomendationbook';
import Chat from '../../components/chat/Chat';
import { CiHeart } from "react-icons/ci";
import { IoHeartCircle } from "react-icons/io5";
const Details = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showShareModal, setShowShareModal] = useState(false); 
    const favorites = useSelector((state) => state.auth.favorites) || [];
    const [isFavorite, setIsFavorite] = useState(false);
  const userId = useSelector((state) => state.auth.user?._id);
    useEffect(() => {
        dispatch(fetchProduct()).finally(() => setLoading(false));
        window.scrollTo(0, 0);
    }, [dispatch]);

    useEffect(() => {
        if (selected && favorites.length > 0) {
            const isFav = favorites.some(fav => fav._id === selected._id);
            setIsFavorite(isFav);
        }
    }, [favorites, selected]);

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
                confirmButtonColor: "#ff0000",
            });
        }
        dispatch(addtoRead({ userId, bookId }))
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Added!",
                    text: "Successfully added to Read Later!",
                    confirmButtonColor: "#00c851",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Already have Read Later page",
                    confirmButtonColor: "#ff0000",
                });
            });
    };



    const handleAddToReaded = (userId, bookId) => {
        if (!userId) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Zəhmət olmasa, oxundu kimi işarələmək üçün daxil olun.",
                confirmButtonColor: "#ff0000",
            });
        }
        dispatch(addtoreaded({ userId, bookId }))
            .then(() => {
                dispatch(deleteFromToRead({ userId, bookId }));
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Kitab oxundu kimi işarələndi!",
                    confirmButtonColor: "#00c851",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Kitab oxundu kimi işarələnərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.",
                    confirmButtonColor: "#ff0000",
                });
            });
    };
    
    const handleToggleFavorite = async (bookId) => {
        if (!userId) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please log in to manage favorites",
                confirmButtonColor: "#ff0000",
            });
            return;
        }
    
        try {
            const result = await dispatch(addAndRemoveFav({ userId, bookId })).unwrap();
            setIsFavorite(!isFavorite); // Toggle the isFavorite state
            Swal.fire({
                icon: isFavorite ? "warning" : "success",
                title: isFavorite ? "Removed!" : "Added!",
                text: isFavorite ? "Removed from favorites." : "Added to favorites!",
                confirmButtonColor: isFavorite ? "#ffa500" : "#00c851",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update favorites. Please try again.",
                confirmButtonColor: "#ff0000",
            });
        }
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
                                    {/* <p className="price">Dil:{selected.lang} </p> */}
                                    {/* <div className="info">
                                        <img style={{ width: "27px", height: "30px" }} src={count} alt="" /> 100k+</div> */}
                                    <p className="author">{selected.author}</p>
                                </div>
                                <div className="detail-actions ">
                                    <button  onClick={(e) => { e.stopPropagation(); handleAddToRead(selected._id); }} className="btnn  hover-filled-slide-down btn-style">
                                        <span>Oxumağa əlavə et</span>
                                    </button>
                                    <button  onClick={() => handleAddToReaded(userId,selected._id)} className="btnn  hover-filled-slide-down btn-style">

                                        <span> Oxumuşam</span>
                                    </button>
{/*                                 
                                    <button className="btnn  hover-filled-slide-down btn-style">
                                        <span> Favorilərə əlavə et <BsHeartFill /></span>
                                    </button> */}

                                </div>
                            </div>
                        </div>
                        <div className="detail-info-box row">
                            <div className="detail-actions">
                                <LuShare2 size={25} className='share' onClick={() => setShowShareModal(true)} />
                                {isFavorite ? (
                                      <IoHeartCircle
                                      size={30}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleFavorite(selected._id);
                                        }}
                                        className="fav"
                                        style={{ color: "red" }}
                                      />
                                    ) : (
                                        <FaRegHeart
                                      size={25}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleFavorite(selected._id);
                                        }}
                                        className="fav"
                                      />
                                    )}
                                   
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


