import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavbarBrand,
  Button,
  NavLink,
  Alert,
  Fade
} from 'reactstrap';
import Post from './Post'
import PostView from './PostView'
import PostModal from './PostModal'
import PostEdit from './PostEdit'
import PostDetail from './PostDetail'
import { connect } from 'react-redux'
import { addPost, addComment, addCategory } from '../actions'
import  * as Api from '../api'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import  ReactLoading  from 'react-loading'


class App extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.dismissSuccess = this.dismissSuccess.bind(this)
  }

  state = {
    dropdownIsOpen: false,
    modalIsOpen: false,
    popoverIsOpen: false,
    backdrop: 'static',
    order: 'date',
    loading: true,
    success: false
  };

  componentDidMount(){
    Api.getCategories().then((categories) => {
      categories.categories.map((category) => (
        this.props.dispatch(addCategory(category))
      ))
    })
    Api.getPosts().then((posts) => {
      posts.map((post) => {
        this.props.dispatch(addPost(post))
        Api.getComments(post.id).then((comments) => {
          comments.map((comment) => (
            this.props.dispatch(addComment(comment))
          ))
        })
      })
      setTimeout(() => this.setState({loading: false}), 1000)
      }
    )
  }

  toggleDropdown() {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  }
  toggleModal(){
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }
  togglePopover(){
    this.setState({
      popoverIsOpen: !this.state.popverIsOpen
    })
  }

  toggleOrder(){
    let { order } = this.state
    if(order === 'score'){
      order = 'date'
    } else {
      order = 'score'
    }
    this.setState({
      order
    })
  }

  toggleSuccess(){
    this.setState({ success: true })
  }

  dismissSuccess(){
    this.setState({ success: false })
  }

  render() {
    const { theComments, theCategories } = this.props
    let { thePosts } = this.props
    const { order, loading, success } = this.state
    if(order === 'date'){
      thePosts = thePosts.slice().sort((a, b) => (b.timestamp) - a.timestamp)
    } else{
      thePosts = thePosts.slice().sort((a, b) => (b.voteScore) - a.voteScore)
    }


    return (
      <BrowserRouter>
        <div>
          <Navbar color="dark" dark expand>
            <NavbarBrand href="/">Readable</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavLink disabled>Categories</NavLink>
              <Link className="nav-link" to='/'>all</Link>
              {theCategories.map((category) => (
                <Link key={category.name} className="nav-link" to={'/' + category.name}>
                  {category.name}
                </Link>
              ))}
            </Nav>
          </Navbar>
         { (loading === true) ?
            <div className="loading-spinner">
              <ReactLoading type="spin" color="blue"/>
            </div>

            :

            <div>
            <Route
              exact path="/"
              render={() => (
                <div className="container-newpost" >
                  <Button onClick={this.toggleModal} color="primary" className="newPostBtn">New post</Button>
                  <Button onClick={this.toggleOrder}>Order by: {order}</Button>
                </div>
              )}
            />
            <Alert className="success-alert" color="success" isOpen={success} toggle={this.dismissSuccess}>
              Post added !
            </Alert>

            <PostModal toggleSuccess={this.toggleSuccess} backdrop={this.state.backdrop} modalIsOpen={this.state.modalIsOpen} toggleModal={this.toggleModal}/>
              <Route
                exact path="/"
                render={() => (
                  (thePosts.map((post) => (
                                <div key={post.id} className="container movContainer">
                                  <Post thisPost={post} comments={theComments} />
                                </div>)
                    ))
                )}
              />

              <Route
                path="/:category/:post_id"
                component={PostDetail}
              />

              <Route
                exact path="/:category"
                component={PostView}
              />
              <Route
                path="/posts/:id"
                component={PostEdit}
              />
            </div>

        }

        </div>
      </BrowserRouter>
    );
  }
}


function mapStateToProps( state ){
  return{
      thePosts: state.post.filter((post) => (post.deleted === false))
                          .slice().sort((a, b) => (a.voteScore < b.voteScore)),
      theComments: state.comment.filter((comment) => comment.deleted === false)
                                .slice().sort((a, b) => (a.voteScore) < b.voteScore),
      theCategories: state.category
    }
}

export default connect(mapStateToProps)(App);
