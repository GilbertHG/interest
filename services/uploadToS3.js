// upload-to-s3.js

import AWS from './aws-config';

const s3 = new AWS.S3();

const uploadFile = async (fileName, fileContent) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileContent,
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully. Location:', data.Location);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export default uploadFile;
