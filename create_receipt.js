var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

// open the PDF in a new window
 pdfMake.createPdf(docDefinition).open();

 // print the PDF
 pdfMake.createPdf(docDefinition).print();

 // download the PDF
 pdfMake.createPdf(docDefinition).download('optionalName.pdf');