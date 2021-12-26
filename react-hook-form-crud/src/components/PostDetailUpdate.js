import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { update, getShow } from "../api";

const PostDetailUpdate = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [post, setPost] = useState({
    title: "",
    description: "",
    status: null,
  });

  const history = useHistory();
  const { id } = useParams();
  const submitHandler = handleSubmit((evt) => {
    let data = {
      title: evt.title,
      description: evt.description,
      status: evt.status,
    };
    update("/post", id, data)
      .then((res) => {
        history.push("/");
        toast.success("Save Update");
      })
      .catch((e) => {
        console.log(e);

        const errors = e.response.data.errors;
        errors.forEach((error, index) => {
          const messages = error.message;
          //console.log(messages);

          setError(error.field, {
            type: "server",
            message: messages,
          });
        });
      });
  });

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
    <div>
      <div className="card border-0 rounded shadow">
        <div className="card-body">
          <h4>EDIT POST</h4>
          <hr />
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">TITLE POST</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Title Post"
                {...register("title")}
                {...setValue("title", post.title)}
              />
              {errors.title && (
                <div className="mt-2 alert alert-danger">
                  {errors.title.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">DESCRIPTION</label>
              <textarea
                className="form-control"
                {...register("description")}
                {...setValue("description", post.description)}
                rows="5"
                placeholder="Please add Content Post"
              ></textarea>
              {errors.description && (
                <div className="mt-2 alert alert-danger">
                  {errors.description.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">STATUS</label>
              <br />
              <input
                value="aktif"
                checked={post.status === "aktif"}
                {...register("status")}
                name="status"
                type="radio"
                id="field-aktif"
              />
              AKTIF{" "}
              <input
                type="radio"
                checked={post.status === "tidak_aktif"}
                value="tidak_aktif"
                id="field-status-aktif"
                name="status"
                {...register("status")}
              />
              TIDAK AKTIF
              {errors.status && (
                <div className="mt-2 alert alert-danger">
                  {errors.status.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary btn-md shadow-sm me-2"
              >
                UPDATE
              </button>
              <button
                type="button"
                onClick={() =>
                  reset({ title: "", description: "", status: null })
                }
                className="btn btn-warning btn-md shadow-sm"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetailUpdate;
