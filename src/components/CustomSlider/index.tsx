import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space, Typography, Button, Input, message, Empty, Divider } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import CardWrapper from '../CardWrapper';  // Make sure the path is correct
import './style.scss';

const { Text } = Typography;

interface Weights {
  [key: string]: number;
}

const CustomSlider: React.FC = () => {
  const [weights, setWeights] = useState<Weights>({
    experience: 25,
    skill: 25,
    leadership: 25,
    education: 25,
  });
  const [additionalWeights, setAdditionalWeights] = useState<Weights>({});
  const [newWeightName, setNewWeightName] = useState('');
  const [addingNewWeight, setAddingNewWeight] = useState(false);

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const totalAdditionalWeight = Object.values(additionalWeights).reduce((a, b) => a + b, 0);

  const onChange = (key: string, newValue: number, isAdditional = false) => {
    if (newValue < 0 || newValue > 100) {
      message.error("Value must be between 0 and 100");
      return;
    }

    if (isAdditional) {
      setAdditionalWeights((prevWeights) => ({
        ...prevWeights,
        [key]: newValue,
      }));
    } else {
      setWeights((prevWeights) => ({
        ...prevWeights,
        [key]: newValue,
      }));
    }
  };

  const addNewWeightage = () => {
    if (!newWeightName.trim()) {
      message.error("Please enter a valid name");
      return;
    }

    if (additionalWeights[newWeightName]) {
      message.error("Weightage with this name already exists");
      return;
    }

    if (Object.keys(additionalWeights).length >= 3) {
      message.error("You can only add up to 3 additional weightages");
      return;
    }

    setAdditionalWeights((prevWeights) => ({
      ...prevWeights,
      [newWeightName]: 0,
    }));

    setNewWeightName('');
    setAddingNewWeight(false);
  };

  const removeWeightage = (key: string, isAdditional = false) => {
    if (isAdditional) {
      setAdditionalWeights((prevWeights) => {
        const newWeights = { ...prevWeights };
        delete newWeights[key];
        return newWeights;
      });
    } else {
      setWeights((prevWeights) => {
        const newWeights = { ...prevWeights };
        delete newWeights[key];
        return newWeights;
      });
    }
  };

  const handleButtonClick = () => {
    message.success('Screening Resume');
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12} style={{ paddingRight: '8px' }}>
          <CardWrapper title="Required Weightages" height="100%">
            <Space style={{ width: '100%' }} direction="vertical">
              {Object.entries(weights).map(([key, value]) => (
                <Row key={key}>
                  <Col span={8}>
                    <Text>{key.charAt(0).toUpperCase() + key.slice(1)} Weightage</Text>
                  </Col>
                  <Col span={12}>
                    <Slider
                      min={0}
                      max={100}
                      onChange={(val) => onChange(key, val)}
                      value={value}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={0}
                      max={100}
                      style={{ margin: '0 16px' }}
                      value={value}
                      onChange={(val) => onChange(key, val as number)}
                    />
                  </Col>
                </Row>
              ))}
              <Row>
                <Col span={8}>
                  <Text>Total Weightage</Text>
                </Col>
                <Col span={12}>
                  <Slider
                    min={0}
                    max={100}
                    value={totalWeight}
                    disabled
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={0}
                    max={100}
                    style={{ margin: '0 16px' }}
                    value={totalWeight}
                    disabled
                  />
                </Col>
              </Row>
              {totalWeight !== 100 && (
                <Row>
                  <Col span={24}>
                    <Text type="danger">Total weightage must equal 100. Current total: {totalWeight}</Text>
                  </Col>
                </Row>
              )}
            </Space>
          </CardWrapper>
        </Col>
        <Col span={12} style={{ paddingLeft: '8px' }}>
          <CardWrapper title="Considerational Weightages" height="100%">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => setAddingNewWeight(true)}
                disabled={Object.keys(additionalWeights).length >= 3}
              >
                Add Weightage
              </Button>
              {addingNewWeight && (
                <Space style={{ marginTop: '16px' }}>
                  <Input
                    placeholder="Weightage name"
                    value={newWeightName}
                    onChange={(e) => setNewWeightName(e.target.value)}
                  />
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={addNewWeightage}
                  >
                    Add
                  </Button>
                  <Button
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setNewWeightName('');
                      setAddingNewWeight(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              )}
              <Space direction="vertical" style={{ marginTop: '16px', width: '100%' }}>
                {Object.entries(additionalWeights).length > 0 ? (
                  <>
                    {Object.entries(additionalWeights).map(([key, value]) => (
                      <Row key={key}>
                        <Col span={8}>
                          <Text>{key.charAt(0).toUpperCase() + key.slice(1)} Weightage</Text>
                        </Col>
                        <Col span={10}>
                          <Slider
                            min={0}
                            max={100}
                            onChange={(val) => onChange(key, val, true)}
                            value={value}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={0}
                            max={100}
                            style={{ margin: '0 16px' }}
                            value={value}
                            onChange={(val) => onChange(key, val as number, true)}
                          />
                        </Col>
                        <Col span={2}>
                          <Button
                            type="link"
                            icon={<CloseOutlined />}
                            onClick={() => removeWeightage(key, true)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col span={8}>
                        <Text>Total Additional Weightage</Text>
                      </Col>
                      <Col span={12}>
                        <Slider
                          min={0}
                          max={100}
                          value={totalAdditionalWeight}
                          disabled
                        />
                      </Col>
                      <Col span={4}>
                        <InputNumber
                          min={0}
                          max={100}
                          style={{ margin: '0 16px' }}
                          value={totalAdditionalWeight}
                          disabled
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Empty description="No additional weightages" />
                )}
              </Space>
            </Space>
          </CardWrapper>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '16px' }}>

        <Divider orientation="right" style={{ borderColor: '#2e92ee' }}  >

          <Button
            type="primary"
            size="large"
            onClick={handleButtonClick}
            disabled={totalWeight !== 100}
            className="custom-button"
          >
            Screen Resume
          </Button>
        </Divider>
      </Row>
    </div>
  );
};

export default CustomSlider;
