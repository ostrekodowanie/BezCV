const ReportFormProgressBar = ({ formIndex }: { formIndex: number }) => {
  return (
    <div className="h-[4px] bg-[#0D9AE9]/20 w-full">
      <div
        className="h-full w-[calc(100%/6)] bg-primary transition-transform"
        style={{ transform: `translateX(${formIndex * 100}%)` }}
      />
    </div>
  );
};

export default ReportFormProgressBar;
