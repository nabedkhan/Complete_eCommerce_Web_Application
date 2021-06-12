import React from 'react';

const Heading = ({ title }) => (
    <div className="col-md-12">
        <div className="jumbotron py-4 mt-2">
            <h1 className="mb-0 text-center display-3">{title}</h1>
        </div>
    </div>
);

export default Heading;
