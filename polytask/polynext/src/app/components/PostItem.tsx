import Link from "next/link";
import { Post } from "../models/Post";

const PostItem = ({ body, id, title }: Post) => {
  return (
    <Link
      prefetch={true}
      href={`/post/${id}`}
      className="rounded drop-shadow-lg hover:transform hover:scale-105 transition-all bg-[#034f84] p-2 m-2 min-w-[200px] h-[150px] flex flex-col"
    >
      <span className="font-bold text-white text-[14px]">{title.slice(0, 40)}...</span>
      <span className="font-light text-white text-[10px] mt-2">
        {body.slice(0, 120)}...
      </span>
    </Link>
  );
};

export default PostItem;
