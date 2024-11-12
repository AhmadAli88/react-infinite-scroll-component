import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const MediaGallery = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadImages = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
    const data = await res.json();
    setImages([...images, ...data]);
    setPage(page + 1);
    if (data.length === 0) setHasMore(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={loadImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="gallery">
        {images.map((image) => (
          <img key={image.id} src={image.url} alt="gallery" />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MediaGallery;
