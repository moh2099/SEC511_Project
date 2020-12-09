import React, { PureComponent } from "react";
import axios from 'axios'
// import { Link } from "react-router-dom";
// import IntlMessages from "../../../util/IntlMessages";
import { Card, Menu, Dropdown, Button, Row, Col, Progress, Checkbox, message } from 'antd';
import { DownOutlined, SaveFilled } from '@ant-design/icons';
// import Basic from '../../components/feedback/Progress/Basic' //default calsses which are exported as default shouldn't be imported between {}
import { Pagination } from 'antd';
import Email from './Email'
import swal from 'sweetalert'
import Mail from '../Mail/index';

const API_KEY = "673ba1248cc664ce1099171659818622acdc62c23dcab27ce51c4aeb409ab094";
const inboxData = {
  created: "2020-12-08T21:09:11.976Z",
  createdAt: "2020-12-08T21:09:11.976Z",
  description: null,
  emailAddress: "14e0c2a4-0624-4e5a-b8b0-6cc2dd893a85@mailslurp.com",
  expiresAt: "2020-12-08T22:09:11.976655298Z",
  favourite: false,
  id: "14e0c2a4-0624-4e5a-b8b0-6cc2dd893a85",
  name: null,
  tags: null,
  userId: "8249091e-39c3-4ca6-8ca6-854d0f741bdb",
}



class Phishing_simulator extends PureComponent {

  async getEmails() {
    return await axios.get(`https://api.mailslurp.com/waitForLatestEmail?apiKey=${API_KEY}&inboxId=${inboxData.id}`)
  }

  newInbox = () => {

    fetch.post(`https://api.mailslurp.com/createInbox?apiKey=${API_KEY}`)
      .then((res) => console.log(res.data))

  }


  //  getEmails() {

  //     let response = axios.get(`https://api.mailslurp.com/waitForLatestEmail?apiKey=${API_KEY}&inboxId=${inboxData.id}`)
  //       .then( (res) =>  console.log(res.data)).finally(x => console.log(x)
  //       )

  //     return response
  //   }
  //emails_with_body
  componentDidMount() {
    this.setState({ selected_email: this.state.emails[0] })
    axios.get(`https://api.mailslurp.com/emails?apiKey=${API_KEY}&inboxId=${inboxData.id}&page=0&size=100&sort=ASC&unreadOnly=false`)
      .then(res => {
        res.data.content.map(e => {
          axios.get(`https://api.mailslurp.com/emails/${e.id}?apiKey=${API_KEY}&inboxId=${inboxData.id}&page=0&size=100&sort=ASC&unreadOnly=false`)
            .then(email => {
              let email_body = email.data
              //Object.assign(e, { 'Body': JSON.stringify(email.data.body) });
              //e.body = body
              let ex = this.state.emails_with_body
              this.setState({ ...this.state, emails_with_body: [...this.state.emails_with_body, email_body] })
              
            })
        })
        this.setState({ ...this.state, newEmails: res.data })
      })



  }
  // componentWillUpdate() {
  //   console.log(this.state.user_answers)
  // }
  componentDidUpdate() {
    let selected_email = this.state.selected_email
    let user_selection = this.state.user_answers[selected_email.id] != null ? this.state.user_answers[selected_email.id].user_selection : 'Not_Answered'
    this.setState({ ...this.state, chosen_answer: user_selection })

  }

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
          this.check_answers(user_answers, emails)

