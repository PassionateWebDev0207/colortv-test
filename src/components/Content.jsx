import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message } from 'antd';
import axios from '../utils/axios';
import { selected } from '../actions';

const UnsplashImage = ({ url }) => (
  <div className="image-item">
    <img src={url} alt="unsplash img" />
  </div>
);

const Content = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loaded, setIsLoaded] = useState(true);
  const username = useSelector(state => state.user.username);
  const total_photos = useSelector(state => state.user.total_photos);
  const selectedNewUser = useSelector(state => state.selected);

  const fetchImages = useCallback(() => {
    console.log(selectedNewUser, username);
    if (selectedNewUser) {
      dispatch(selected(false));
      if (total_photos === 0) {
        setImages([]);
        message.info('No Images');
      } else {
        setImages([]);
        setIsLoaded(false);
        
        axios.get(`/users/${username}/photos`, {
          params: {
            client_id: process.env.REACT_APP_ACCESS_KEY,
            client_secret: process.env.REACT_APP_SECRET_KEY,
            page: 1,
            per_page: 30,
          }
        })
        .then(res => {
          setImages(res.data);
          setIsLoaded(true);
        })
        .catch(err => {
          setImages([]);
          setIsLoaded(true);
          message.error(`An error occurred while fetching images: ${err.message}`);
        });
      }
    }
  }, [selectedNewUser, total_photos, username, dispatch]);

  useEffect(() => {  
    fetchImages();
  }, [ fetchImages ]);

  return (
    <div className="content">
      <div className="image-grid">
        {loaded
          ? images.map((image, index) => (
              <UnsplashImage
                url={image.urls.regular}
                key={index}
              />
            ))
          : <div className="loading"><Spin /></div>}
      </div>
    </div>
  );
};

export default Content;