import React, { Component } from 'react'
import { Menu, Dropdown, Button, Row, Col, Progress } from 'antd';
import { DownOutlined, SaveFilled } from '@ant-design/icons';
import swal from 'sweetalert'

class Email extends Component {
    state = {
        id: this.props.id,
        sender: this.props.sender,
        receiver: this.props.receiver,
        content: this.props.content,
    }
    handleSubmit = (e) => {
        e.preventDefault()
        swal({
            title: "Confirmation",
            text: "Are you sure you want to submit your answers?",
            icon: "info",
            buttons: true,
        })
            .then((decision) => {
                if (decision) {
                    console.log(this.props.all_answers)
                    swal("Your answers have been saved, please check the results!", {
                        icon: "success",
                    })

                }
            })

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
                <Col > {/** style={{ style={{ marginLeft: 50 }} */}
                    <Row push={2}>
                        <Progress strokeColor="#cb42f5" style={{ marginBottom: 15 }} percent={this.props.progress_circle_percent} /> {/** style={{ marginLeft: 50, marginTop: -65 }}  */}
                        <Dropdown overlay={
                            <Menu onClick={this.props.user_answer} >
                                <Menu.Item id={this.props.id} key="1" text={"Phishing Email"} ><span>Phishing Email</span></Menu.Item>
                                <Menu.Item id={this.props.id} key="2" text={"Real Email"} ><span>Real Email</span></Menu.Item>
                                <Menu.Item id={this.props.id} key="3" text={"I don't know!"} ><span>I don't know!</span></Menu.Item>
                            </Menu>
                        }>
                            <Button
                                style={{ width: 200 }}
                                className="ant-dropdown-link"
                                onClick={e => e.preventDefault()}> {this.get_selected_answer(this.props.selected_answer)}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                        {
                            this.props.progress_circle_percent === 100 ? (
                                <Button type="danger" shape="round" onClick={this.handleSubmit}> <SaveFilled />Submit</Button>
                            ) : ('')
                        }
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <img alt="Error404_image_not_found" width={550} src={this.props.content} />
                    </Row>
                </Col>


            </Row>

        )
    }


}

export default Email