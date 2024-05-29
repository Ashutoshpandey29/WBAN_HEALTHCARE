import React from 'react';
import style from '../css/style.module.css';

export default function Carousel() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom : "4%"
          }}
        >
          <img
            src="wban.png"
            style={{ width: "93%", margin: "0 auto", borderRadius: "10px" }}
            alt=""
          />
        </div>

        <div
          id="carouselExampleCaptions"
          className="carousel slide container-fluid my-5"
          data-bs-ride="stop"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className={`active ${style.slider_btn}`}
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              className={`${style.slider_btn}`}
              aria-label="Slide 2"
            ></button>
            {/* <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className={`${style.slider_btn}`} aria-label="Slide 3"></button> */}
            {/* <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" className={`${style.slider_btn}`} aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" className={`${style.slider_btn}`} aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" className={`${style.slider_btn}`} aria-label="Slide 6"></button> */}
          </div>
          <div className="carousel-inner mx-auto">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_left}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card1.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">WBAN</h5>
                      <p className="card-text">
                        Wireless Body Area Network (WBAN) is a network of
                        wearable or implantable sensors that are attached to, or
                        implanted within, the human body.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card2.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Diagnosis</h5>
                      <p className="card-text">
                        Quick diagnosis using WBAN sensors , using cutting edge technology.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card3.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Privacy Protection</h5>
                      <p className="card-text">
                        Strives to protect and keep users' medical history , conditions and location completely private using encryption.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card4.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">MSP Selection</h5>
                      <p className="card-text">
                        User can avail medical service to to most fitting and close medical service provider at their fingertips.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_left}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card5.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Emergency Checkups</h5>
                      <p className="card-text">
                        User directed to most appropriate MSP in case of emergency conditions using advanced algorithms.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card6.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Medical Checkups</h5>
                      <p className="card-text">
                        Assigned users' location send to MSP, allowing them to perform check ups at the earliest cinvinience of the user.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card1.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card 7</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-md-4 col-lg-3 col-sm-6">
                  <div
                    className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`}
                    style={{ width: "75%", height: "92%" }}
                  >
                    <img
                      src="card2.jpg"
                      className={`card-img-top d-block ${style.carousel_img}`}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card 8</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a href="#" className="btn btn-primary">
                        View More
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* <div className="carousel-item">
                        <div className='row'>
                            <div className="col-md-6 col-lg-6 col-sm-6">
                                <div className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_left}`} style={{ width: '60%', height: '97%' }}>
                                    <img src="card3.jpg" className={`card-img-top d-block ${style.carousel_img}`} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card 3</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">View More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-6">
                                <div className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`} style={{ width: '60%', height: '97%' }}>
                                    <img src="card4.jpg" className={`card-img-top d-block ${style.carousel_img}`} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card 4</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">View More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

            {/* <div className="carousel-item">
                        <div className='row'>
                            <div className="col-md-6 col-lg-6 col-sm-6">
                                <div className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_left}`} style={{ width: '60%', height: '97%' }}>
                                    <img src="card5.jpg" className={`card-img-top d-block ${style.carousel_img}`} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card 5</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">View More</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-6">
                                <div className={`card mb-3 mx-auto ${style.carousel_card} ${style.carousel_card_right}`} style={{ width: '60%', height: '97%' }}>
                                    <img src="card6.jpg" className={`card-img-top d-block ${style.carousel_img}`} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card 6</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">View More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="carousel-item">
                        
                    </div>
                    <div className="carousel-item">
                        
                    </div>
                    <div className="carousel-item">
                        
                    </div> */}
          </div>
          <button
            className={`carousel-control-prev my-auto mx-1 ${style.carousel_btn}`}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className={`carousel-control-next my-auto ${style.carousel_btn}`}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
}