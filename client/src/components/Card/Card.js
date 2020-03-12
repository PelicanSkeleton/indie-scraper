import React from "react";
import { Row, Col } from "../Grid";

const Card = props => (
  <div className="card my-2">
    <div className="card-header text-center">
      <Row>
        <Col size="md-10">
          <h5><a href={props.link}>{props.title}</a></h5>
        </Col>
      </Row>
    </div>
    <div className="card-body">
      {props.link}
    </div>
  </div>
);

export default Card;