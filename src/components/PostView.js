import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import Post from './Post'
import TiArrowLeftOutline from 'react-icons/lib/ti/arrow-left-outline'
import { Link } from 'react-router-dom'

class PostView extends Component {

  constructor(props){
    super(props);

    this.toggleOrder = this.toggleOrder.bind(this)
    this.state = {
      order: 'score'
    }
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

  render(){
    let { posts } = this.props
    const { order } = this.state
    if(order === 'date'){
      posts = posts.sort((a, b) => (a.timestamp) < b.timestamp)
    } else{
      posts = posts.sort((a, b) => (a.voteScore) < b.voteScore)
    }
    return(
      <div>
        <Link to="/">
          <TiArrowLeftOutline className="arrow-back" size={42} />
        </Link>
      <div className="container-newpost" >
        <Button onClick={this.toggleOrder}>Order by: {order}</Button>
      </div>
        {posts.map((post) => (
                      <div key={post.id} className="container movContainer">
                        <Post thisPost={post} />
                      </div>)
          )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  const {category} = ownProps.match.params
  return {
    posts: state.post.filter((post) => post.category === category)
  }
}

export default connect(mapStateToProps)(PostView)
