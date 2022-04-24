const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blogObj) => {
            return sum + blogObj.likes
        }, 0)
}

const favoriteBlog = (blogs) => {
    let mostLikes = 0;
    let blogWithMostLikes = {}
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes 
            blogWithMostLikes = {
                title: blogs[i].title,
                author: blogs[i].author,
                likes: blogs[i].likes
            }
        }
        console.log(blogWithMostLikes)
    }
    return blogWithMostLikes
}

module.exports = { 
    dummy, 
    totalLikes, 
    favoriteBlog
}