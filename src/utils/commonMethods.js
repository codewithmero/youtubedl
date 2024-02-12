import fs from "fs";

const fileSizeCalc = function(localFilePath) {
    let stats = fs.statSync(localFilePath);
    let fileSizeInBytes = stats.size;
    let fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    return fileSizeInMB;
}

export { fileSizeCalc };