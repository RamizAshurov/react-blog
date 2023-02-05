import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./hoc/with-auth";
import RequireAuth from "./hoc/require-auth";
import Layout from "./layout"
import HomePage from "./pages/home-page";
import PostsListPage from "./pages/posts-list-page";
import SinglePostPage from "./pages/single-post-page";
import UserPage from "./pages/user-page";
import SecretPage from "./pages/secret-page"
import ProfilePage from "./pages/profile-page";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>

          <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/posts" element={<PostsListPage />} />
                <Route path="/posts/:id" element={<SinglePostPage />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/secret-page" element={
                  <RequireAuth>
                    <SecretPage />
                  </RequireAuth>
                }/>
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
