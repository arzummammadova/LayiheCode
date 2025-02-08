import React from 'react'
import Title from '../title/Title'
import './books.scss'
import pridebook from "../../assets/images/pridebook.png"
import { Link } from 'react-router-dom'
const Books = () => {
    return (
        <div>
            <div className="container">
                <Title>
                    <div className="row p-1 mt-4">
                        <div className="col-6">
                            <div className="title-l d-lg-block ">
                                This week's most popular books
                            </div>
                        </div>

                        <div className="col-6 " style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Link to='/' className="mainbtn">
                                Explore more
                            </Link>
                        </div>


                    </div>

                </Title>


                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">

                        <div className="box">
                            <div className="box-top row">
                                <div className="  col-8 box-left">
                                    <img src={pridebook} alt="" />

                                </div>
                                <div className="col-4 box-right">
                                    <p>   name:Pride and Prejudice</p>
                                    <p className="autorname">
                                        Jane Austen
                                    </p>

                                    <p className="price">
                                        $ 22.55
                                    </p>


                                </div>
                            </div>

                            <div className="box-bottom mt-5">
                                <button>Add to read +</button>
                            </div>


                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">

                        <div className="box">
                            <div className="box-top row">
                                <div className="  col-8 box-left">
                                    <img src={pridebook} alt="" />

                                </div>
                                <div className="col-4 box-right">
                                    <p>   name:Pride and Prejudice</p>
                                    <p className="autorname">
                                        Jane Austen
                                    </p>

                                    <p className="price">
                                        $ 22.55
                                    </p>


                                </div>
                            </div>

                            <div className="box-bottom mt-5">
                                <button>Add to read +</button>
                            </div>


                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">

                        <div className="box">
                            <div className="box-top row">
                                <div className="  col-8 box-left">
                                    <img src={pridebook} alt="" />

                                </div>
                                <div className="col-4 box-right">
                                    <p>   name:Pride and Prejudice</p>
                                    <p className="autorname">
                                        Jane Austen
                                    </p>

                                    <p className="price">
                                        $ 22.55
                                    </p>


                                </div>
                            </div>

                            <div className="box-bottom mt-5">
                                <button>Add to read +</button>
                            </div>


                        </div>

                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">

                        <div className="box">
                            <div className="box-top row">
                                <div className="  col-8 box-left">
                                    <img src={pridebook} alt="" />

                                </div>
                                <div className="col-4 box-right">
                                    <p>   name:Pride and Prejudice</p>
                                    <p className="autorname">
                                        Jane Austen
                                    </p>

                                    <p className="price">
                                        $ 22.55
                                    </p>


                                </div>
                            </div>

                            <div className="box-bottom mt-5">
                                <button>Add to read +</button>
                            </div>


                        </div>

                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">

                        <div className="box">
                            <div className="box-top row">
                                <div className="  col-8 box-left">
                                    <img src={pridebook} alt="" />

                                </div>
                                <div className="col-4 box-right">
                                    <p>   name:Pride and Prejudice</p>
                                    <p className="autorname">
                                        Jane Austen
                                    </p>

                                    <p className="price">
                                        $ 22.55
                                    </p>


                                </div>
                            </div>

                            <div className="box-bottom mt-5">
                                <button>Add to read +</button>
                            </div>


                        </div>

                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">

                        <div className="box">
                            <div className="box-top row">
                                <div className="  col-8 box-left">
                                    <img src={pridebook} alt="" />

                                </div>
                                <div className="col-4 box-right">
                                    <p>   name:Pride and Prejudice</p>
                                    <p className="autorname">
                                        Jane Austen
                                    </p>

                                    <p className="price">
                                        $ 22.55
                                    </p>


                                </div>
                            </div>

                            <div className="box-bottom mt-5">
                                <button>Add to read +</button>
                            </div>


                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Books
