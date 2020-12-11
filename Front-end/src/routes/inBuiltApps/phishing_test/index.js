import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
// import IntlMessages from "../../../util/IntlMessages";
import { Card, Col, Row, message } from 'antd';
// import Basic from '../../components/feedback/Progress/Basic' //default calsses which are exported as default shouldn't be imported between {}
import { Pagination } from 'antd';
import Email from './Email'
import swal from 'sweetalert'


class Phishing_test extends PureComponent {


  handleSubmitAnswers = (e) => {
    e.preventDefault()
    swal({
      title: "Confirmation",
      text: "Are you sure you want to submit your answers?",
      icon: "info",
      buttons: true,
    })
      .then((decision) => {
        if (decision) {

          let user_answers = this.state.user_answers
          let emails = this.state.emails
          let result = this.validate_answers(user_answers, emails)
          this.setState({...this.state, result })
          let percentage = (result[0] / result[1]) * 100
          if (percentage > 75) {
            swal(`Congratulation! You have scored ${percentage}%`, {
              icon: "success",
            })
          } else {
            console.log('you have scored: ' + percentage)
            swal(`You have scored less than 75%, Please try again!`, {
              icon: "warning",
            })
          } 

        }
      })

  }

  isEqual(a, b) {
    // if length is not equal 
    if (a.length != b.length)
      return false;
    else {
      // comapring each element of array 
      for (var i = 0; i < a.length; i++)
        if (a[i] != b[i])
          return false;
      return true;
    }
  }

  validate_answers = (answers, emails) => {
    //console.log(answers);
    let count = 0
    emails.map(e => {
      let found = true
      let answer = answers[e.id]
      let a = e.indicators
      let b = answer.indicators

      for (var i = 0; i < a.length; i++) {
        if (b.includes(a[i]) == false) {
          found = false
        }
      }
      //how to identify if it's real email ----> if it has not indicators
      if (a.length == 0 && answer.selectedItem == 2) {
        // console.log(e.indicators)
        // console.log(b)
        // console.log(a.length == 0)

        count++
      }
      else if (a.length == b.length && answer.selectedItem == 1 && found) {
        count++

      }


    })

    return count

  }

  handleChange = (selectedPage) => {
    this.setState({
      ...this.state.emails,
      selected_email: this.state.emails[selectedPage - 1]
    })
    this.child.hideIndicatorsMenu() // a function inside the child component Email

  }

  handleUserAnswer = (selection) => {

    console.log(selection)
    let user_answers = this.state.user_answers
    user_answers = { ...user_answers, [selection.qid]: selection }
    this.setState({ ...this.state, user_answers, chosen_answer: selection.selectedItem })

    // let tempEmail = this.state.emails.filter(email => email.id === selection.qid)
    // tempEmail.selectedItem = selection.selectedItem
    // let allEmails = this.state.emails
    // allEmails.push({ ...tempEmail })
    // this.setState({
    //   emails: { ...this.state.emails, allEmails}
    // })

    let message_content = `You have selected: ${selection.text}`
    message.success(message_content, 2)

    //let objIndex = user_answers.findIndex(e => e.qid === selection.qid)

    // if (objIndex === -1) {
    //   //user_answers.push(selection) //NOT THE GOOD APPROACH
    //    user_answers = {...user_answers, [selection.id]: selection}
    //    this.setState({ ...this.state, user_answers })
    //  } else {
    //   user_answers[objIndex] = { ...user_answers[objIndex], selectedItem: selection.selectedItem }
    // }

    // this.setState({ ...this.state, user_answers })

  }


  state = {
    emails: [
      {
        id: 1, sender: 'asdij@aifjw.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q1.jpg',
        indicators: ["Sender", "Receiver", "Content"]
      },
      {
        id: 2, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q2.jpg',
        indicators: ["Sender", "Content"]
      },
      {
        id: 3, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q3.jpg',
        indicators: []
      },
      {
        id: 4, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q4.jpg',
        indicators: []
      },
      {
        id: 5, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q5.jpg',
        indicators: []
      },
      // {
      //   id: 6, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q6.jpg',
      //   indicators: { sender: true, receiver: false, content: true }
      // },
      // {
      //   id: 7, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q7.jpg',
      //   indicators: { sender: false, receiver: false, content: true }
      // },
      // {
      //   id: 8, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q8.jpg',
      //   indicators: { sender: true, receiver: false, content: true }
      // },
      // {
      //   id: 9, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q9.jpg',
      //   indicators: { sender: false, receiver: true, content: true }
      // },
      // {
      //   id: 10, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q10.jpg',
      //   indicators: { sender: true, receiver: true, content: false }
      // },
    ],


    selected_email: {},
    chosen_answer: '',
    user_answers: [],
    result: []
  }
  /**
   * 
   * sending time
   * You may get the images from the storage[local]
   * 
   * 
   * 
   */

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
    let progress_circle_size = (Object.keys(this.state.user_answers).length / this.state.emails.length) * 100
    let emailProps = {
      id: this.state.selected_email.id,
      sender: this.state.selected_email.sender,
      receiver: this.state.selected_email.receiver,
      content: this.state.selected_email.content,
      indicators: this.state.selected_email.indicators
    }

    return (
      <Card title="Phishing Simulator" className="gx-card">  {/**  style={{marginLeft: 230, width: 750}}  */}
        <Row style={{ marginLeft: 55 }}> {/** style={{ marginLeft: 55 }}  */}
          <Col>
            <Pagination onChange={this.handleChange} simple defaultCurrent={1} defaultPageSize={1} total={this.state.emails.length} />
            <Email onRef={ref => (this.child = ref)} showIndicatorMenu={false} updateUserAnswers={this.handleUserAnswer} all_answers={this.state.user_answers} progress_circle_percent={progress_circle_size} selected_answer={chosen_answer} id={emailProps.id} sender={emailProps.sender} receiver={emailProps.receiver} content={emailProps.content} indicators={emailProps.indicators} submitAllQuestions={this.handleSubmitAnswers} />
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Phishing_test;