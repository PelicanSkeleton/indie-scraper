import React from "react";
import { Row, Col } from "../Grid";
import DeleteBtn from "../../components/DeleteBtn";

export const SavedCard = props => (
  <div className="card my-2">
    <div className="card-header text-center">
      <Row>
        <Col size="md-10">
          <h5><a href={props.url}>{props.title}</a></h5>
        </Col>
        <Col size="md-2">
          <DeleteBtn onClick={props.removeArticle}/>
        </Col>
      </Row>
    </div>
    <div className="card-body">
      {props.link}
    </div>
  </div>
);