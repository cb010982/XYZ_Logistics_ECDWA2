import React, { useState, useEffect } from 'react';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { configureAwsCredentials } from './awsCredentials';

const REGION = 'us-east-1';
const BUCKET_NAME = 'xyz-logistics';
const FOLDER_PREFIX = 'uploads';

export default function UploadAndList() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [userSub, setUserSub] = useState('');
  const [s3Client, setS3Client] = useState(null);

  const setup = async () => {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) return alert("Not authenticated");
  
    const { credentials } = await configureAwsCredentials(idToken);
    const s3 = new S3Client({ region: REGION, credentials });
    setS3Client(s3);
  
    const payload = JSON.parse(atob(idToken.split('.')[1]));
    console.log("✅ Using sub as folder:", payload.sub);
    setUserSub(payload.sub);
  };
  
  useEffect(() => {
    setup(); // 👈 THIS CALLS THE FUNCTION ONCE WHEN COMPONENT LOADS
  }, []);
  

  const handleUpload = async () => {
    if (!file || !s3Client || !userSub) return alert("Setup incomplete");
    console.log("🪪 idToken:", localStorage.getItem("idToken"));
    console.log("📦 AWS Credentials:", s3Client.config.credentials);
    
    const uploadKey = `${FOLDER_PREFIX}/${userSub}/${file.name}`;
    console.log("Uploading to:", uploadKey);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uploadKey,
      Body: await file.arrayBuffer(),
      ContentType: file.type,
    });

    try {
      await s3Client.send(command);
      alert("✅ Upload successful!");
      setFile(null);
      listFiles(); // Refresh
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed");
    }
  };

  const listFiles = async () => {
    if (!s3Client || !userSub) return;

    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `${FOLDER_PREFIX}/${userSub}/`,
    });

    try {
      const response = await s3Client.send(command);
      setFiles(response.Contents || []);
    } catch (err) {
      console.error("List error:", err);
      alert("❌ Could not list files");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>

      <hr />

      <h3>Your Files</h3>
      <button onClick={listFiles}>Refresh List</button>
      <ul>
        {files.map(f => (
          <li key={f.Key}>
            <a
              href={`https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${f.Key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {f.Key.split('/').pop()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
