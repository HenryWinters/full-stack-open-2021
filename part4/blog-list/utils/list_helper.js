const _ = require('lodash')

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
    }
    return blogWithMostLikes
}

const mostBlogs = (blogs) => {
    let tally = _.countBy(blogs, (blog) => blog.author)
    let authorWithMostBlogs = _.max(Object.keys(tally), o => tally[o])
    let authorWithMostBlogsObj = {
        "author": authorWithMostBlogs,
        "blogs": tally[authorWithMostBlogs]
    }
    return authorWithMostBlogsObj
}

const mostLikes = (blogs) => {
    let groupedAuthors = _.groupBy(blogs, (blog) => blog.author)
    let totalLikesByAuthorArr = []
    Object.values(groupedAuthors).forEach(authorListArr => {
        totalLikesByAuthorArr.push(
            {
                'author': authorListArr[0].author,
                'likes': _.sumBy(authorListArr, function(o) {return o.likes})
            }
        )
    })
    let authorWithMostLikesObj = _.maxBy(totalLikesByAuthorArr, function(o) {return o.likes})
    return authorWithMostLikesObj
}

module.exports = { 
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlogs, 
    mostLikes
}