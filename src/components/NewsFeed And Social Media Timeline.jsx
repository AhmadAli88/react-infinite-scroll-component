import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    const data = await res.json();
    setPosts([...posts, ...data]);
    setPage(page + 1);
    if (data.length === 0) setHasMore(false); // Stop loading if no more posts
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default NewsFeed;
