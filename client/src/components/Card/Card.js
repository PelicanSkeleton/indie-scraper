import React from "react";
import CardBtn from "../CardBtn";
import { Row, Col } from "../Grid";

const Card = props => (
  <div className="card my-2">
    <div className="card-header text-center">
      <Row>
        <Col size="md-10">
          <h5><a href={props.link}>{props.title}</a></h5>
        </Col>
        <Col size="md-2">
          <CardBtn id={props.id} content="Notes" data-value={props.id} href="/notes"/>
        </Col>
      </Row>
    </div>
    <div className="card-body">
      {props.link}
    </div>
  </div>
);

export default Card;