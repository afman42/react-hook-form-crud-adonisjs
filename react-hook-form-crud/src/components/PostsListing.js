import React, { useEffect, useState } from "react";
import { deleteApi, getAll } from "../api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PostsListing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    await getAll("/posts")
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [loading]);

  //console.log(posts);

  if (loading) {
    return <div className="loader"></div>;
  }

  const postStatus = (status) => {
    if (status === "tidak_aktif") return "TIDAK AKTIF";
    if (status === "aktif") return "AKTIF";
  };

  const deletePost = async (id) => {
    await deleteApi("/post", id)
      .then((res) => {
        toast.success("Success delete");
      })
      .catch((e) => {
        toast.warning("Something went Wrong");
        console.log(e);
      });
    fetchPosts();
  };
  return (
    <div className="mt-5">
      <ToastContainer />

      <div className="mb-3">
        <Link to="/posts/create" className="btn btn-md btn-primary">
          CREATE DATA
        </Link>
      </div>
      <div className="card border-0 rounded shadow-sm">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">TITLE</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{postStatus(post.status)}</td>
                    <td>
                      <Link
                        to={`/show/${post.id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        SHOW
                      </Link>
                      <Link
                        to={`/post/${post.id}/update`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        EDIT
                      </Link>
                      <button
                        onClick={() => deletePost(`${post.id}`)}
                        className="btn btn-sm btn-danger"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td align="center" colSpan="3">
                    Data Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostsListing;
