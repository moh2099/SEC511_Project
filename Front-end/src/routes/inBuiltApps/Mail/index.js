import React, { PureComponent } from "react";
import { Button, Checkbox, Progress, Dropdown, Menu, message, notification } from "antd";
import { SaveFilled } from '@ant-design/icons';
import CustomScrollbars from "util/CustomScrollbars";
import randomEmail from 'random-email'
import random_name from 'node-random-name'
//import mails from "./data/mails";
import folders from "./data/folders";
import filters from "./data/filters";
import labels from "./data/labels";
import options from "./data/options";
import MailList from "components/mail/MailList";
import ComposeMail from "components/mail/Compose/index";
// import AppModuleHeader from "components/AppModuleHeader/index";
import MailDetail from "components/mail/MailDetail/index";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "../../../components/CircularProgress/index";
import swal from 'sweetalert'
import axios from 'axios'

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


class Mail extends PureComponent {

  MailSideBar = () => {
    return <div className="gx-module-side">

      <div className="gx-module-side-header">
        <div className="gx-module-logo">
          <i className="icon icon-chat gx-mr-4" />
          <IntlMessages id="sidebar.mail.mailbox" />
        </div>
      </div>

      <div className="gx-module-side-content">
        <CustomScrollbars className="gx-module-side-scroll">
          <div className="gx-module-add-task">
            <Button type="primary" className="gx-btn-block"
              onClick={() => {
                this.setState({ composeMail: true })
              }}>
              <i className="icon icon-edit gx-mr-2" />
              <IntlMessages id="sidebar.mail.compose" /></Button>
          </div>

          <ul className="gx-module-nav">
            {this.getNavFolders()}

            <li className="gx-module-nav-label">
              <IntlMessages id="sidebar.mail.filters" />
            </li>

            {this.getNavFilters()}

            <li className="gx-module-nav-label">
              <IntlMessages id="sidebar.mail.labels" />
            </li>

            {this.getNavLabels()}

          </ul>
        </CustomScrollbars>
      </div>
    </div>
  };

