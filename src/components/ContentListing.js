import React, { useState, useEffect, useCallback } from 'react';
import { fetchPageData, fetchImage } from '../api'; // Import your API functions
import Header from './Header';
import '../styles/ContentListing.css';
import placeholderImage from '../images/defaultimage.png';

const ContentListing = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); // State to track initial load
    const [imageLoadError, setImageLoadError] = useState({}); // State to track image loading errors
    const [title, setTitle] = useState(''); // State to store the title

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false); // Mark initial load as false
            return;
        }

        loadMoreData();
    }, [initialLoad]);

    const loadMoreData = useCallback(() => {
        if (loading || error) return; // Don't load if already loading or if there was an error

        setLoading(true);
        fetchPageData(page)
            .then(response => {
                setData(prevData => [...prevData, ...response.data.page['content-items'].content]);
                setPage(prevPage => prevPage + 1);
                setTitle(response.data.page.title);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading more data:', error);
                setError(true);
                setLoading(false);
            });
    }, [page, loading, error]);

    const handleScroll = useCallback(() => {
        if (loading || error) return;

        // Check if the user has scrolled to the bottom of the page
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 200) {            
            loadMoreData();
        }
    }, [loading, error, loadMoreData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleImageError = (itemId, e) => {
        if (!imageLoadError[itemId]) {
            e.target.src = placeholderImage;            
        }
    };

    return (
        <div className="content-listing">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} title={title} loadMoreData={loadMoreData} />
            <div className="grid">
                {filteredData.map((item, index) => (
                    <div className="grid-item" key={index}>
                        <img
                            src={fetchImage(item['poster-image'])}
                            alt={item.name}
                            onError={(e) => handleImageError(item.id, e)} // Handle image loading error
                            className={imageLoadError[item.id] ? 'error-image' : ''}
                        />
                        <div className="item-name">{item.name}</div>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ContentListing;
