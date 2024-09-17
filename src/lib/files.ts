// To install the required packages, run the following command:
// pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner @aws-sdk/lib-storage @aws-sdk/s3-presigned-post

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
});

export async function getDownloadUrl(objectName: string) {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: objectName,
    }),
    { expiresIn: 3600 }
  );
}

export async function uploadFileToBucket(file: File, filename: string) {
  const Key = filename;
  const Bucket = process.env.CLOUDFLARE_BUCKET_NAME;

  let res;

  try {
    const parallelUploads = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key,
        Body: file.stream(),
        ACL: "public-read",
        ContentType: file.type,
      },
      queueSize: 4,
      leavePartsOnError: false,
    });

    res = await parallelUploads.done();
  } catch (e) {
    throw e;
  }

  return res;
}

export async function getPublicFileUrl(filepath: string) {
  return `${process.env.CLOUDFLARE_PUBLIC_LINK}${filepath}`;
}

export async function getPresignedPostUrl(
  objectName: string,
  contentType: string
) {
  return await createPresignedPost(s3Client, {
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME as string,
    Key: objectName,
    // Conditions: [
    //   ["content-length-range", 0, 1024 * 1024 * 2],
    //   ["starts-with", "$Content-Type", contentType],
    // ],
    Expires: 600, // 10 minutes
    // Fields: {
    //   // acl: "public-read",
    //   "Content-Type": contentType,
    // },
  });
}

export async function getFileUrl({ key }: { key: string }) {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 3600 }
  );
  return url;
}
