import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getShow } from "../api";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const fetchPostId = () => {
    getShow("/post", id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchPostId();
  }, [id]);

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
          <div className="row">
            <div className="col-md-4">Title: {post.title}</div>
            <div className="col-md-4">Description: {post.description}</div>
            <div className="col-md-4">Status: {post.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
