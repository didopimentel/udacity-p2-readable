import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import NotFound from './NotFound'
import { Link } from 'react-router-dom'
import TiArrowLeftOutline from 'react-icons/lib/ti/arrow-left-outline'

class PostDetail extends Component {
  render(){
    if ( Object.keys(this.props.post).length === 0  ) {
      return <NotFound />
    }
    return (
      <div>
        <Link to="/">
          <TiArrowLeftOutline className="arrow-back" size={42} />
        </Link>
        <div className="container movContainer">
          <Post thisPost={this.props.post} />
        </div>
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ){
  return {
    post: state.post.filter((post) => post.id === ownProps.match.params.post_id)
                    .reduce((obj, item) => {
                      obj = item
                      return obj
                    }, {})
  }
}

export default connect(mapStateToProps)(PostDetail)
