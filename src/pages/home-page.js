import useAuth from "../hooks/useAuth"

function HomePage() {
    const { value } = useAuth();

    return (
        <h1 style={{marginTop: "10vh", textAlign: "center"}}>
            { value ? "Welcome, " + value.name + "!" : "Home Page"}
        </h1>
    )
}

export default HomePage