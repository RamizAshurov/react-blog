import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import "./single-post-page.css"

function SinglePostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loadingPostData, setLoadingPostData] = useState(true);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);


    async function fetchData() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
        return await response.json()
    }

    async function fetchComments() {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + id);
        return await response.json()
    }

    function commentsData() {
        if (loadingComments) {
            return <p>Loading comms...</p>
        }

        if (comments) {
            return (
                comments.map(({ id, name, email, body }) => {
                    return (
                        <div key={id} className="comment">
                            <h4 className="comment__header">{name}</h4>
                            <div className="comment__body">
                                <p className="comment__text">{body}</p>
                                <a href={"mailto:" + email} className="comment__user-email">{email}</a>
                            </div>
                        </div>
                    )
                })
            )
        }

        return <p>No comments yet...</p>
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData()
            .then(response => setPost(response))
            .catch(error => console.log(error))
            .finally(() => setLoadingPostData(false))
        }, 1500)
    }, [])

    useEffect(() => {
        if(post) {
            setTimeout(() => {
                fetchComments()
                .then(response => setComments(response))
                .catch(error => console.log(error))
                .finally(() => setLoadingComments(false))
            }, 1500)
        }
    }, [post])


    if (loadingPostData) {
        return <p>Fetching data....</p>
    }

    if (!post) {
        return <p>Something gone wrong \_('-')_/</p>
    }

    return (
        <div>
            <div className="post">
                <div className="post__header">
                    <Link to="/posts" className="link">
                        <i className="bi bi-arrow-left-short link__icon" />
                        <span>Back to posts</span>
                    </Link>
                    <h2 className="post__title">{post.title}</h2>
                </div>
                <p className="post__text">{post.body}</p>
            </div>
            <hr />
            <div className="comments-section">
                <h3 className="comments-section__header">{comments.length} Comments</h3>
                <div className="comments-section__content">{commentsData()}</div>
            </div>
        </div>
    )
}

export default SinglePostPage