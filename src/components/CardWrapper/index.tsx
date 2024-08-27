import React from 'react';
import { Card, Typography } from 'antd';
import './style.scss';

const { Title } = Typography;

interface CardWrapperProps {
  title: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ title, width = '100%', height = '100%', children }) => {
  return (
    <Card style={{ width, height, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom:'5px' }}>
      <Title level={4} style={{color: 'white'}}className='card-title'>{title}</Title>
      <div className="card-content">
        {children}
      </div>
    </Card>
  );
};

export default CardWrapper;