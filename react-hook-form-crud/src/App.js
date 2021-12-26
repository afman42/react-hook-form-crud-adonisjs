import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout";
import PostsListing from "./components/PostsListing";
import PostDetail from "./components/PostDetail";
import PostDetailUpdate from "./components/PostDetailUpdate";
import PostCreate from "./components/PostCreate";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Layout>
            <Route exact path="/" component={PostsListing} />
            <Route exact path="/posts/create" component={PostCreate} />
            <Route exact path="/show/:id" component={PostDetail} />
            <Route exact path="/post/:id/update" component={PostDetailUpdate} />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
