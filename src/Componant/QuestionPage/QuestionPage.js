import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { BsFillTagFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import uploadImg from "../../Image/uploadImg.jpg";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./QuestionPage.css";
import Answer from "./Answers/Answers";
class Qustion extends Component {
  state = {
    questionInput: "",
    questionCategory: "",
    points: 0,
    questionFeedback: "",
    answers: [
      { answer: "", feedback: "", currectAns: true },
      { answer: "", feedback: "", currectAns: false },
      { answer: "", feedback: "", currectAns: false },
      { answer: "", feedback: "", currectAns: false },
    ],
    showCategore: false,
  };
  getQuestion = (event) => {
    this.setState({ questionInput: event.target.value });
  };
  getQuestionFeedback = (event, editor) => {
    this.setState({ questionFeedback: editor.getData() });
    console.log(this.state);
  };
  getQuestionPoints = (event) => {
    this.setState({ points: event.target.value });
  };
  getQuestionCategory = (event) => {
    this.setState({ questionCategory: event.target.value });
  };
  addCatog = () => {
    this.setState({ showCategore: !this.state.showCategore });
  };
  addCurrectAns = (i) => {
    let allAns = [...this.state.answers];
    allAns.map((elemnt, index) => {
      if (i === index) {
        elemnt.currectAns = true;
      } else {
        elemnt.currectAns = false;
      }
      this.setState({ answers: allAns });
    });
  };
  addAnsFeedpack = (event, editor, index) => {
    let allAns = [...this.state.answers];
    allAns[index].feedback = editor.getData();
    this.setState({ answers: allAns });
  };
  addAns = (event, index) => {
    let allAns = [...this.state.answers];
    allAns[index].answer = event.target.value;
    this.setState({ answers: allAns });
    console.log(this.state.answers);
  };
  deletAns = (index) => {
    let allAns = [...this.state.answers];
    allAns = allAns
      .slice(0, index)
      .concat(allAns.slice(index + 1, allAns.length));
    this.setState({ answers: allAns });
    console.log(this.state);
  };
  addNewAns = () => {
    let ans = { answer: "", feedback: "", currectAns: false };
    this.setState({ answers: [...this.state.answers, ans] });
  };

  render() {
    return (
      <div>
        <Container className="QuestionContainer">
          <Row className="upperRow">
            <Col sm="12">
              <input
                placeholder="Type your question here"
                className="QuestionInput"
                onChange={this.getQuestion}
              />
              {this.state.showCategore ? (
                <input
                  onChange={this.getQuestionCategory}
                  placeholder="Choose an existing category"
                  className="QuestionInput"
                />
              ) : null}
            </Col>
          </Row>
          <Row className="middleRow">
            <Col sm="6" md="4">
              <span> Points * </span>
              <input
                type="number"
                placeholder="0"
                onChange={this.getQuestionPoints}
              />
            </Col>
            <Col sm="6" md="4">
              <button className="QuestionBtn" onClick={this.addCatog}>
                <BsFillTagFill className="QuestionIcon" />
                Categorize question
              </button>
            </Col>
            <Col sm="12" md="4">
              <button className="QuestionBtn">
                <FaCamera className="QuestionIcon" />
                Add Image (498 x 280)
              </button>
            </Col>
          </Row>
          <Row className="bootomRow">
            <Col lg="4" sm="12">
              <p className="QuestionP">Feedback image</p>
              <div className="uploadImgDiv">
                <img src={uploadImg} className="uploadImage" />
                <p>568 x 240</p>
              </div>
            </Col>
            <Col lg="8" sm="12">
              <p className="QuestionP">Question feedback</p>
              <CKEditor
                editor={ClassicEditor}
                className="QuestionTextArea"
                onChange={(event, editor) =>
                  this.getQuestionFeedback(event, editor)
                }
              />
            </Col>
          </Row>
        </Container>
        {this.state.answers.map((elemnt, index) => (
          <Answer
            index={index}
            deletAnswer={this.deletAns}
            addCurrectAns={this.addCurrectAns}
            key={index}
            addAnswer={this.addAns}
            addAnsFeedpack={this.addAnsFeedpack}
          />
        ))}
        <button className="addAnswerBtn" onClick={this.addNewAns}>
          {" "}
          <AiOutlinePlus /> Add Answer{" "}
        </button>
        <button onClick={() => this.props.addQuestion(this.state)}>Save Question</button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (state) => dispatch({ type: "addQuestion", val: state }),
  };
};

export default connect(null, mapDispatchToProps)(Qustion);
