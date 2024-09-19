import React, { useState } from 'react';
//import './ResumeUpload.css'; // For custom styling

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(''); // State for upload message

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    URL.revokeObjectURL(filePreview);
    document.getElementById('file-input').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a resume to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('name', 'Your Name'); // You may want to use a form field to get user’s name
    formData.append('email', 'user@example.com'); // Similarly, use form field for email

    try {
      const response = await fetch('http://localhost:4000/api/v1/resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadMessage('Resume uploaded successfully!');
        setSelectedFile(null);
        setFilePreview(null);
        document.getElementById('file-input').value = ''; // Clear input field
      } else {
        const result = await response.json();
        console.error('Failed to upload resume:', result.message);
        setUploadMessage('Failed to upload resume. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      setUploadMessage('Error uploading resume. Please try again.');
    }
  };

  return (
    <div className="resume-upload-container">
      <h2>Submit Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="file-input"
          id="file-input"
        />

        {filePreview && (
          <div className="resume-preview-container">
            {selectedFile.type === 'application/pdf' ? (
              <iframe
                className="resume-preview"
                src={filePreview}
                title="Resume Preview"
              ></iframe>
            ) : (
              <img
                className="resume-preview"
                src={filePreview}
                alt="Resume Preview"
              />
            )}
            <button type="button" onClick={handleRemoveFile} className="remove-button">
              Remove Resume
            </button>
          </div>
        )}

        <button type="submit" className="submit-button" disabled={!selectedFile}>
          Upload Resume
        </button>
      </form>

      {/* Display upload message */}
      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
    </div>
  );
}
