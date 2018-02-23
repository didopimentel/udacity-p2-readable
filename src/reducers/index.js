import { combineReducers } from 'redux'

function post (state = [], action){
	switch(action.type){
		case 'ADD_POST':
			return [
				...state,
				action.post
			]
		case 'EDIT_POST' :
			return state.map((post) => {
				if (action.post.id === post.id) {
					return action.post
				}
				else return post
			})
		case 'REMOVE_POST' :
			return state.filter((post) => post.id !== action.post.id)
		case 'VOTE_POST':
			return state.map((post) => {
				if (action.post.id === post.id){
					return{
						...post,
						voteScore: post.voteScore + 1
					}
				}
				return post
			})
		case 'VOTE_DOWN_POST':
			return state.map((post) => {
				if (action.post.id === post.id){
					return{
						...post,
						voteScore: post.voteScore - 1
					}
				}
				return post
			})
		default:
			return state;
	}
}

function comment (state = [], action){

	const comment = action.comment

	switch(action.type){
		case 'ADD_COMMENT':
			return [
				...state,
				comment
			]
		case 'REMOVE_COMMENT':
			return state.filter((cmnt) => cmnt.id !== comment.id)
		case 'EDIT_COMMENT' :
			return state.map((cmnt) => {
				if (comment.id === cmnt.id) {
					return action.comment
				}
				else return cmnt
			})
		case 'VOTE_COMMENT':
			return state.map((comment) => {
				if (action.comment.id === comment.id){
					return{
						...comment,
						voteScore: comment.voteScore + 1
					}
				}
				return comment
			})

		case 'VOTE_DOWN_COMMENT':
			return state.map((comment) => {
				if (action.comment.id === comment.id){
					return{
						...comment,
						voteScore: comment.voteScore - 1
					}
				}
				return comment
			})
		default:
			return state;
	}
}

function category (state = [], action){
	switch(action.type){
		case 'ADD_CATEGORY':
			return [
				...state,
				action.category
			]
		default:
			return state;
	}
}

export default combineReducers({
	post,
	comment,
	category
})
