import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      watching: "Watch",
      isWatching: false
    }
  }
  
  componentDidMount() {

    console.log(this.props.match.params.id);
    API.getArticleById(this.props.match.params.id)
      .then(result => {
        console.log(result);
        this.setState({ article: result.data })
      })
      .catch(err => console.log(err));

    API.getSavedArticles(this.props.user._id)
      .then(result => {
        (result.data.savedArticles) ? result.data.savedArticles.map(a => {
          if (a._id === this.props.match.params.id) {
            return this.setState({watching: "Watching", isWatching: true});
          } 
        }) : this.setState({watching: "Watch", isWatching: false})
      });
  }

  handleWatch = articleId => {
    let data = {articleId};
    API.getSavedArticles(this.props.user._id)
      .then(result => {
        const { savedArticles } = result.data;
        let noArticle = 0;
        if (savedArticles.length !== undefined) {
          savedArticles.map(article => {
            // eslint-disable-next-line no-unused-expressions
            (savedArticles._id !== articleId) ? noArticle++ : noArticle;
          });

          if (noArticle === savedArticles.length) { 
            API.addSavedArticle(this.props.user._id, data)
              .then(result => console.log(result))
              .catch(err => console.log(err));
            this.setState({watching: "Watching", isWatching: true});
          } 
        } else {
          if (savedArticles._id !== articleId)  {
            API.addSavedArticle(this.props.user._id, data)
              .then(result => console.log(result))
              .catch(err => console.log(err));
            this.setState({watching: "Watching", isWatching: true}); 
          } 
        }
      });
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value  } = event.target;
    this.setState({ [name]: value});
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col size="md-8 sm-12">
                <Row>
                  <Col size="md-10">
                    <h1>Article</h1>
                  </Col>
                  <Col size="md-2">
                  {(this.state.isWatching === false) ? <SaveBtn className="btn btn-lg btn-warning text-dark" onClick={() => this.handleWatch(this.props.match.params.id)}>{this.state.watching}</SaveBtn>
                    : <SaveBtn className="btn btn-lg btn-warning text-dark">{this.state.watching}</SaveBtn>
                  }
                  </Col>
                </Row>
                <Card id={this.state.article._id} url={this.state.article.link} title={this.state.article.headLine}/>
            </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Detail;