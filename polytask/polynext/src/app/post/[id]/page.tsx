import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

async function getSinglePost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const postData = await getSinglePost(id);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
        <div className="relative text-center shadow-2xl w-[80%] h-[50%] flex flex-col items-center justify-center gap-4 p-4 rounded-[50px] bg-[#034f84]">
          <h1 className="text-3xl text-white">{postData.title}</h1>
          <p className="text-md text-white">{postData.body}</p>

          <div className="absolute top-[120%]">
            <Link
              style={{
                pointerEvents: parseInt(id) === 1 ? "none" : "auto",
              }}
              href={`/post/${parseInt(id) - 1 || 1}`}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Prev
            </Link>
            <Link
              href={`/post/${parseInt(id) + 1}`}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
