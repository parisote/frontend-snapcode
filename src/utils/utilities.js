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