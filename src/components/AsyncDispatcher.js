import React from 'react'
import thunk from 'redux-thunk'
import * as Api from '../api'
import { addCategory, addPost, addComment } from '../actions'


export const loadCategories = dispatch => {
  return Api.getCategories().then((categories) => {
      console.log(categories)
      categories.categories.map((category) => (
        dispatch(addCategory(category))
      ))
    })
  }

export const loadPosts = dispatch => {
    return Api.getPosts().then((posts) => {
      posts.map((post) => {
        dispatch(addPost(post))
        Api.getComments(post.id).then((comments) => {
          comments.map((comment) => (
            dispatch(addComment(comment))
          ))
        })
      })
      }
    )
  }
