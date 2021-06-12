import React from 'react';

const Footer = () => (
    <div className="row mt-5">
        <div className="col-12">
            <div className="jumbotron py-3 mb-0">
                <h6 className="mb-0 text-center text-secondary">
                    All Rights Reserved By Nabed Khan &copy; {new Date().getFullYear()}
                </h6>
            </div>
        </div>
    </div>
);

export default Footer;
