import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { create } from "../api";
import { ToastContainer, toast } from "react-toastify";

const PostCreate = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const submitHandler = handleSubmit((evt) => {
    console.log(evt);
    let data = {
      title: evt.title,
      description: evt.description,
      status: evt.status,
    };
    create("/post", data)
      .then((res) => {
        history.push("/");
        toast.success(res.data.status);
        console.log(res);
      })
      .catch((e) => {
        const errors = e.response.data.errors;
        errors.forEach((error, index) => {
          const messages = error.message;
          console.log(messages);

          setError(error.field, {
            type: "server",
            message: messages,
          });
        });
      });
  });

  return (
    <div>
      <ToastContainer />
      <div className="card border-0 rounded shadow">
        <div className="card-body">
          <h4>ADD POST</h4>
          <hr />
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">TITLE POST</label>
              <input
                className="form-control"
                type="text"
                {...register("title")}
                placeholder="Please add some title"
              />
              {errors.title && (
                <div className="mt-2 alert alert-danger">
                  {errors.title.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">CONTENT</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Masukkan Content Post"
                {...register("description")}
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
              <input {...register("status")} value="aktif" type="radio" />
              Aktif{" "}
              <input {...register("status")} value="tidak_aktif" type="radio" />
              TidaK Aktif
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
                SAVE
              </button>
              <button type="reset" className="btn btn-warning btn-md shadow-sm">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
