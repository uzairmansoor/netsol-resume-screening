import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, ConfigProvider, Input, Layout, Menu, Space } from 'antd';
import About from './pages/about';
import Home from './pages/home';

const { Header, Content } = Layout;

function App() {

  return (
    <>
      {/* <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#00b96b',
            },
            Input: {
              colorPrimary: '#eb2f96',
            }
          },
        }}
      >
      </ConfigProvider> */}
      <Router>
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content" style={{ margin: '16px 0' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Router>
    </>
  );
}

export default App;
