import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
// import IntlMessages from "../../../util/IntlMessages";
import { Card, Col, Row, message, Modal, Button } from 'antd';
// import Basic from '../../components/feedback/Progress/Basic' //default calsses which are exported as default shouldn't be imported between {}
import { Pagination } from 'antd';
import swal from 'sweetalert'
import history from "react-router-dom";
import ModalVideo from 'react-modal-video' // This needs the @import '../../node_modules/react-modal-video/scss/modal-video.scss'; in less format not scss to be inserted in styles.less file, you may convert form scss to less online

class Helping_material extends PureComponent {

    state = {
        isOpen: false,
    }

    showModal = () => {
        this.setState({
            isOpen: true,
        });
    };

    render() {
        let width = 800
        let height = 450
        return (
            <Card title="Helping Material" className="gx-card">  {/**  style={{marginLeft: 230, width: 750}}  */}
                <Button type="primary" onClick={this.showModal}> Open Video</Button>
                <ModalVideo width={width} height={height} channel='youtube' onClose={() => this.setState({isOpen: false})} isOpen={this.state.isOpen} videoId='XsOWczwRVuc' /> {/** the width and height props were added toModalVido component manully, they were not exist, you may check the repo in moh2099/react-modal-video */}
            </Card>
        )
    }
}

export default Helping_material;