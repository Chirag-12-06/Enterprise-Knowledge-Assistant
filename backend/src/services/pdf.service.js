const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractText(filePath) {
    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    return {
        text: data.text,
        pages: data.numpages,
        info: data.info,
    };
}

module.exports = {
    extractText,
};