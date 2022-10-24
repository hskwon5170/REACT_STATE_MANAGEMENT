import { useState } from "react";
import { useQuery } from "react-query";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  // fetchPost는 비동기 방식. fetchPost의 데이터가 반환되지 않을 경우 데이터에 할당할 항목을 알수없음
  const { data, isError, error, isLoading } = useQuery("post", fetchPosts, {
    staleTime: 2000, // staleTime은 리페칭을 위한 것, 디폴트값은 0임
  });
  // Loading이 모두 끝나면 isLoading은 false로 바뀌고 본문이 보여지게됨
  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <div>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </div>
    );

  // isFetching 비동기 쿼리가 해결되지 않았음을 의미함
  // isLoading 데이터를 가져오는 중이고, 캐싱된 데이터도 없음을 의미함
  return (
    <>
      <ul>
        {data.map(post => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
