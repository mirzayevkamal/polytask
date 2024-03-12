import ky from "ky";
import PostItem from "../components/PostItem";
import { Post } from "../models/Post";

async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return res.json();
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      <div className="flex w-[100%] h-[100vh] items-center overflow-auto">
        {posts.map((post: Post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </>
  );
}