          swal("Your answers have been saved, please check the results!", {
            icon: "success",
          })

        }
      })

  }


  check_answers = (answers, emails) => {
    // console.log(answers)
    // console.log(emails)

    emails.map(email => {
      if (email.id === answers[email.id].qid) {
        let user_answer = answers[email.id].selectedItem
        let user_indicators = answers[email.id].indicators


        console.log(email.indicators)
        console.log(user_indicators)
        console.log(user_answer)

      }
      return ''
    })


  }




  handleChange = (selectedPage) => {
    this.setState({
      ...this.state.emails,
      selected_email: this.state.emails[selectedPage - 1]
    })

  }

  handleUserAnswer = (selection) => {

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


    if (selection.selectedItem === 1) {
      let msg_indicators = `indicators: ${selection.indicators}`
      message.info(msg_indicators, 5)
    } else {
      let message_content = `You have selected: ${selection.text}`
      message.success(message_content, 2)
    }


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
    newEmails: [],
    emails_with_body: [],
    valid_emails: [],
    emails: [
      {
        id: 1, sender: 'asdij@aifjw.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q1.jpg',
        indicators: { sender: true, receiver: false, content: true }
      },
      {
        id: 2, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q2.jpg',
        indicators: { sender: true, receiver: false, content: true }
      },
      {
        id: 3, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q3.jpg',
        indicators: {}
      },
      {
        id: 4, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q4.jpg',
        indicators: {}
      },
      {
        id: 5, sender: 'asdoe@asdeg.com', receiver: 'kkkower@gmail.com', content: 'https://www.phishingbox.com/phishing-test/img/phishing-test-q5.jpg',
        indicators: { sender: false, receiver: true, content: true }
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
    user_answers: {}
  }
  /**
   * 
   * sending time
   * You may get the images from the storage[local]
   * 
   * 
   * 
   */


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
    // {
    //   id: e.id, sender: e.from, receiver: e.to[0], content: e.body, subject: e.subject,
    //   indicators: {}
    // }


    //console.log(this.state.selected_email);

    // let Emails = []
    // let temp = {}
    // this.state.emailListIds.map(id => {
    //  let e = this.getEmail(id) != null ? this.getEmail(id) : ''
    //   if (e != '' && e != null) {
    //     temp = {
    //       id: e.id, sender: e.from, receiver: e.to[0], content: e.body, subject: e.subject,
    //       indicators: {}
    //     }

    //     Emails.push(temp)
    //   }
    // })

    // if (Emails.length > 0) {
    //   console.log(Emails)
    // }


    //console.log(this.state);

    return (
      <Card title="Phishing Simulator" className="gx-card">  {/**  style={{marginLeft: 230, width: 750}}  */}
        <Row style={{ marginLeft: 55 }}> {/** style={{ marginLeft: 55 }}  */}
          <Col>
            <Pagination onChange={this.handleChange} simple defaultCurrent={1} defaultPageSize={1} total={this.state.emails.length} />
            <Dropdown overlay={
              <Menu onClick={e => this.getEmail(e.key)} >
                {
                  this.state.newEmails.content != null ? (
                    this.state.newEmails.content.map(email => {
                      return <Menu.Item id={email.id} key={email.id} text={email.subject} ><span>{email.subject}</span></Menu.Item>
                    })
                  ) : ('')
                }

              </Menu>

            }>
              <Button
                //This is the menu item you click
                style={{ width: 200 }}
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}> {'Select an email'}
                <DownOutlined />
              </Button>
            </Dropdown>
            {/* <Email updateUserAnswers={this.handleUserAnswer} all_answers={this.state.user_answers} progress_circle_percent={progress_circle_size} selected_answer={chosen_answer} id={emailProps.id} sender={emailProps.sender} receiver={emailProps.receiver} content={emailProps.content} indicators={emailProps.indicators} submitAllQuestions={this.handleSubmitAnswers} /> */}
          </Col>
        </Row>
        <Row style={{ marginLeft: 35, marginTop: 20, marginRight: 35 }}>
          {
            this.state.newEmails.content != null ? (
              this.state.emails_with_body.length == this.state.newEmails.content.length ? (
                <Mail emails_bodies={this.state.emails_with_body} />
              ): ('')
            ) : ('')
          }

        </Row>
      </Card>
    )
  }
}

export default Phishing_simulator;
