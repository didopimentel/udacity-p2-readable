import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Badge } from 'reactstrap';
import { connect } from 'react-redux'
import { removePost, votePost, voteDownPost } from '../actions'
  import convertTimestamp from '../utils/msToDate'
  import CommentPopover from './CommentPopover'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import  MdKeyboardControl  from 'react-icons/lib/md/keyboard-control'
import * as Api from '../api'

class Post extends Component{


  constructor(props){
    super(props);
    this.togglePopover = this.togglePopover.bind(this)
    this.remove = this.remove.bind(this)
    this.state = {
      popoverIsOpen: false
    }
  }

  togglePopover(){
    this.setState({
      popoverIsOpen: !this.state.popoverIsOpen
    })
  }

  remove(post){
    this.props.dispatch(removePost(post))
    Api.deletePost(post.id).then()
  }

  voteUp(post){
    this.props.dispatch(votePost(post))
    Api.votePost('upVote', post.id).then()
  }

  voteDown(post){
    this.props.dispatch(voteDownPost(post))
    Api.votePost('downVote', post.id).then()
  }


	render(){
    const { thisPost, comments } = this.props
    const numOfComments = comments.length
		return(

		<Card>
			<CardHeader>
        <div className="container-header clearfix" >
          Category: {thisPost.category}
          <div className="float-right"> Number of Comments: {numOfComments}</div>
          <div className="float-right post-counter">
              <span className="postCounter" >Score</span>
              <Badge className="postCounterBadge" color="secondary">{thisPost.voteScore} </Badge>
          </div>
        </div>
        <hr/>
				<Row>
					<Col>
						{thisPost.author} postou às {convertTimestamp(thisPost.timestamp)}:
					</Col>
					<Col>
            <div className="float-right" >
                  Vote
                  <Link className="post-links" to="#" onClick={() => this.voteUp(thisPost)}>+</Link>
                  <Link className="post-links" to="#" onClick={() => this.voteDown(thisPost)}>-</Link>
                  <span className="breaker">|</span>
                  <Link className="post-links" to={'/posts/' + thisPost.id}>Edit</Link>
                  <Link to='#' onClick={() => this.remove(thisPost)}>Delete</Link>
                </div>
					</Col>
				</Row>
			</CardHeader>
            <CardBody>
            	<CardTitle>{thisPost.title}</CardTitle>
            	<CardText>{thisPost.body}</CardText>
            </CardBody>
            <CardFooter>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment}  />
              )
              )}
            	<CommentPopover postId={thisPost.id} isOpen={this.state.popoverIsOpen} toggle={this.togglePopover} />
            </CardFooter>
        </Card>

		)
	}
}

function mapStateToProps( state, ownProps ) {
  const postId = ownProps.thisPost.id
  return {
    comments: state.comment.filter((comment) => comment.parentId === postId)
  }
}

export default connect(mapStateToProps)(Post);
