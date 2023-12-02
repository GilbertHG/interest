import {connectToFilecoin} from "@/serviceClients/filecoin";
import {filesFromPaths} from "files-from-path";

const uploadFile = async (fileName, fileContent) => {
    try {
        const client = await connectToFilecoin();

        // lets go!
        const files = await filesFromPaths(fileName);
        const cid = await client.uploadDirectory(fileContent)
        console.log('File uploaded successfully. cid:', cid);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export default uploadFile;