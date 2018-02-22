export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT  = 'REMOVE_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export function addPost(post) {
	return{
		type: ADD_POST,
		post
	}
}

export function editPost(post){
	return{
		type: EDIT_POST,
		post
	}
}

export function removePost(post){
	return{
		type: REMOVE_POST,
		post
	}
}

export function addComment(comment) {
	return{
		type: ADD_COMMENT,
		comment
	}

}

export function removeComment(comment){
	return{
		type: REMOVE_COMMENT,
		comment
	}
}

export function votePost(post){
	return{
		type: VOTE_POST,
		post
	}
}

export function voteDownPost(post){
	return{
		type: VOTE_DOWN_POST,
		post
	}
}

export function voteComment(comment){
	return{
		type: VOTE_COMMENT,
		comment
	}
}

export function voteDownComment(comment){
	return{
		type: VOTE_DOWN_COMMENT,
		comment
	}
}

export function editComment(comment){
	return{
		type: EDIT_COMMENT,
		comment
	}
}

export function addCategory(category){
	return{
		type: ADD_CATEGORY,
		category
	}
}
