import React from "react";
import { message, Avatar, Checkbox } from "antd";

import labels from "routes/inBuiltApps/Mail/data/labels";

const MailListItem = ({ mail, onMailSelect, onMailChecked, onStartSelect, handleUserSelection }) => {


  return (
    <div className="gx-module-list-item gx-mail-cell">
      <div className="gx-module-list-icon">
        {/* <Checkbox color="primary" className="gx-icon-btn"
                  checked={mail.selected}
                  onClick={(event) => {
                    event.stopPropagation();
                    onMailChecked(mail)
                  }}
                  value="SelectMail"
        /> */}
        {/* <div onClick={() => {
          onStartSelect(mail);
        }}>
          {mail.starred ?
            <i className="gx-icon-btn icon icon-star"/> :
            <i className="gx-icon-btn icon icon-star-o"/>
          }

        </div> */}

        {/* <div className="gx-ml-2">
          {mail.from.avatar === '' ?
            <Avatar className="gx-avatar gx-bg-blue gx-size-40"> {mail.from.name.charAt(0).toUpperCase()}</Avatar> :
            <Avatar className="gx-size-40" alt="Alice Freeman"
                    src={mail.from.avatar}/>
          }
        </div> */}
      </div>

      <div className="gx-mail-list-info" onClick={() => {
        onMailSelect(mail);
      }}>

        <div className="gx-module-list-content">
          <div className="gx-mail-user-des">

            <span className="gx-sender-name">{mail.from.name}</span>

            <span className="gx-toolbar-separator">&nbsp;</span>

            <span className="gx-d-inline-block gx-text-truncate gx-send-subject">{mail.subject}</span>

            {mail.hasAttachments &&

              <i className="icon icon-attachment" />}

            <div className="gx-time">{mail.time}</div>

          </div>



          <div className="gx-labels">
            <div className="gx-message">
              <p className="gx-text-truncate"> {mail.message}</p>
            </div>

            {labels.map((label, index) => {
              return (mail.labels).includes(label.id) &&
                <div key={index} className={`gx-badge gx-text-white gx-bg-${label.color}`}>{label.title}</div>
            })}
          </div>

        </div>

      </div>
      <span className="gx-toolbar-separator">&nbsp;&nbsp;</span>

      <div key={mail.id} className="gx-labels">
        <div className={`gx-badge gx-text-white gx-bg-green`}><span from={mail.from.email} id={mail.id} subject={mail.subject} value={0} text={'Real'} onClick={(e) => handleUserSelection(e)}>Real</span></div>
        <div className={`gx-badge gx-text-white gx-bg-red`}><span from={mail.from.email} id={mail.id} subject={mail.subject} value={1} text={'Phishing'} onClick={(e) => handleUserSelection(e)} >Phishing</span></div>
      </div>

    </div>
  )
};

export default MailListItem;
