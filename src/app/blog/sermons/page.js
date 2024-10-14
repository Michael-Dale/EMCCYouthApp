


import PdfThumbnail from "../../components/PdfThumbnail";

export default function MyPdfPage() {
  return (
    <div className="flex flex-col items-center p-4">
      <PdfThumbnail
        pdfUrl="/docs/Beginners Guide Coding.pdf"  // Replace with your actual PDF path
        title="Sample PDF 1"
        imgSrc="/pics/img.jpg" 
      />
      <PdfThumbnail
        pdfUrl="/docs/jonathanSchaeffer checkers-7038.pdf"
        title="Sample PDF 2"
        imgSrc="/pics/img.jpg" 
      />
    </div>
  );
}