  onDeleteMail = () => {
    const mails = this.state.allMail.map(mail =>
      mail.selected && (mail.folder === this.state.selectedFolder) ?
        { ...mail, folder: 4, selected: false, } : mail
    );
    this.setState({
      alertMessage: 'Mail Deleted Successfully',
      showMessage: true,
      selectedMails: 0,
      allMail: mails,
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
  };

  getNavFolders = () => {
    return folders.map((folder, index) =>
      <li key={index} onClick={() => {
        const filterMails = this.state.allMail.filter(mail => mail.folder === folder.id);
        this.setState({
          selectedFolder: folder.id,
          noContentFoundMessage: 'No Mail found in selected folder',
          currentMail: null,
          loader: true,
          folderMails: filterMails
        });
        setTimeout(() => {
          this.setState({ loader: false });
        }, 1500);
      }
      }>
        <span className={`${this.state.selectedFolder === folder.id ? 'active gx-link' : 'gx-link'}`}>
          <i className={`icon icon-${folder.icon}`} />
          <span>{folder.title}</span>
        </span>
      </li>
    )
  };


  onFolderMenuItemSelect = (e) => {
    const id = +e.key;
    const mails = this.state.allMail.map(mail =>
      mail.selected && (mail.folder === this.state.selectedFolder) ?
        { ...mail, folder: id, selected: false, } : mail
    );
    this.setState({
      selectedMails: 0,
      allMail: mails,
      noContentFoundMessage: 'No Mail found in selected folder',
      alertMessage: 'Mail has been moved successfully',
      showMessage: true,
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
  };

  onLabelMenuItemSelect = (e) => {
    const id = +e.key;
    const mails = this.state.allMail.map(mail => {
      if (mail.selected && (mail.folder === this.state.selectedFolder)) {
        if (mail.labels.includes(id)) {
          return { ...mail, labels: this.removeLabel(mail, id) };
        } else {
          return { ...mail, labels: this.addLabel(mail, id) };
        }
      } else {
        return mail;
      }
    }
    );
    this.setState({
      noContentFoundMessage: 'No Mail found in selected label',
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      allMail: mails,
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
  };

  handleRequestClose = () => {
    this.setState({
      composeMail: false,
      showMessage: false,
    });
  };
  getNavFilters = () => {
    return filters.map((filter, index) =>
      <li key={index} onClick={() => {
        const filterMails = this.state.allMail.filter(mail => {
          if (filter.id === 0 && mail.starred && mail.folder === this.state.selectedFolder) {
            return mail
          } else if (filter.id === 1 && mail.important && mail.folder === this.state.selectedFolder) {
            return mail
          }
          return null;
        });
        this.setState({
          noContentFoundMessage: 'No Mail found in selected filter',
          loader: true,
          folderMails: filterMails
        });
        setTimeout(() => {
          this.setState({ loader: false });
        }, 1500);
      }
      }>
        <span className="gx-link">
          <i className={`icon icon-${filter.icon}`} />
          <span>{filter.title}</span>
        </span>
      </li>
    )
  };
  onOptionMenuItemSelect = (e) => {
    switch (e.key) {
      case 'All':
        this.handleRequestClose();
        this.getAllMail();
        break;
      case 'None':
        this.handleRequestClose();
        this.getUnselectedAllMail();
        break;
      case 'Read':
        this.handleRequestClose();
        this.getReadMail();
        break;
      case 'Unread':
        this.handleRequestClose();
        this.getUnreadMail();
        break;
      case 'Starred':
        this.handleRequestClose();
        this.getStarredMail();
        break;
      case 'Unstarred':
        this.handleRequestClose();
        this.getUnStarredMail();
        break;
      case 'Important':
        this.handleRequestClose();
        this.getImportantMail();
        break;
      case 'Unimportant':
        this.handleRequestClose();
        this.getUnimportantMail();
        break;
      default:
        break;
    }
  };

  getAllMail = () => {
    let mails = this.state.allMail.map((mail) => mail.folder === this.state.selectedFolder ? {
      ...mail,
      selected: true
    } : mail);
    this.setState({
      selectedMails: mails.length,
      allMail: mails,
      optionName: 'All',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
  };
  getUnselectedAllMail = () => {
    let mails = this.state.allMail.map((mail) => mail.folder === this.state.selectedFolder ? {
      ...mail,
      selected: false
    } : mail);
    this.setState({
      selectedMails: 0,
      allMail: mails,
      optionName: 'None',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
  };
  getReadMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(mail => mail.folder === this.state.selectedFolder);
    mails = mails.map((mail) => {
      if (mail.read) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false }
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: 'Read',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
    return mails;
  };
  getUnreadMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(mail => mail.folder === this.state.selectedFolder);
    mails = mails.map((mail) => {
      if (!mail.read) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false }
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: 'Unread',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
    return mails;
  };
  getStarredMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(mail => mail.folder === this.state.selectedFolder);
    mails = mails.map((mail) => {
      if (mail.starred) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false }
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: 'Starred',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
    return mails;
  };
  getUnStarredMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(mail => mail.folder === this.state.selectedFolder && mail.folder === this.state.selectedFolder);
    mails = mails.map((mail) => {
      if (!mail.starred) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false }
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: 'UnStarred',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
    return mails;
  };
  getImportantMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(mail => mail.folder === this.state.selectedFolder && mail.folder === this.state.selectedFolder);
    mails = mails.map((mail) => {
      if (mail.important) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false }
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: 'Important',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
    return mails;
  };
  getUnimportantMail = () => {
    let selectedMail = 0;
    let mails = this.state.allMail.filter(mail => mail.folder === this.state.selectedFolder && mail.folder === this.state.selectedFolder);
    mails = mails.map((mail) => {
      if (!mail.important) {
        selectedMail++;
        return { ...mail, selected: true };
      }
      return { ...mail, selected: false }
    });
    this.setState({
      selectedMails: selectedMail,
      optionName: 'Unimportant',
      noContentFoundMessage: 'No Mail found in selected Label',
      folderMails: mails.filter(mail => mail.folder === this.state.selectedFolder)
    });
    return mails;
  };
  getNavLabels = () => {
    return labels.map((label, index) =>
      <li key={index} onClick={() => {
        const filterMails = this.state.allMail.filter(mail => mail.labels.includes(label.id) && mail.folder === this.state.selectedFolder);
        this.setState({
          loader: true,
          noContentFoundMessage: 'No Mail found in selected label',
          folderMails: filterMails
        });
        setTimeout(() => {
          this.setState({ loader: false });
        }, 1500);
      }
      }>
        <span className="gx-link">
          <i className={`icon icon-tag gx-text-${label.color}`} />
          <span>{label.title}</span>
        </span>
      </li>
    )
  };
  searchMail = (searchText) => {
    if (searchText === '') {
      this.setState({ folderMails: this.state.allMail.filter((mail) => !mail.deleted) });
    } else {
      const searchMails = this.state.allMail.filter((mail) =>
        !mail.deleted && mail.subject.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      this.setState({
        folderMails: searchMails
      });
    }
  };
  displayMail = (currentMail, folderMails, noContentFoundMessage) => {
    return (<div className="gx-module-box-column">
      {currentMail === null ?
        folderMails.length === 0 ?
          <div className="gx-no-content-found gx-text-light gx-d-flex gx-align-items-center gx-justify-content-center">
            {noContentFoundMessage}
          </div>
          :

          <MailList mails={folderMails} onStartSelect={this.onStartSelect.bind(this)}
            onMailSelect={this.onMailSelect.bind(this)}
            onMailChecked={this.onMailChecked.bind(this)}
            handleUserSelection={this.handleUserSelection.bind(this)} />
        :
        <MailDetail mail={currentMail} onStartSelect={this.onStartSelect.bind(this)}
          onImportantSelect={this.onImportantSelect.bind(this)} />}
    </div>)
  };
  getMailActions = () => {
    return <div className="gx-flex-row gx-align-items-center">

      <Dropdown overlay={this.folderMenu()} placement="bottomRight" trigger={['click']}>
        <i className="icon icon-folder gx-icon-btn" />
      </Dropdown>

      <Dropdown overlay={this.labelMenu()} placement="bottomRight" trigger={['click']}>
        <i className="icon icon-tag gx-icon-btn" />
      </Dropdown>

      <span onClick={this.onDeleteMail.bind(this)}>
        <i className="icon icon-trash gx-icon-btn" /></span>

    </div>
  };

  optionMenu = () => (
    <Menu id="option-menu"
      onClick={this.onOptionMenuItemSelect.bind(this)}>
      {options.map(option =>
        <Menu.Item key={option.title}>
          {option.title}
        </Menu.Item>,
      )}
    </Menu>);

  folderMenu = () => (
    <Menu id="folder-menu"
      onClick={this.onFolderMenuItemSelect.bind(this)}>
      {folders.map(folder =>
        <Menu.Item key={folder.id}>
          {folder.title}
        </Menu.Item>,
      )}
    </Menu>);

  labelMenu = () => (
    <Menu id="label-menu"
      onClick={this.onLabelMenuItemSelect.bind(this)}>
      {labels.map(label =>
        <Menu.Item key={label.id}>
          {label.title}
        </Menu.Item>,
      )}
    </Menu>
  );


  constructor(props) {
    super();
    let tempMails = []

    if (props.emails_bodies != null) {
      props.emails_bodies.map(e => {
        let date = new Date(e.createdAt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();


        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }

        let temp = {
          'id': e.id,
          'from': {
            'name': random_name(),
            'avatar': "https://via.placeholder.com/150x150",
            'email': e.from
          },
          'to': [
            {
              'name': random_name(),
              'email': randomEmail()
            }
          ],
          'subject': e.subject,
          'message': e.body,
          'time': year + '-' + month + '-' + dt,
          'read': false,
          'starred': false,
          'important': false,
          'hasAttachments': false,
          'labels': [],
          'selected': false,
          'folder': 0,
          'isPhishing': Math.random() < 0.4
        }

        tempMails.push(temp)

      })
    }


    this.state = {
      selected_email: {},
      searchMail: '',
      noContentFoundMessage: 'No Mail found in selected folder',
      alertMessage: '',
      showMessage: false,
      drawerState: false,
      optionName: 'None',
      anchorEl: null,
      allMail: tempMails,
      loader: true,
      currentMail: null,
      user: {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        avatar: "https://via.placeholder.com/150x150"
      },
      user_answers: [],
      isPhishing: Math.random() < 0.4,
      result: [],
      selectedMails: 0,
      selectedFolder: 0,
      composeMail: false,
      folderMails: tempMails.filter(mail => mail.folder === 0)
    }

  }
  handleUserSelection = (e) => {

    let userSelection = {
      id: e.target.id,
      value: e.target.attributes.value.nodeValue,
      text: e.target.attributes.text.nodeValue,
      subject: e.target.attributes.subject.nodeValue,
      email: e.target.attributes.from.nodeValue,
    }
    let updated_user_answers = this.state.user_answers
    updated_user_answers.push(userSelection)
    updated_user_answers = [...new Map(updated_user_answers.map(item => [item['id'], item])).values()]

    let emails = this.state.allMail
    emails.map(e => {
      if (e.id == userSelection.id) {
        e.labels.push(3)
      }
    })
    this.setState({ ...this.state, allMail: emails, user_answers: updated_user_answers })
    message.success('You have selected: ' + userSelection.text, 2)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    swal({
      title: "Confirmation",
      text: "Are you sure you want to submit your inspections to the clients?",
      icon: "info",
      buttons: true,
    })
      .then((decision) => {
        if (decision) {

          let user_answers = this.state.user_answers
          let emails = this.state.allMail
          //let result = this.check_answers(user_answers, emails)
          //this.setState({...this.state, result })
          //let percentage = (result[0] / result[1]) * 100
          // if (percentage > 75) {
          //   swal(`Congratulation! You have scored ${percentage}%`, {
          //     icon: "success",
          //   })
          // } else { 

          let url = "https://api.mailslurp.com/inboxes/14e0c2a4-0624-4e5a-b8b0-6cc2dd893a85?apiKey=673ba1248cc664ce1099171659818622acdc62c23dcab27ce51c4aeb409ab094"
          let data = {
            "body": "asd",
            "isHTML": true,
            "subject": "Phishing Inspection Result",
            "to": [
              ''
            ]
          }

          if (user_answers.length == 1) {
            let body = `Dear user, the email "${user_answers[0].subject}"\nwith id# ${user_answers[0].id} \nhas been inspected by our team and we found that it is a ${user_answers[0].text} email`
            data['body'] = body
            data['to'] = [user_answers[0].email]
            //console.log(`Dear user, the email "${user_answers[0].subject}"\nwith id# ${user_answers[0].id} \nhas been inspected by our team and we found that it is a ${user_answers[0].text} email`);

            axios.post(url, data, {
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then(res => {
              console.log(res)
              notification.success({ description: `The email inspection of "${user_answers[0].subject}"\n has been sent to the client as ${user_answers[0].text} email.\n`, duration: 10 })

            }

            ).catch(error => {
              console.log(error)
              notification.error("MailSlurp doesn't support the domain of this email " + user_answers[0].email)
            }
            )

            // swal(`${user_answers.length} Email were inspected and the result was sent to the client`, {
            //   icon: "success",
            // })

            { /*
              host: 'mtp.sparkpostmail.com',
              port: 587
              username: 'SMTP_Injection',
              password: '5c3aac4c97fb528b4a03e02457701fcb2ba72698'



            */}

          } else {
            user_answers.map(ans => {
              let body = `Dear user, the email "${ans.subject}"\nwith id# ${ans.id} \nhas been inspected by our team and we found that it is a ${ans.text} email.\n`
              data['body'] = body
              data['to'] = [ans.email]

              axios.post(url, data, {
                headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }).then(res => {
                console.log(res)
                notification.success({ description: `The email inspection of "${ans.subject}"\n has been sent to the client as ${ans.text} email.\n`, duration: 5 })

              }).catch(error => {
                console.log(error)
                notification.error("MailSlurp doesn't support the domain of this email " + user_answers[0].email)
              }
              )

            })
            // swal(`${user_answers.length} Emails were inspected and the results were sent to the clients`, {
            //   icon: "success",
            // })

          }
        }

      })
  }



  // handleSubmit = (e) => { 
  //   e.preventDefault()
  //   swal({
  //     title: "Confirmation",
  //     text: "Are you sure you want to submit your answers?",
  //     icon: "info",
  //     buttons: true,
  //   })
  //     .then((decision) => {
  //       if (decision) {

  //         let user_answers = this.state.user_answers
  //         let emails = this.state.allMail
  //         let result = this.check_answers(user_answers, emails)
  //         this.setState({...this.state, result })
  //         let percentage = (result[0] / result[1]) * 100
  //         if (percentage > 75) {
  //           swal(`Congratulation! You have scored ${percentage}%`, {
  //             icon: "success",
  //           })
  //         } else { 
  //           console.log('you have scored: ' + percentage)
  //           swal(`You have scored less than 75%, Please try again!`, {
  //             icon: "warning",
  //           })
  //         }


  //       }
  //     })
  // }

  check_answers = (answers, emails) => {
    // console.log(answers)
    // console.log(emails)
    let count = 0
    emails.map(e => {
      //console.log(e.id, e.isPhishing);
      let user_ans = answers.find(ans => ans.id === e.id).value
      //console.log(answers.find(ans => ans.id === e.id).value)
      if (e.isPhishing == false && user_ans == 0 || e.isPhishing == true && user_ans == 1) {
        count++
      }
    })

    let results = [count, emails.length]
    return results

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);

  }


  onMailChecked(data) {
    data.selected = !data.selected;
    let selectedMail = 0;
    const mails = this.state.folderMails.map(mail => {
      if (mail.selected) {
        selectedMail++;
      }
      if (mail.id === data.id) {
        if (mail.selected) {
          selectedMail++;
        }
        return data;
      } else {
        return mail;
      }
    }
    );
    this.setState({
      selectedMails: selectedMail,
      folderMails: mails
    });
  }

  onAllMailSelect() {
    const selectAll = this.state.selectedMails <= this.state.folderMails.length;
    if (selectAll) {
      this.getAllMail();
    } else {
      this.getUnselectedAllMail();
    }
  }

  removeLabel(mail, label) {
    mail.labels.splice(mail.labels.indexOf(label), 1);
    if (this.state.currentMail !== null && mail.id === this.state.currentMail.id) {
      this.setState({
        currentMail: { ...mail, labels: mail.labels }
      })
    }
    return mail.labels;
  }

  onStartSelect(data) {
    data.starred = !data.starred;
    this.setState({
      alertMessage: data.starred ? 'Mail Mark as Star' : 'Mail Remove as Star',
      showMessage: true,
      folderMails: this.state.folderMails.map(mail =>
        mail.id === data.id ?
          data : mail
      )
    });
  }

  onImportantSelect(data) {
    data.important = !data.important;
    this.setState({
      alertMessage: data.important ? 'Mail Mark as Important' : 'Mail Remove as Important',
      showMessage: true,
      folderMails: this.state.folderMails.map(mail =>
        mail.id === data.id ?
          data : mail
      )
    });
  }

  onMailSend(data) {
    this.setState(
      {
        alertMessage: 'Mail Sent Successfully',
        showMessage: true,
        folderMails: this.state.allMail.concat(data),
        allMail: this.state.allMail.concat(data)
      }
    );
  }

  onMailSelect(mail) {

    this.setState({
      loader: true,
      currentMail: mail,
    });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  }

  addLabel(mail, label) {
    if (this.state.currentMail !== null && mail.id === this.state.currentMail.id) {
      this.setState({
        currentMail: { ...mail, labels: mail.labels.concat(label) }
      })
    }
    return mail.labels.concat(label)
  }


  render() {
    let progress_circle_size = (Object.keys(this.state.user_answers).length / this.state.allMail.length) * 100

    const { selectedMails, loader, currentMail, drawerState, folderMails, composeMail, user, alertMessage, showMessage, noContentFoundMessage } = this.state;
    return (

      <div className="gx-main-content">
        <div className="gx-app-module">

          {/* <div className="gx-d-block gx-d-lg-none">
            <Drawer
              placement="left"
              closable={false}
              visible={drawerState}
              onClose={this.onToggleDrawer.bind(this)}>
              {this.MailSideBar()}
            </Drawer>

          </div>
          <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
            {this.MailSideBar()}
          </div> */}

          <div className="gx-module-box">
            {/* <div className="gx-module-box-header">
              <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                  <i className="icon icon-menu gx-icon-btn" aria-label="Menu"
                     onClick={this.onToggleDrawer.bind(this)}/>
              </span>
              <AppModuleHeader placeholder="Search mails" user={this.state.user}
                               onChange={this.updateSearch.bind(this)}
                               value={this.state.searchMail}/>

            </div> */}

            <div className="gx-module-box-content">
              <Progress strokeColor="#cb42f5" style={{ marginBottom: 15 }} percent={progress_circle_size} />
              <div className="gx-module-box-topbar">
                {this.state.currentMail === null ?
                  <div className="gx-flex-row gx-align-items-center">
                    {this.state.folderMails.length > 0 ?
                      progress_circle_size > 1 ? (
                        <Button type="danger" shape="round" onClick={this.handleSubmit}> <SaveFilled />Submit</Button>
                      ) : null
                      // <Auxiliary>
                      //   {/* <Checkbox color="primary" className="gx-icon-btn"
                      //             indeterminate={selectedMails > 0 && selectedMails < folderMails.length}
                      //             checked={selectedMails > 0}
                      //             onChange={this.onAllMailSelect.bind(this)}
                      //             value="SelectMail"/> */}

                      //   <Dropdown overlay={this.optionMenu()} placement="bottomRight" trigger={['click']}>
                      //     <div>
                      //       <span className="gx-px-2"> {this.state.optionName}</span>
                      //       <i className="icon icon-charvlet-down" /></div>
                      //   </Dropdown>
                      // </Auxiliary>
                      : null}
                  </div>
                  :
                  <i className="icon icon-arrow-left gx-icon-btn" onClick={() => {
                    this.setState({ currentMail: null })
                  }} />
                }

                <div classID="toolbar-separator" />

                {(selectedMails > 0) && this.getMailActions()}

              </div>

              {loader ?
                <div className="gx-loader-view">
                  <CircularProgress />
                </div>
                : this.displayMail(currentMail, folderMails, noContentFoundMessage)}

              {/* <ComposeMail open={composeMail} user={user}
                           onClose={this.handleRequestClose.bind(this)}
                           onMailSend={this.onMailSend.bind(this)}/> */}

            </div>
          </div>
        </div>
        {showMessage && message.info(<span id="message-id">{alertMessage}</span>, 3, this.handleRequestClose)}
      </div>
    )
  }
}

export default Mail;
