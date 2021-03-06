/**
 * @module Loading
 */
import React from 'react';

/**
 * Component for showing loader.
 */
export const Loading = () => {
    return (
        <div className="col-12 loader">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading...</p>
        </div>
    );
};
