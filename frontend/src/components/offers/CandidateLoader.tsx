const CandidateLoader = () => {
  return (
    <div className="px-[8vw] sm:px-8 flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-[.8in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
            <div className="w-[1.2in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
          </div>
          <div className="w-[.6in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
        </div>
      </div>
      <div className="w-[1in] h-[2em] rounded-full bg-[#f8f8f8]" />
    </div>
  );
};

export default CandidateLoader;
