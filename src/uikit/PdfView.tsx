import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  file: string;
};
const PdfView = ({ file }: Props) => {
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line
  const [pageNumber, setPageNumber] = useState<any>(1);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPage }: any) {
    setNumPages(numPage);
    setIsLoading(false);
  }
  const changePage = (event: any) => {
    setPageNumber({ pageNumber: event.target.pageNumber });
  };
  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (_el, index) => (
        <button
          key={'button' + index}
          type="button"
          onClick={changePage}
          style={{ padding: 16, display: 'grid', margin: 16 }}
        >
          <Page scale={1.7} key={`page_${index + 1}`} pageNumber={index + 1} />
        </button>
      ))}
    </Document>
  );
};

export default PdfView;
