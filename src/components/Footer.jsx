import React, { Component } from 'react';
import { 
  LinkedinFilled,
  TwitterOutlined,
  SkypeFilled,
  FacebookFilled,
  GoogleOutlined,
  SlackOutlined
} from '@ant-design/icons';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <LinkedinFilled />
        <TwitterOutlined />
        <SkypeFilled />
        <FacebookFilled />
        <GoogleOutlined />
        <SlackOutlined />
      </div>
    )
  }
};

export default Footer;
