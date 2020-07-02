import React, { Component } from 'react';
import { Layout } from 'antd';
import Sider from './Sider';
import Content from './Content';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Layout>
          <Layout.Sider>
            <Sider />
          </Layout.Sider>
          <Layout.Content>
            <Content />
          </Layout.Content>
        </Layout>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </div>
    )
  }
};

export default App;
