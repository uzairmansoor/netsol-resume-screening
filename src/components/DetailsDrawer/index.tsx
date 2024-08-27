import React from 'react';
import { Drawer, Typography, Descriptions, Progress, Tag, Space, Row, Col } from 'antd';
import { LinkedinOutlined, GlobalOutlined, GithubOutlined } from '@ant-design/icons';
import './style.scss'; // Import the styles
import { CandidateProfile } from '../../contracts/CandidateProfile/interfaces'; // Import the CandidateProfile interface

const { Title } = Typography;

interface DetailsDrawerProps {
  visible: boolean;
  onClose: () => void;
  data: CandidateProfile | null; // Use the updated interface
}

const DetailsDrawer: React.FC<DetailsDrawerProps> = ({ visible, onClose, data }) => {
  return (
    <Drawer
      title={`Details for ${data?.name}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
      className="custom-drawer"
    >
      {data && (
        <>
          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col span={16}>
              <Title level={4}>Candidate Overview</Title>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
            <Space>
                <a href={data.linkedinProfile} target="_blank" rel="noopener noreferrer" className="custom-link">
                  <LinkedinOutlined style={{ fontSize: '24px', color: '#0077b5' }} />
                </a>
                {data.githubProfile && (
                  <a href={data.githubProfile} target="_blank" rel="noopener noreferrer" className="custom-link">
                    <GithubOutlined style={{ fontSize: '24px', color: '#333' }} />
                  </a>
                )}
                {data.portfolio && (
                  <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="custom-link">
                    <GlobalOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  </a>
                )}
              </Space>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col span={16}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={5}>Skills</Title>
                <Space wrap>
                  {data.skills.map((skill) => (
                    <Tag color="blue" key={skill}>{skill}</Tag>
                  ))}
                </Space>

                <Title level={5}>Certifications</Title>
                <Space wrap>
                  {data.certifications.map((certification) => (
                    <Tag color="green" key={certification}>{certification}</Tag>
                  ))}
                </Space>

                <Title level={5}>Projects</Title>
                <ul>
                  {data.projects.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>

                <Title level={5}>Languages</Title>
                <Space wrap>
                  {data.languages.map((language) => (
                    <Tag color="purple" key={language}>{language}</Tag>
                  ))}
                </Space>
              </Space>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Title level={5} >Aggregated Score</Title>
              <div>
                <Progress
                  type="circle"
                  percent={(data.aggregatedScore / 5) * 100}
                  strokeColor={{
                    '0%': '#ff4d4f',
                    '100%': '#52c41a',
                  }}
                  format={() => data.aggregatedScore.toFixed(2)}
                  width={80}
                  strokeWidth={10}
                />
              </div>
            </Col>
          </Row>

          <Descriptions bordered column={1} className="custom-descriptions">
            <Descriptions.Item label="Email">
              <a href={`mailto:${data.email}`} className="custom-link">{data.email}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <a href={`tel:${data.phone}`} className="custom-link">{data.phone}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Current Position">{data.currentPosition}</Descriptions.Item>
            <Descriptions.Item label="Current Company">{data.currentCompany}</Descriptions.Item>
            <Descriptions.Item label="Location">{data.location}</Descriptions.Item>
            <Descriptions.Item label="Total Experience">{data.totalExperience} years</Descriptions.Item>
            <Descriptions.Item label="Experience with Current Company">{data.experienceWithCurrentCompany} years</Descriptions.Item>
            <Descriptions.Item label="Employment Start Date">{data.employmentStartDate}</Descriptions.Item>
            <Descriptions.Item label="Expected Salary">{data.expectedSalary}</Descriptions.Item>
            <Descriptions.Item label="Availability">{data.availability}</Descriptions.Item>
            <Descriptions.Item label="Work Authorization">{data.workAuthorization}</Descriptions.Item>
            <Descriptions.Item label="Last Updated">{data.lastUpdated}</Descriptions.Item>
            <Descriptions.Item label="Summary">{data.summary}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
}

export default DetailsDrawer;
