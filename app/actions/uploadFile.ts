// 'use server';

// import { S3Client } from "@aws-sdk/client-s3";
// import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
// import { nanoid } from "nanoid";
// import axios from 'axios';

// export async function onSubmit(formData: FormData) {
//     try {
//         const client = new S3Client({
//             region: process.env.AWS_REGION,
//         });

//         const file = formData.get('file');
//         if (!(file instanceof File)) {
//             console.error('No valid file found in FormData');
//             return;
//         }

//         const fileExtension = file.name.split('.').pop(); // Get the file extension
//         const key = `${nanoid()}.${fileExtension}`; // Append the extension to the key

//         const { url, fields } = await createPresignedPost(client, {
//             Bucket: process.env.AWS_BUCKET_NAME || '',
//             Key: key,
//             // Optionally, specify conditions like Content-Type
//             Conditions: [
//                 ["content-length-range", 0, 10485760], // Example: limit to 10 MB
//                 { "acl": "public-read" }, // Set ACL if needed
//             ],
//         });

//         const formDataS3 = new FormData();
//         Object.entries(fields).forEach(([key, value]) => {
//             formDataS3.append(key, value);
//         });

//         formDataS3.append('file', file);

//         // Use Axios to send the POST request
//         const uploadResponse = await axios.post(url, formDataS3, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         if (uploadResponse.status === 200) {
//             console.log('File uploaded successfully');
//             const uploadedUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; // Construct the public URL
//             return uploadedUrl; // Return the URL for further use
//         } else {
//             console.error('Failed to upload file');
//             console.error('Response:', uploadResponse.data);
//         }
//     } catch (err) {
//         console.error('Error:', err);
//     }
// }
'use server';

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";
import axios from 'axios';

export async function onSubmit(formData: FormData) {
    try {
        const client = new S3Client({
            region: process.env.AWS_REGION,
        });

        const file = formData.get('file');
        if (!file || typeof file === 'string') {
            console.error('No valid file found in FormData');
            return;
        }

        const fileExtension = file.name.split('.').pop(); // Get the file extension
        const key = `${nanoid()}.${fileExtension}`; // Append the extension to the key

        // Get MIME type (content type)
        const contentType = file.type;

        // Presigned Post request with Content-Type set
        const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: key,
            Conditions: [
                ["starts-with", "$Content-Type", contentType] // Restrict to correct MIME type
            ],
            Fields: {
                "Content-Type": contentType
            }
        });

        const formDataS3 = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value);
        });

        formDataS3.append('file', file);

        // Use Axios to send the POST request to S3
        const uploadResponse = await axios.post(url, formDataS3, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(uploadResponse.status);
        console.log(uploadResponse.data);

        if (uploadResponse.status === 204) {
            console.log('File uploaded successfully');
            const uploadedUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`; // Construct public URL
            console.log("url -> ", uploadedUrl);
            return uploadedUrl; // Return the URL for use in image/video tags
        } else {
            console.error('Failed to upload file');
            console.error('Response:', uploadResponse.data);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}
