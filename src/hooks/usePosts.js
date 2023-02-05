import { useMemo, useState } from "react";

function useSortedPost(posts, sortValue) {
    const sortedPosts = useMemo(() => {
        if (sortValue === "date") {
            return [...posts].sort((a, b) => { return a.id - b.id })
        } 

        if (sortValue === "title") {
            return [...posts].sort((a, b) => a.title.localeCompare(b.title))
        }
        
        return posts
    }, [sortValue, posts])

    return sortedPosts
}

function usePosts(postsArray, filterValue = "", sortValue = "", searchValue = "") {
    const [posts, setPosts] = useState(postsArray);

    function filterPosts(posts) {
        if (filterValue)
            return posts.filter(post => post.userId === parseInt(filterValue))
        return posts
    }

    function searchPosts(posts) {
        if (searchValue) {
            return posts.filter(post => post.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
        }
        return posts
    }

    const sortedPosts = useSortedPost(posts,sortValue);
    const filteredSortedPosts = filterPosts(sortedPosts)
    const searchedFiltredSortedPosts = searchPosts(filteredSortedPosts);
    
    return [ searchedFiltredSortedPosts, setPosts ]
}

export default usePosts