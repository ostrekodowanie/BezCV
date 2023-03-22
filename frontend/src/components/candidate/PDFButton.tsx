import { MouseEvent } from "react";
import { pdf } from "../../assets/candidate/candidate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type PDFButtonProps = {
  disabled: boolean;
  gradient: string;
  fileName: string;
};

const PDFButton = ({ disabled, gradient, fileName }: PDFButtonProps) => {
  const handlePDF = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const input = document.getElementById("candidate-profile");
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${fileName}.pdf`);
    });
  };

  return (
    <div className="flex items-center gap-4 ml-[8vw] sm:ml-0">
      <button
        type="button"
        onClick={handlePDF}
        style={{
          backgroundImage: !disabled
            ? gradient
            : "linear-gradient(180deg, #7C9D8E 0%, #91B49F 100%)",
        }}
        disabled={disabled}
        className="rounded-full w-max hover:scale-[1.02] transition-transform justify-center text-white text-[.8rem] font-semibold flex items-center py-4 px-10"
      >
        Pobierz profil w formacie PDF{" "}
        <img className="max-h-[1.4em] ml-2" src={pdf} alt="" />
      </button>
    </div>
  );
};

export default PDFButton;
