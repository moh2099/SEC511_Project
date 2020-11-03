import React, { Component } from 'react'
import { Menu, Dropdown, Button, Row, Col } from 'antd';

import { DownOutlined } from '@ant-design/icons';

class Email extends Component {
    state = {
        id: this.props.id,
        sender: this.props.sender,
        receiver: this.props.receiver,
        content: this.props.content,
     }
 
get_selected_answer = (selection) => {    
    if (selection === 1)
        return "Phishing Email"
    else if (selection === 2)
        return "Real Email"
    else if (selection === 3)
        return "I don't know!"
    else
        return "Choose the email type"
}
    render() {
        return (
            <Row>
                <Col style={{ marginLeft: 50 }}>
                    <Row style={{ marginTop: 17 }}>
                        <Dropdown overlay={
                            <Menu onClick={this.props.user_answer}>
                                <Menu.Item id={this.props.id} key="1" text={"Phishing Email"} >Phishing Email</Menu.Item>
                                <Menu.Item id={this.props.id} key="2" text={"Real Email"} >Real Email</Menu.Item>
                                <Menu.Item id={this.props.id} key="3" text={"I don't know!"} >I don't know!</Menu.Item>
                            </Menu>
                        }>
                            <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}> { this.get_selected_answer(this.props.selected_answer) } <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Row>
                    <Row>
                        <img alt="Error404_image_not_found" width={550} src={this.props.content} />
                    </Row>
                </Col>
            </Row>
        )
    }


}

export default Email