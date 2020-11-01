import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
// import IntlMessages from "../../../util/IntlMessages";
import { notification, Card, Col, Row, Progress } from 'antd';
// import Basic from '../../components/feedback/Progress/Basic' //default calsses which are exported as default shouldn't be imported between {}
import { Pagination } from 'antd';
import Email from './Email'


class Phishing_simulator extends PureComponent {

  handleChange = (selectedPage) => {
    this.setState({
      ...this.state.emails,
      selectedEmail: this.state.emails[selectedPage - 1]
    })

  }

  handleUserAnswer = ({ item }) => {
    let selection = {
      qid: item.props.id,
      user_selection: parseInt(item.props.eventKey)
    }
    let user_answers = this.state.user_answers
    user_answers = { ...user_answers, [selection.qid]: selection }
    this.setState({ ...this.state, user_answers })
    //let objIndex = user_answers.findIndex(e => e.qid === selection.qid)

    // if (objIndex === -1) {
    //   //user_answers.push(selection) //NOT THE GOOD APPROACH
    //    user_answers = {...user_answers, [selection.id]: selection}
    //    this.setState({ ...this.state, user_answers })
    //  } else {
    //   user_answers[objIndex] = { ...user_answers[objIndex], user_selection: selection.user_selection }
    // }

    // this.setState({ ...this.state, user_answers })


    let notificationStyle = {
      duration: 1.7,
      placement: "bottomLeft",
      type: "success",
      message: `your selection is: ${item.props.text} to the question #${item.props.id}`
    }
    notification.success(notificationStyle)

  }


  state = {
    emails: [
      { id: 1, sender: 'asdij@aifjw.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q1.jpg' },
      { id: 2, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q2.jpg' },
      { id: 3, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q3.jpg' },
      { id: 4, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q4.jpg' },
      { id: 5, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q5.jpg' },
      { id: 6, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q6.jpg' },
      { id: 7, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q7.jpg' },
      { id: 8, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q8.jpg' },
      { id: 9, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q9.jpg' },
      { id: 10, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q10.jpg' },
    ],
    selectedEmail: {},
    user_answers: []
  }

  componentDidMount() {
    this.setState({ selectedEmail: this.state.emails[0] })
  }

  componentDidUpdate() {
    console.log(this.state.user_answers);
     
  }

  render() {
    return (
      <Card title="Phishing Simulator" className="gx-card">

        <Pagination onChange={this.handleChange} simple defaultCurrent={1} defaultPageSize={1} total={this.state.emails.length} />
        <Row>
          <Col>
            <Email user_answer={this.handleUserAnswer} id={this.state.selectedEmail.id} sender={this.state.selectedEmail.sender} receiver={this.state.selectedEmail.receiver} content={this.state.selectedEmail.content} />

            {/* {
              this.state.emails.map(email => (
                
                <Email content={email.content} />
             
              ))
            } */}
          </Col>
          <Col push={4}>
            <Progress type="circle" percent={
              (Object.keys(this.state.user_answers).length/this.state.emails.length)*100

            } />
          </Col>
        </Row>


      </Card>
    )
  }
}

export default Phishing_simulator;
