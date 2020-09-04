import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TiDeleteOutline } from "react-icons/ti";
import "./Answers.css";
const Answer = (props) => (
  <div>
    <Container className="AnserContainer">
      <Row>
        <Col sm="1">
          <input
            type="radio"
            className="option-input radio"
            name="example"
            onChange={() => props.addCurrectAns(props.index)}
          />{" "}
        </Col>
        <Col sm="11" className="AnswerCol">
          <input
            placeholder="Answer"
            className="AnswerInput"
            onChange={(event) => props.addAnswer(event, props.index)}
          />
          <p className="QuestionP">Feedback for answer</p>
          <CKEditor
            editor={ClassicEditor}
            className="QuestionTextArea"
            onChange={(event, editor) =>
              props.addAnsFeedpack(event, editor, props.index)
            }
          />
          <button
            className="deletBtn"
            onClick={() => props.deletAnswer(props.index)}
          >
            <TiDeleteOutline className="deletIcon" />
          </button>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Answer;
