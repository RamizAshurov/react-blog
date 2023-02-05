import { useEffect, useState } from "react";
import { Navigate, Link  } from "react-router-dom";
import PostsList from "../components/posts-list";
import useAuth from "../hooks/useAuth";
import useFetching from "../hooks/useFetching";
import JSONPlacholderServerAPI from "../api/JSONPlacholderServer";

import "./profile-page.css"

function ProfilePage() {
    const { value } = useAuth();
    const [content, setContent] = useState({ posts: [], todos: [] })
    const [activeTab, setActiveTab] = useState("posts");

    const [isPostsLoading, postsError, fetchPosts] = useFetching(async (id) => {
        const posts =  await JSONPlacholderServerAPI.fetchUserPosts(id);
        setContent({...content, posts })
    })

    const [isTodosLoading, todosError, fetchTodos] = useFetching(async (id) => {
        const todos =  await JSONPlacholderServerAPI.fetchUserTodos(id);
        setContent({...content, todos })
    })

    const contentRender = (content, contentName, isLoading, error) => {
        if (isLoading) {
            return <p>Fetching {contentName}...</p>
        }

        if (error) {
            return <h3>{error}</h3>
        }

        if (contentName === "posts") {
            return <PostsList posts={content} />
        }

        return content.map(item => {
            const classAttr = contentName + "__item" + (item?.completed ? ` ${contentName}__item_completed` : "")
            return (
                <p key={item.id} className={classAttr}>{item.title}</p>
            )
        })
    }

    function handleClick(tab) {
        setActiveTab(tab)
        if (!content[tab].length) {
            if (tab === "posts") {
                fetchPosts(value.id)
            } else {
                fetchTodos(value.id)
            }
        }
    }

    useEffect(() => {
        if (value) {
            fetchPosts(value.id)
        }
    }, [])

    if (!value)
        return <Navigate to="/" />

    return (
        <div className="profile">
            <h1>{value.username}</h1>
            <div className="profile__about">
                <div className="profile__avatar"></div>
                <div className="profile__info">
                    <div className="profile__info-wrapper">
                        <span>Name: </span>
                        <h3>{value.name}</h3>
                    </div>
                    <div className="profile__info-wrapper">
                        <span>User name: </span>
                        <h3>{value.username}</h3>
                    </div>
                    <div className="profile__info-wrapper">
                        <span>Mail: </span>
                        <h3><a href={"mailto:" + value.email}>{value.email}</a></h3>
                    </div>
                    <div className="profile__info-wrapper">
                        <span>Phone number: </span>
                        <h3><a href={"tel:"+value.phone}>{value.phone}</a></h3>
                    </div>
                    <div className="profile__info-wrapper">
                        <span>Website: </span>
                        <h3><a href={value.website}>{value.website}</a></h3>
                    </div>
                </div>
            </div>
            <div className="profile__content content">
                <div className="content__header">
                    {
                        ["posts", "todos"].map(item => {
                            return (
                                <h2 
                                    key={item} 
                                    className={"content__title" + (item === activeTab ? " content__title_active" : "")}
                                    onClick={() => handleClick(item)}
                                    >{item}
                                </h2>
                            )
                        })
                    }
                </div>
                <div className="content__body">
                    {
                        [
                            {
                                itemName: "posts",
                                isLoading: isPostsLoading,
                                error: postsError
                            },
                            {
                                itemName: "todos",
                                isLoading: isTodosLoading,
                                error: todosError
                            } 
                        ].map(({itemName, isLoading, error}) => {
                            const classAttr = "content__item content__item_" + itemName  + (itemName === activeTab ? " content__item_active" : "")
                            return (
                                <div key={itemName} className={classAttr}>
                                { 
                                    contentRender(content[itemName], itemName, isLoading, error)
                                }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage