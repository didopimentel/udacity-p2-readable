import React, { Component } from 'react'
import convertTimestamp from '../utils/msToDate'
import { connect } from 'react-redux'
import { Badge, Collapse, Card, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import TiDeleteOutline  from 'react-icons/lib/ti/delete-outline'
import { removeComment, voteComment, editComment, voteDownComment } from '../actions'
import * as Api from '../api'

class Comment extends Component {

	constructor(props){
		super(props)
		this.toggleCollapse = this.toggleCollapse.bind(this)
		this.voteDown = this.voteDown.bind(this)
		this.state = {
			collapseIsOpen: false,
			editBody: props.comment.body
		}
	}


	delete(comment){
		this.props.dispatch(removeComment(comment))
		Api.deleteComment(comment.id).then()
	}

	voteUp(comment){
		this.props.dispatch(voteComment(comment))
		Api.voteComment('upVote', comment.id)
		this.forceUpdate()
	}

	voteDown(comment){
		this.props.dispatch(voteDownComment(comment))
		Api.voteComment('downVote', comment.id)
		this.forceUpdate()
	}

	toggleCollapse(){
		this.setState({
			collapseIsOpen: !this.state.collapseIsOpen
		})
	}

	editBodyHandler(e){
		this.setState({
			editBody: e.target.value
		})
	}

	edit(comment){
		comment = {
			...comment,
			body: this.state.editBody
		}
		this.props.dispatch(editComment(comment))
		Api.editComment(comment.id, Date.now(), this.state.editBody).then((res) => console.log(res))
		this.toggleCollapse()
	}

	render(){
		const { comment } = this.props
		const time = convertTimestamp(comment.timestamp)
		return(
		<div>
			<div className="text-muted comment-header">
				{comment.author} comentou às {time}:
				<div className="float-right">
					<Badge className="apply-margin-right">{comment.voteScore} </Badge>
					<TiDeleteOutline className="delete-comment-button" onClick={() => this.delete(comment)} />
				</div>
				<div className="float-right">
					<span className="apply-padding-right vote-comment">Vote</span>
					<Link className="post-links" to="#" onClick={() => this.voteDown(comment)}>-</Link>
					<Link className="post-links" to="#" onClick={() => this.voteUp(comment)}>+</Link>
					<span className="apply-padding-right apply-padding-left edit-comment" onClick={this.toggleCollapse}>Edit</span>
				</div>
			</div>
			<p className="comment-body">{comment.body}</p>

			<Collapse isOpen={this.state.collapseIsOpen} >
				<Card>
					<Input type="textarea" value={this.state.editBody} onChange={(e) => this.editBodyHandler(e)} />
					<hr/>
					<Button outline color="danger" onClick={() => this.edit(comment)}>Done</Button>
				</Card>
			</Collapse>

			<hr/>
		</div>

		)
	}

}


export default connect()(Comment)
