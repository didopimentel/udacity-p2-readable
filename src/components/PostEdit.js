import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container,
         Card,
         CardHeader,
         CardBody,
         Button,
         Input,
         CardFooter
       } from 'reactstrap'
import { editPost } from '../actions'
import * as Api from '../api'


class PostEdit extends Component {

  state = {
    title: this.props.post.title,
    body: this.props.post.body
  }

  titleController(e){
    this.setState({
      title: e.target.value
    })
  }

  bodyController(e){
    this.setState({
      body: e.target.value
    })
  }

  edit(post){
    const editedPost = {
      ...post,
      body: this.state.body,
      title: this.state.title
    }
    this.props.dispatch(editPost(editedPost))
    Api.editPost(post.id, editedPost.title, editedPost.body)
       .then()

  }

  render(){
    const { post } = this.props
    return(
      <Container>
        <Card>
          <CardHeader>
            <p>Edit post: </p>
            <Input
              type="text"
              value={this.state.title}
              onChange={(e) => this.titleController(e)}
            />
          </CardHeader>
          <CardBody>
            <Input
              type="textarea"
              value={this.state.body}
              onChange={(e) => this.bodyController(e)}
            />
          </CardBody>
          <CardFooter>
            <Button
              onClick={() => this.edit(post)}
            >
              Done!
            </Button>
          </CardFooter>
        </Card>
      </Container>
    )
  }


}

function mapStateToProps( state, ownProps ){
  return {
    post: state.post.filter((post) => post.id === ownProps.match.params.id)
                    .reduce((obj, item) => {
                      obj = item
                      return obj
                    }, {})
  }
}

export default connect(mapStateToProps)(PostEdit)
