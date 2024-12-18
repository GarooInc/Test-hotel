"use client";

import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Componente para páginas individuales del FlipBook
const Pages = React.forwardRef((props, ref) => (
    <div className="demoPage w-full h-full" ref={ref} style={{ height: '100%', width: '100%' }}>
        {props.children}
    </div>
));

Pages.displayName = 'Pages';

const Flipbook = ({ pdf }) => {
    const [numPages, setNumPages] = useState(null);

    // Evento al cargar el documento con éxito
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col gap-5 justify-center items-center overflow-hidden w-full h-full">
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                {numPages && (
                    <HTMLFlipBook
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        width={400}
                        height={580}
                        className="w-full h-full"
                        showCover={true}
                    >
                        {[...Array(numPages).keys()].map((pNum) => (
                            <Pages key={pNum} number={pNum + 1}>
                                <Page
                                    pageNumber={pNum + 1}
                                    width={400} // Opcional: Remueve si quieres calcular dinámicamente
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                            </Pages>
                        ))}
                    </HTMLFlipBook>
                )}
            </Document>
        </div>
    );
};

export default Flipbook;