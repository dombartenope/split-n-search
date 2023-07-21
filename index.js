const fs = require('fs');
const readline = require('readline');
const path = require('path');

//DECLARE MAX # OF ROWS PER CSV OUTPUT
const maxRows = 1000000;

const SEARCH_FOR = "";

async function splitFile(filename) {
    let fileCount = 0;
    let rowCount = 0;
    let writeStream = fs.createWriteStream(path.basename(filename, '.csv') + '0.csv');

    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (rowCount === maxRows) {
            writeStream.end();
            fileCount++;
            rowCount = 0;
            writeStream = fs.createWriteStream(path.basename(filename, '.csv') + fileCount + '.csv');
        }

        writeStream.write(line + '\n');
        rowCount++;
    }

    writeStream.end();

    return fileCount;
}

async function processFile(filename, writeStream) {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const values = line.split(',');
        if (values.some(value => value === SEARCH_FOR)) {
            writeStream.write(line + '\n');
        }
    }
}

(async function() {
    const numFiles = await splitFile('in.csv');

    const writeStream = fs.createWriteStream('out.csv');

    for(let i = 0; i <= numFiles; i++) {
        await processFile(`in${i}.csv`, writeStream);
    }

    writeStream.end();
})();
