import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LiveScores = () => {
  const [scores, setScores] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadScores = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`);
    const data = await res.json();
    setScores([...scores, ...data]);
    setPage(page + 1);
    if (data.length === 0) setHasMore(false);
  };

  useEffect(() => {
    loadScores();
  }, []);

  return (
    <InfiniteScroll
      dataLength={scores.length}
      next={loadScores}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {scores.map((score) => (
        <div key={score.id}>
          <p>{score.name}: {score.body}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default LiveScores;
