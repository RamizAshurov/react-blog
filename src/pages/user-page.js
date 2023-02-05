import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetching from "../hooks/useFetching";
import PostsList from "../components/posts-list";
import JSONPlaceholderServiceAPI from "../api/JSONPlacholderServer";

import "./user-page.css"

function UserPage() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);

    const [isUserLoading, userError, fetchUserData] = useFetching(async (id) => {
        const userInfo = await JSONPlaceholderServiceAPI.fetchUserInfo(id);
        setUser(userInfo)
    });

    const [isPostsLoading, postError, fetchPostsData] = useFetching(async (id) => {
        const posts = await JSONPlaceholderServiceAPI.fetchUserPosts(id);

        if (!posts.length) {
            throw Error(`There is no user with id ${id}`)
        }

        setUserPosts(posts)
    });

    function renderPosts() {
        if (isPostsLoading) {
            return <p>Fetching user's posts...</p>
        }

        if (postError) {
            return <p>{postError}</p>
        }

        return <PostsList posts={userPosts} />
    }

    useEffect(() => {
        fetchUserData(id)
    }, [])

    useEffect(() => {
        if (user) {
            fetchPostsData(id)
        }
    }, [user])

    if (isUserLoading) {
        return <h2>Fetching data...</h2>
    }

    if (userError) {
        return <h2>{userError}</h2>
    }
    
    const { name, username} = user;

    return (
        <div>
            <div className="user-info">
                <h2 className="user-info__name">{name}</h2>
                <h4 className="user-info__nickname">@{username}</h4>
            </div>
            <div className="user-posts">{renderPosts()}</div>
        </div>
    )
}

export default UserPage