import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadProducts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
    const data = await res.json();
    setProducts([...products, ...data]);
    setPage(page + 1);
    if (data.length === 0) setHasMore(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={loadProducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>Album ID: {product.albumId}</p>
          <img src={product.thumbnailUrl} alt={product.title} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default ProductList;
