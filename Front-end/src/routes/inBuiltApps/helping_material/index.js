import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
// import IntlMessages from "../../../util/IntlMessages";
import { Card, Col, Row, message } from 'antd';
// import Basic from '../../components/feedback/Progress/Basic' //default calsses which are exported as default shouldn't be imported between {}
import { Pagination } from 'antd';
import swal from 'sweetalert'
import history from "react-router-dom";

class Helping_material extends PureComponent {

  

  state = {
 
  }
 

  componentDidMount() {
   }
   

  render() {
 
    return (
      <Card title="Helping Material" className="gx-card">  {/**  style={{marginLeft: 230, width: 750}}  */}
        <Row style={{ marginLeft: 55 }}> {/** style={{ marginLeft: 55 }}  */}
          <Col>
             
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Helping_material;