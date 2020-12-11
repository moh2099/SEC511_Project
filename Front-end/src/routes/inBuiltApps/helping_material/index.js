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
        selected_yt: '',
        yt_videos_ids: ['XsOWczwRVuc', 'zflsg6TRuos', 'Y7zNlEMDmI4', 'i0iLy8racHI', 'i_u0Si86NsU']
    }

    showModal = (yt_id) => {
        this.setState({
            isOpen: true,
            selected_yt: yt_id
        });
    };

    render() {
        return (
            <Card title="Helping Material" className="gx-card">  {/**  style={{marginLeft: 230, width: 750}}  */}
                <Row style={{ margin: 50, marginTop: 10 }}>
                    {
                        this.state.yt_videos_ids.map(yt_id => {
                            return (
                                <Col >
                                    <img
                                        style={{ margin: 20 , borderRadius: '5%' }}
                                        onClick={() => this.showModal(yt_id)}
                                        width={300}
                                        src={`https://img.youtube.com/vi/${yt_id}/maxresdefault.jpg`}
                                    ></img>

                                </Col>
                            )

                        })
                    }
                    <ModalVideo width={800} height={450} channel='youtube' onClose={() => this.setState({ isOpen: false })} isOpen={this.state.isOpen} videoId={this.state.selected_yt} />  {/** the width and height props were added toModalVido component manully, they were not exist, you may check the repo in moh2099/react-modal-video */}

                </Row>
            </Card>
        )
    }
}

export default Helping_material;