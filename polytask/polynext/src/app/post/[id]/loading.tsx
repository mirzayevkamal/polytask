export default function Loading() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
      <div className="text-center animate-pulse shadow-2xl w-[80%] h-[50%] flex flex-col items-center justify-center gap-4 p-4 rounded-[50px] bg-[#034f84]">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-[#fff] animate-spin absolute"></div>
      </div>
    </div>
  );
}
