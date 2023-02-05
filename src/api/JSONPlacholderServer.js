class JSONPlaceholderService {
    apiBase = "https://jsonplaceholder.typicode.com"

    fetchUsers = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok)
            throw Error(`Couldn't fetch. Status code is ${response.status}`)

        return await response.json();
    }

    fetchPosts = async () => {
        const response = await fetch(this.apiBase + "/posts");
        
        if (!response.ok)
            throw Error(`Couldn't fetch. Status code is ${response.status}`)

        return await response.json();
    }

    fetchUserInfo = async (id) => {
        const response = await fetch(this.apiBase + "/users/" + id);

        if (!response.ok)
            throw Error(`Couldn't fetch. Status code is ${response.status}`)

        return await response.json()
    }

    fetchUserPosts = async (id) => {
        const response = await fetch(this.apiBase + "/posts?userId=" + id);

        if (!response.ok)
            throw Error(`Couldn't fetch. Status code is ${response.status}`)

        return await response.json()
    }

    fetchData = async (id) => {
        const response = await fetch(this.apiBase + "/posts/" + id);

        if (!response.ok)
            throw Error(`Couldn't fetch. Status code is ${response.status}`)

        return await response.json()
    }

    fetchComments = async (id) => {
        const response = await fetch(this.apiBase + "/comments?postId=" + id);

        if (!response.ok)
            throw Error(`Couldn't fetch. Status code is ${response.status}`)

        return await response.json()
    }

    fetchUserTodos = async (id) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id + "/todos");
        return await response.json()
    }
}

export default new JSONPlaceholderService()