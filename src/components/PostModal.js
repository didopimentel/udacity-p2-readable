import React, { Component } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Button,
  Label
   } from 'reactstrap'
import { addPost } from '../actions'
import { connect } from 'react-redux'
import * as Api from '../api'

  class PostModal extends Component{

  	constructor(props){
  		super(props);
  		this.post = this.post.bind(this)
  	}

  	state = {
  		postAuthor: '',
      postTitle: '',
  		postBody: '',
      postCategory: 'React',
  	}

	post(){
  		const { postAuthor, postTitle, postBody, postCategory } = this.state
      const apiPost = {
        id: `${postAuthor}${Date.now()}`,
        timestamp: Date.now(),
        title: postTitle,
        body: postBody,
        author: postAuthor,
        category: postCategory,
      }
  		if (postAuthor !== '' || postBody !== ''){
  			this.props.dispatch(addPost({
  			  				id: `${postAuthor}${Date.now()}`,
  			  				author: postAuthor,
                  category: postCategory,
                  deleted: false,
  			  				title: postTitle,
  			  				body: postBody,
  			  				timestamp: Date.now(),
  			  				voteScore: 1
  			  			}))
        Api.postPost(apiPost).then(() => this.props.toggleSuccess())
  		}

      this.setState({
        postAuthor: '',
        postTitle: '',
        postBody: '',
      })

  		this.props.toggleModal()
  	}


    categoryController(e){
      this.setState({
        ...this.state,
        postCategory: e.target.value
      })
    }

  	nameController(e) {
  		this.setState({
  			...this.state,
  			postAuthor: e.target.value
  		})  	}

  	bodyController(e){
  		this.setState({
  			...this.state,
  			postBody: e.target.value
  		})
  	}

    titleController(e){
      this.setState({
        ...this.state,
        postTitle: e.target.value
      })
    }

  	render(){
  		return(
	  		<Modal backdrop={this.props.backdrop} keyboard={false} isOpen={this.props.modalIsOpen} toggle={this.props.toggleModal}>
	          <ModalHeader>
	            <Form inline className="clearfix">
	              <FormGroup className="post-modal-form-group" size="sm">
	                <Input
	                	type="text"
	                	value={this.state.postAuthor}
	                	onChange={(e) => this.nameController(e)}
	                	placeholder="Your name" />
	              </FormGroup>
                <FormGroup className="post-modal-form-group float-right" size="sm">
                  <Label for="selectCategory" size="sm"> Category: </Label>
                  <Input
                    type="select"
                    name="selectCategory"
                    id="selectCategory"
                    value={this.state.postCategory}
                    onChange={(e) => this.categoryController(e)}
                    >
                      <option value="react">React</option>
                      <option value="redux">Redux</option>
                      <option value="udacity">Udacity</option>
                  </Input>
                </FormGroup>
	            </Form>
	          </ModalHeader>
	          <ModalBody>
	            <Form>
	              <FormGroup className="post-modal-form-group">
                  <Input
                    type="text"
                    value={this.state.postTitle}
                    onChange={(e) => this.titleController(e)}
                    placeholder="Post title" />
	                <Input
	                	type="textarea"
	                	className="postContainer"
	                	value={this.state.postBody}
	                	onChange={(e) => this.bodyController(e)}
	                	placeholder="Write your post here..."/>
	              </FormGroup>
	            </Form>
	          </ModalBody>
	          <ModalFooter>
	            <Button color="primary" onClick={this.post}>Post!</Button>{' '}
	            <Button color="secondary" onClick={this.props.toggleModal}>Nevermind</Button>
	          </ModalFooter>
	        </Modal>
  		  		)
  	}

  }


  export default connect()(PostModal)
