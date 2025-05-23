import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { configureAwsCredentials } from './awsCredentials';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


const REGION = 'us-east-1';
const BUCKET_NAME = 'xyz-logistics';
const FOLDER_PREFIX = 'uploads';

export default function UploadAndList() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [userSub, setUserSub] = useState('');
  const [s3Client, setS3Client] = useState(null);
  const [idToken, setIdToken] = useState('');
  const [embedUrl, setEmbedUrl] = useState(null);
  const [uploadIds, setUploadIds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedUploaderSub, setSelectedUploaderSub] = useState('');
  useEffect(() => {
    setup().then(() => {
      handleViewAnalytics(); 
    });
  }, []);


  const setup = async () => {
    const token = localStorage.getItem('idToken');
    if (!token) return alert("Not authenticated");

    const { credentials } = await configureAwsCredentials(token);
    setIdToken(token);

    const s3 = new S3Client({ region: REGION, credentials });
    setS3Client(s3);

    const payload = JSON.parse(atob(token.split('.')[1]));
    setUserSub(payload.sub);

    const isAdmin = payload["cognito:groups"]?.includes("Admins");
    setIsAdmin(isAdmin);  

  };

  const handleUpload = async () => {
    if (!file || !s3Client || !userSub) return alert("Setup incomplete");

    const validExtensions = ['.xlsx'];
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(`.${fileExt}`)) {
      alert("Invalid file type. Only .xlsx files are allowed.");
      return;
    }

    const payload = JSON.parse(atob(idToken.split('.')[1]));
    const email = payload.email;
    const uploadKey = `${FOLDER_PREFIX}/${payload.sub}/${file.name}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uploadKey,
      Body: await file.arrayBuffer(),
      ContentType: file.type,
      Metadata: {
        uploader_email: email
      }
    });

    try {
      await s3Client.send(command);
      alert("Upload successful!");
      setFile(null);
      listFiles(); // Refresh
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };
const listFiles = async () => {
  if (!s3Client || !userSub) return;

  const prefix = isAdmin ? `${FOLDER_PREFIX}/` : `${FOLDER_PREFIX}/${userSub}/`;

  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });

  try {
    const response = await s3Client.send(command);
    const rawFiles = response.Contents || [];

    const actualFiles = rawFiles.filter(f => {
      const name = f.Key.split('/').pop();
      return name && !f.Key.endsWith('/') && name.includes('.');
    });

    const signedFiles = await Promise.all(
      actualFiles.map(async (f) => {
        const url = await getSignedUrl(
          s3Client,
          new GetObjectCommand({ Bucket: BUCKET_NAME, Key: f.Key }),
          { expiresIn: 3600 }
        );
        return {
          name: f.Key.split('/').pop(),
          url,
          uploaderSub: f.Key.split('/')[1]
        };
      })
    );

    setFiles(signedFiles);
  } catch (err) {
    console.error("List error:", err);
    alert("Could not list files");
  }
};

  const handleViewAnalytics = async () => {
    try {
      const token = localStorage.getItem('idToken');
  
      const response = await fetch(
        'https://wtiks3a623.execute-api.us-east-1.amazonaws.com/GetUploadIdsForUser',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include' // enables cookies + auth for CORS
        }
      );
  
      const data = await response.json();
      setUploadIds(data);
    } catch (error) {
      console.error("Error fetching Upload IDs:", error);
      alert("Failed to fetch your analytics");
    }
  };
  
  async function generateDashboard(uploadId, uploaderSubOverride = null) {
    try {
      const token = localStorage.getItem('idToken');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const companySub = uploaderSubOverride || payload.sub;  //  if admin, use passed override
  
      const res = await fetch(
        'https://wtiks3a623.execute-api.us-east-1.amazonaws.com/getDashboardUrl',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            companySub,
            uploadId
          })
        }
      );
  
      if (!res.ok) throw new Error('Failed to get dashboard URL');
  
      const { url } = await res.json();
      setEmbedUrl(url);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  
  const handleDelete = async (key) => {
    try {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }));
      alert("File deleted");
      listFiles();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete file");
    }
  };
    const groupedFiles = files.reduce((acc, file) => {
    if (!acc[file.uploaderSub]) acc[file.uploaderSub] = [];
    acc[file.uploaderSub].push(file);
    return acc;
  }, {});


  return (
    <div className="container my-5">
      <div className="card p-4 shadow">

        {!isAdmin && (
          <>
          <h2 className="mb-4">Upload Excel File</h2>

          <div className="input-group mb-3">
          <input
            type="file"
            accept=".xlsx"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />

            <button
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={!file}
            >
              Upload
            </button>
          </div>

          <hr />
        </>
      )}


        <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{isAdmin ? "All Uploaded Files" : "Your Files"}</h4>
          <button className="btn btn-success" onClick={listFiles}>
            Refresh List
          </button>
        </div>

            {files.length === 0 ? (
        <p className="text-muted">No files uploaded yet.</p>
      ) : isAdmin ? (
        Object.entries(groupedFiles).map(([uploader, uploaderFiles], idx) => (
          <div key={idx} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Company: {uploader}</h5>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => generateDashboard(null, uploader)}
              >
                View Full Summary
              </button>
            </div>
            <ul className="list-group">
            {uploaderFiles.map((f, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  {f.name}
                </a>
                <div>
              <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => {
                    console.log("Local file name:", f.name);
                    console.log("UploadIds returned from Lambda:", uploadIds.map(u => u.filename));

                    const matched = uploadIds.find(u => u.filename === f.name);
                    if (!matched) {
                      alert("Could not match file to UploadID. Dashboard cannot be shown.");
                      return;
                    }
                    generateDashboard(matched.uploadId, f.uploaderSub);
                  }}
                >
                  View Analytics
                </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(`${FOLDER_PREFIX}/${f.uploaderSub}/${f.name}`)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          </div>
        ))
      ) : (
        <ul className="list-group">
          {files.map((f, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                {f.name}
              </a>
              <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => {
                  console.log("Local file name:", f.name);
                  console.log("UploadIds returned from Lambda:", uploadIds.map(u => u.filename));

                  const matched = uploadIds.find(u => u.filename === f.name);
                  if (!matched) {
                    alert("Could not match file to UploadID. Dashboard cannot be shown.");
                    return;
                  }
                  generateDashboard(matched.uploadId);
                }}
              >
                View Analytics
              </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(`${FOLDER_PREFIX}/${userSub}/${f.name}`)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
        <div className="mt-4">
        </div>
        <div className="mt-4">
          <h4>Analytics Dashboard</h4>
          <button
            className="btn btn-warning mb-3"
            onClick={() => generateDashboard(null)} // null uploadId means "full summary"
          >
            View Full Analytics
          </button>
          {embedUrl && (
          <div className="alert alert-info mt-2">
            Dashboard ready —{' '}
            <a href={embedUrl}
              target="_blank"
              rel="noopener noreferrer">
              open in a new tab
            </a>{' '}
 
          </div>
        )}

        </div>

      </div>
    </div>
  );
}
