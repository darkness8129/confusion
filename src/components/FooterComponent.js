/**
 * @module Footer
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for rendering footer.
 */
const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row row-content justify-content-center">
                    <div className="col-12 col-sm-4">
                        <h5 className="text-center">Our Address</h5>
                        <address>
                            <div>
                                121, Clear Water Bay Road
                                <br />
                                Clear Water Bay, Kowloon
                                <br />
                                HONG KONG
                            </div>
                            <div>
                                <i className="fa fa-phone"></i>: +852 1234 5678
                                <br />
                                <i className="fa fa-fax"></i>: +852 8765 4321
                            </div>
                        </address>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="social-block">
                            <a
                                className="btn-google social-icon"
                                href="http://google.com/+"
                            >
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a
                                className="btn-facebook social-icon"
                                href="http://www.facebook.com/profile.php?id="
                            >
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a
                                className="btn-linkedin social-icon"
                                href="http://www.linkedin.com/in/"
                            >
                                <i className="fa fa-linkedin"></i>
                            </a>
                            <a
                                className="btn-twitter social-icon"
                                href="http://twitter.com/"
                            >
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a
                                className="btn-google social-icon"
                                href="http://youtube.com/"
                            >
                                <i className="fa fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2020 Ristorante ConFusion</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
