import PostCard from "./post-card";
import "./posts-list.css"

function PostsList(props) {
    const { posts } = props;
    
    if (!posts.length) {
        return <p>There is no post :(</p>
    }

    return (
        <div className="posts-container">
            {
                posts.map((post) => {
                    return (
                        <PostCard key={post.userId + post.id} {...post} />
                    )
                })
            }
        </div>
    )
}

export default PostsList