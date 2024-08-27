import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import './style.scss';

const { Dragger } = Upload;

// Define the props type for the FileUploader component
interface FileUploaderProps {
  maxFiles: number;
  text1?: string;
  text2?: string;
}

// Define the type for the info parameter in the onChange function
interface UploadChangeParam {
  file: any;
  fileList: any[];
}

// Customize props for different file upload requirements
const getProps = (maxFiles: number): UploadProps => ({
  name: 'file',
  multiple: maxFiles > 1, // Allow multiple files if maxFiles is greater than 1
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  accept: '.pdf', // Only accept PDF files
  beforeUpload: (file: any, fileList: any[]) => {
    // Check the file type
    if (file.type !== 'application/pdf') {
      message.error(`${file.name} is not a PDF file`);
      return Upload.LIST_IGNORE;
    }
    // Check the maximum number of files
    if (fileList.length > maxFiles) {
      message.error(`You can only upload up to ${maxFiles} file(s)`);
      return Upload.LIST_IGNORE;
    }
    return true;
  },
  onChange(info: UploadChangeParam) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: React.DragEvent<HTMLDivElement>) {
    console.log('Dropped files', e.dataTransfer.files);
  },
});

const FileUploader: React.FC<FileUploaderProps> = (
  {
    maxFiles,
    text1,
    text2
  }) => (
  <Dragger {...getProps(maxFiles)}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">{text1}</p>
    <span>{text2}</span>
  </Dragger>
);

export default FileUploader;
