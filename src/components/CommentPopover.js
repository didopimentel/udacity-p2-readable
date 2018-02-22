import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { addComment } from '../actions'
import * as Api from '../api'

class CommentPopover extends Component {


  	constructor(props){
  		super(props);
  		this.postComment = this.postComment.bind(this)
  	}

	state = {
		nameText: '',
		commentText: ''
	}

	nameController(e){
		this.setState({
			...this.state,
			nameText: e.target.value
		})
	}

	commentController(e){
		this.setState({
			...this.state,
			commentText: e.target.value
		})
	}

	postComment(){
		if (this.state.nameText !== ''	&& this.state.commentText !== ''){
			this.props.dispatch(addComment({
				id: `${this.state.nameText}${Date.now()}`,
				author: this.state.nameText,
				parentId: this.props.postId,
				timestamp: Date.now(),
				body: this.state.commentText,
				voteScore: 0,
				deleted: false,
				parentDeleted: false
			}))

			Api.postComment({
				id: `${this.state.nameText}${Date.now()}`,
				timestamp: Date.now(),
				body: this.state.commentText,
				author: this.state.nameText,
				parentId: this.props.postId
			}).then((res) => console.log(res))

		}

		this.setState({
			nameText: '',
			commentText: ''
		})

		this.props.toggle()
	}

	render(){
		return(
			<div className="popoverDiv">
				<Button color="info" size="sm" id="cmntPopover" onClick={this.props.toggle}> Comment </Button>
				<Popover innerClassName="popover" placement="left" isOpen={this.props.isOpen} target="cmntPopover" toggle={this.props.toggle}>
					<PopoverHeader>
						<Input
							type="text"
							onChange={(e) => this.nameController(e)}
							placeholder="Your name"
							value={this.state.nameText}/>
					</PopoverHeader>
					<PopoverBody>
						<Input
							className="commentContainer"
							onChange={(e) => this.commentController(e)}
							type="textarea"
							placeholder="Comment..."
							value={this.state.commentText}/>
					</PopoverBody>
					<Button color="danger" onClick={this.postComment} > Post comment! </Button>
				</Popover>
			</div>
		)
	}
}


export default connect()(CommentPopover)
