import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import useFetching from "../hooks/useFetching";
import SearchPanel from "../components/search-panel";
import PostsList from "../components/posts-list";
import JSONPlaceholderServiceAPI from "../api/JSONPlacholderServer";

function PostsListPage() {
    const [sortValue, setSortValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [posts, setPosts] = usePosts([], filterValue, sortValue, searchValue);
    const [users, setUsers] = useState([]);

    function handleSortValueChange(e) {
        setSortValue(e.target.value)
    }

    function handleFilterValueChange(e) {
        setFilterValue(e.target.value)
    }

    const [isPostsLoading, postsError, fetchingPosts] = useFetching(async () => {
        const posts = await JSONPlaceholderServiceAPI.fetchPosts();
        const users = await JSONPlaceholderServiceAPI.fetchUsers();
        const newPosts = posts.map(post => {
            const user = users.find(user => user.id === post.userId)
            return {...post, userName: user.name } 
        });
        setPosts(newPosts)
        setUsers(users)
    });

    const [isUsersLoading, usersError, fetchingUsers] = useFetching(async () => {
        const users = await JSONPlaceholderServiceAPI.fetchUsers();
        setUsers(users);
    });
    
    useEffect(() => {
        fetchingPosts()
    }, [])

    return (
        <div>
            <SearchPanel 
                sortValue={sortValue} 
                handleSortChange={handleSortValueChange} 
                filterValue={filterValue} 
                handleFilterChange={handleFilterValueChange} 
                searchValue={searchValue}
                handleSearchChange={(e) => setSearchValue(e.target.value)}
                users={users}
            />
            {
                isPostsLoading
                ? <p>Loading data...</p>
                : <PostsList posts={posts} />
            }
        </div>
    )
}

export default PostsListPage