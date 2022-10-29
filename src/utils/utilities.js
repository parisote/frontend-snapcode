const jwt_decode = require('jwt-decode');

export const sortPosts = (posts, sortBy) => {
    //by date sortea poniendo desde el post mas reciente primero, a los mas viejos.
    if (sortBy === 'date') {
        let sortedPosts = posts.sort((a, b) => {
            return new Date(b.createdAt).getTime() - (new Date(a.createdAt).getTime())
        })
        return sortedPosts
    }

    return posts
}

export const sortCommentaries = (commentaries, sortBy) => {
    //by date sortea poniendo desde el post mas reciente primero, a los mas viejos.
    if (sortBy === 'date') {
        let sortedCommentaries = commentaries.sort((a, b) => {
            return new Date(b.createdAt).getTime() - (new Date(a.createdAt).getTime())
        })
        return sortedCommentaries
    }
    return commentaries
}



export const auth = (token) => {

    const cleanStorage = () => {
        localStorage.removeItem('auth')
    }

    try {
        const tok = jwt_decode(token)
        console.log('Tiempo de exp: ' + tok.exp * 1000)
        console.log('Tiempo actual: ' + Date.now())

        if ((tok.exp * 1000 < Date.now())) {
            return false
        }

        return true
    } catch (error) {
        cleanStorage()
        return false
    }
}

