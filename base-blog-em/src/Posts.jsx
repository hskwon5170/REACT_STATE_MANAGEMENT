import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
// 이 useQuery는 서버에서 데이터를 가져올 때 사용할 훅이다.
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    // "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=10""
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  // 1페이지부터 시작이므로
  const [selectedPost, setSelectedPost] = useState(null);
  // replace with useQuery -> 반환 객체에서 useQuery로 데이터 속성을 구조 분해 할당 한다.
  // useQuery는 다양한 속성을 가진 개체를 반환한다.
  // useQuery가 가지는 인수
  // 1. 쿼리 키 = 쿼리 이름
  // 2. 쿼리 함수 = 쿼리에 대한 데이터를 가져오는 방식 (데이터를 가져오는 비동기 함수)
  // 이제 우리가 매핑 할 데이터는 fetchPosts 에서 반환 된 데이터가 되고 => 위 HTTP 요청에서 반환 된 JSON이 될 것
  // 3. 옵션 : staleTime (데이터 만료 시간) => 데이터가 만료되어야만 리패치된다.
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(
        ["posts", nextPage],
        () => fetchPosts(nextPage)
        // 다음페이지 prefetching (useQuery와 동일하게 쿼리키, 함수 작성)
      );
    }
  }, [currentPage, queryClient]);
  // 의존성 배열에 currentPage를 넣어 현재 페이지가 변경될 때마다 함수 실행하기

  // fetchPost는 비동기 방식. fetchPost의 데이터가 반환되지 않을 경우 데이터에 할당할 항목을 알수없음
  const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000, // staleTime은 리페칭을 위한 것, 디폴트값은 0임
      keepPreviousData: true,
    }
  );
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
          // map은 배열 전용이기 때문에 현재 데이터가 정의 되지 않았다고 나올 것
          // => fetchPosts 가 비동기적이기 때문에, 해결될 때 까지 useQuery에서 정의되지 못한다.
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
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage(prev => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage(prev => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
