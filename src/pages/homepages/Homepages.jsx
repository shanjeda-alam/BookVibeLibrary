import React from 'react';
import Banner from '../../Banner/Banner';
import AllBooks from './AllBooks';

const Homepages = () => {
    return (
        <div>
            <Banner />
            <React.Suspense fallback={<p>Loading books...</p>}>
                <AllBooks />
            </React.Suspense>
        </div>
    );
};

export default Homepages;