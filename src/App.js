import React from 'react';
import { Layout, ConfigProvider, Button, Space } from 'antd'
import { Outlet } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css'
import Wx from './pages/WxExcel/index.js'

const { Header, Footer, Sider, Content } = Layout;

const customTheme  = {
  token: {
    colorPrimary: '#00b96b',
    colorSuccess: '#ff4d4f',

  },
  componentd: {
    Button: {
      borderRadius: 8,
    }
  }
}
function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className='displayNone' style={{ position: 'fixed', width: '100vw', background: 'red' }}>head</Header>
        <Sider className='displayNone' style={{ position: 'fixed', bottom:0, width: "200px", height: 'calc(100vh - 70px)', background: "white"}}> side </Sider>
        <Content >
          <Outlet />
        </Content>
        <Footer className='displayNone' style={{ position: 'fixed', bottom:0, width: '100vw', background: "white"}}> footer</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
 