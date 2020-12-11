import React, { Component } from 'react'
import { Menu, Dropdown, Button, Row, Col, Progress, Checkbox } from 'antd';
import { DownOutlined, SaveFilled } from '@ant-design/icons';

class Email extends Component {
    state = {
        id: this.props.id,
        sender: this.props.sender,
        receiver: this.props.receiver,
        content: this.props.content,
        showIndicatorsMenu: false,
        userSelection: {},
        //userIndicators: [],
    }

    handleCheckedBox = (e) => {
        let tempIndicators = this.state.userSelection.indicators

        if (e.target.checked === true) {
            //console.log(this.state.userIndicators)
            this.setState({ userSelection: { ...this.state.userSelection, indicators: [...tempIndicators, e.target.name] } }, () => this.props.updateUserAnswers(this.state.userSelection))
            //  this.setState({ ...this.state, userIndicators: [...this.state.userIndicators, e.target.name] })
        } else {
            let item = e.target.name
            tempIndicators = tempIndicators.filter((element) => {
                return element !== item
            })
            //this.setState has a second parameter which is the callBack simply use () => someFunction syntax so that someFunction is executed after the state is updated, because this.setState is asynchronous function
            this.setState({ userSelection: { ...this.state.userSelection, indicators: tempIndicators } }, () => this.props.updateUserAnswers(this.state.userSelection))
        }
    }

    handleUserSelection = ({ item }) => {
        let selection = {
            qid: item.props.id,
            selectedItem: parseInt(item.props.eventKey),
            text: item.props.text,
            indicators: []
        }

        // let temp = selection.indicators
        // let sender = temp.conta
        // let obj = {sender: temp.find(e => e == 'Sender' ), receiver: temp.find(e => e == 'Receiver' ), content:}



        this.setState({ userSelection: selection })
        if (selection.selectedItem === 1) { // 'phishing email
            this.setState({ showIndicatorsMenu: true })
        } else {
            this.setState({ showIndicatorsMenu: false })
            this.props.updateUserAnswers(selection)
        }
    }

    get_selected_answerTitles = (selection) => {
        if (selection === 1) {
            return "Phishing Email"
        }
        else if (selection === 2)
            return "Real Email"
        else if (selection === 3)
            return "I don't know!"
        else
            return "Choose the email type"
    }

    hideIndicatorsMenu = () => {
        this.setState({ showIndicatorsMenu: false })
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        return (
            <Row>
                <Col > {/** style={{ style={{ marginLeft: 50 }} */}
                    <Row push={2}>
                        <Progress strokeColor="#cb42f5" style={{ marginBottom: 15 }} percent={this.props.progress_circle_percent} /> {/** style={{ marginLeft: 50, marginTop: -65 }}  */}
                        <Dropdown overlay={
                            <Menu onClick={this.handleUserSelection} >
                                <Menu.Item id={this.props.id} key="1" text={"Phishing Email"} ><span>Phishing Email</span></Menu.Item>
                                <Menu.Item id={this.props.id} key="2" text={"Real Email"} ><span>Real Email</span></Menu.Item>
                                <Menu.Item id={this.props.id} key="3" text={"I don't know!"} ><span>I don't know!</span></Menu.Item>
                            </Menu>
                        }>
                            <Button
                                //This is the menu item you click
                                style={{ width: 200 }}
                                className="ant-dropdown-link"
                                onClick={e => e.preventDefault()}> {this.get_selected_answerTitles(this.props.selected_answer)}
                                <DownOutlined />
                            </Button>
                        </Dropdown>

                        {
                            this.state.showIndicatorsMenu === true ? (
                                <Dropdown overlay={
                                    <Menu >
                                        {/** Note in the checkbox here you may use name or text attribute as value for the checkbox */}
                                        <Menu.Item ><Checkbox key="1" name={"Sender"} onChange={this.handleCheckedBox}><span>Sender</span></Checkbox></Menu.Item>
                                        <Menu.Item ><Checkbox key="2" name={"Receiver"} onChange={this.handleCheckedBox}><span>Receiver</span></Checkbox></Menu.Item>
                                        <Menu.Item ><Checkbox key="3" name={"Content"} onChange={this.handleCheckedBox}><span>Content</span></Checkbox></Menu.Item>
                                    </Menu>
                                }>
                                    <Button
                                        //This is the menu item you click
                                        style={{ width: 200 }}
                                        className="ant-dropdown-link"
                                        onClick={e => e.preventDefault()}> {"Choose the indicator"}
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                            ) : ('')
                        }



                        {
                            this.props.progress_circle_percent === 100 ? (
                                <Button type="danger" shape="round" onClick={this.props.submitAllQuestions}> <SaveFilled />Submit</Button>
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