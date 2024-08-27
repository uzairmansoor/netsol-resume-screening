// import React from 'react';
import { Typography } from 'antd';
import CustomSlider from '../../components/CustomSlider';
import FileUploader from '../../components/FileUploader';
import CustomTable from '../../components/CustomTable';
import CardWrapper from '../../components/CardWrapper';
import './style.scss';
import { candidatesData } from '../../dataStore/candidatesData';

const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center', fontWeight: 'bold', color: '#2e92ee' }}>Resume Screening</Title>
      <div className='p-1'>
        <div className='disp-f-sb-mb10'>
          <CardWrapper title="Upload Resumes" width="49.5%">
            <FileUploader
              maxFiles={50}
              text1={'Click or drag files to this area to upload'}
              text2={'Upload up to 50 Resumes (PDF only)'}
            />
          </CardWrapper>
          <CardWrapper title="Upload Job Description" width="49.5%">
            <FileUploader
              maxFiles={1}
              text1={'Click or drag file to this area to upload'}
              text2={'Upload a single Job Description (PDF only)'}
            />
          </CardWrapper>
        </div>
        <CustomSlider />
        <div>
          <CardWrapper title="Analysis Report">
            <CustomTable data={candidatesData} /> {/* Use the imported data */}
          </CardWrapper>
        </div>
      </div>
    </>
  );
};

export default Home;
