import { useQuery, useMutation } from "react-query";
async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  // 쿼리키가 의존성배열 역할을 함!, commentssssss 이름의 post.id가 바뀌면 리렌더링한다
  const { data, isError, error, isLoading } = useQuery(
    ["commentsssssss", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation(postId => deletePost(postId));

  if (isLoading) return <h3>로딩중입니다. 잠시만 기다려주세요</h3>;
  if (isError)
    return (
      <div>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </div>
    );
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>포스트가 삭제되었습니다!</p>
      )}
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map(comment => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
