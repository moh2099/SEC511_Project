import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import IntlMessages from "../../../util/IntlMessages";
import { Card, Menu, Dropdown, notification, Button, Progress } from 'antd';
import { Row, Col, Icon } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Basic from '../../components/feedback/Progress/Basic' //default calsses which are exported as default shouldn't be imported between {}

const onClick = ({ item }) => {

  let notificationStyle = {
    duration: 1.7,
    placement: "bottomLeft",
    type: "success",
    message: `your selection is: ${item.props.text}`
  }
  notification.success(notificationStyle);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1" text={"Phishing Email"} >Phishing Email</Menu.Item>
    <Menu.Item key="2" text={"Real Email"} >Real Email</Menu.Item>
    <Menu.Item key="3" text={"I don't know!"} >I don't know!</Menu.Item>
  </Menu>
);
class Phishing_simulator extends PureComponent {

  render() {
    return (
      <Card title="Phishing Simulator" className="gx-card">
        <Row>
          <Col style={{ marginLeft: 50 }}>
            <Row style={{ marginTop: 17 }}>
              <Dropdown overlay={menu}>
                <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}> Choose the email type <DownOutlined /> </Button>
              </Dropdown>
            </Row>
            <Row>
              <img width={550} src="https://www.phishingbox.com/phishing-test/img/phishing-test-q1.jpg" />
            </Row>
          </Col>
          <Col push={4}>
            <Progress type="circle" percent={50} />
          </Col>
        </Row>

      </Card>
    )
  }
}

export default Phishing_simulator;
