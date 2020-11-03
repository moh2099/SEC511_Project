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
      selected_email: this.state.emails[selectedPage - 1]
    })

  }

  handleUserAnswer = ({ item }) => {
    let selection = {
      qid: item.props.id,
      user_selection: parseInt(item.props.eventKey)
    }
    let user_answers = this.state.user_answers
    user_answers = { ...user_answers, [selection.qid]: selection }
    this.setState({ ...this.state, user_answers, chosen_answer: selection.user_selection })

    // let tempEmail = this.state.emails.filter(email => email.id === selection.qid)
    // tempEmail.user_selection = selection.user_selection
    // let allEmails = this.state.emails
    // allEmails.push({ ...tempEmail })
    // this.setState({
    //   emails: { ...this.state.emails, allEmails}
    // })

    let notificationStyle = {
      duration: 1.7,
      placement: "bottomLeft",
      type: "success",
      message: `your selection is: ${item.props.text} to the question #${item.props.id}`
    }
    notification.success(notificationStyle)

    //let objIndex = user_answers.findIndex(e => e.qid === selection.qid)

    // if (objIndex === -1) {
    //   //user_answers.push(selection) //NOT THE GOOD APPROACH
    //    user_answers = {...user_answers, [selection.id]: selection}
    //    this.setState({ ...this.state, user_answers })
    //  } else {
    //   user_answers[objIndex] = { ...user_answers[objIndex], user_selection: selection.user_selection }
    // }

    // this.setState({ ...this.state, user_answers })

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
    selected_email: {},
    chosen_answer: '',
    user_answers: {}
  }


  componentDidMount() {
    this.setState({ selected_email: this.state.emails[0] })
  }
  // componentWillUpdate() {
  //   console.log(this.state.user_answers)
  // }
  componentDidUpdate() {
    let selected_email = this.state.selected_email
    let user_selection = this.state.user_answers[selected_email.id] != null ? this.state.user_answers[selected_email.id].user_selection : 'Not_Answered'
    this.setState({ ...this.state, chosen_answer: user_selection })

  }

  render() {
    let chosen_answer = parseInt(this.state.chosen_answer)
    let emailProps = {
      id: this.state.selected_email.id,
      sender: this.state.selected_email.sender,
      receiver: this.state.selected_email.receiver,
      content: this.state.selected_email.content,
    }

    return (
      <Card title="Phishing Simulator" className="gx-card">
        <Pagination onChange={this.handleChange} simple defaultCurrent={1} defaultPageSize={1} total={this.state.emails.length} />
        <Row> 
          <Col>
          <Email user_answer={this.handleUserAnswer} selected_answer={chosen_answer} id={emailProps.id} sender={emailProps.sender} receiver={emailProps.receiver} content={emailProps.content} />
          </Col>
          <Col push={4}>
            <Progress type="circle" percent={
              (Object.keys(this.state.user_answers).length / this.state.emails.length) * 100

            } />
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Phishing_simulator;
