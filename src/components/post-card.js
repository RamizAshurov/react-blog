import { Link } from "react-router-dom";

function PostCard(props) {
    const { id, title, body, userId, userName } = props;

    return (
        <div className="post-card">
            <div className="post-card__header">
                <h3 className="post-card__title">
                    <Link to={`/posts/${id}`}>{title}</Link>
                </h3>
                {
                    userName &&
                    <h5 className="post-card__author">
                        <i className="bi bi-person-circle post-card__author-icon" />
                        <Link className="post-card__author-name" to={"/users/" + userId}>{userName}</Link>
                    </h5>
                }
            </div>
            <div className="post-card__body">
                <p className="post-card__text">{body}</p>
            </div>
        </div>
    )
}

export default PostCard