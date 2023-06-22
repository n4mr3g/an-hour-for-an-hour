import "./Form.css";
import { useState } from "react";
import { Offer } from "../../dataTypes";
import { postOffer } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import DOMPurify from "dompurify";

export default function Form() {
  const [comment, setComment] = useState("");
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const navigate = useNavigate();

  let clean = DOMPurify.sanitize;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let newOffer: Offer = {
      title: clean(data.title),
      type: clean(data.type),
      description: clean(data.description),
      comment: clean(data.comment),
      author: clean(data.author),
      image: clean(data.image),
    };
    console.log(newOffer);
    reset();
    await postOffer(newOffer);
    navigate("/app");
  };

  return (
    <div className="form-container">
      <script type="text/javascript" src="dist/purify.min.js"></script>

      <form className="form-itself" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-title"> Create your offer </div>
        <div className="input-group">
          <label className="input-label" htmlFor="title">
            title
          </label>

          <input
            id="title"
            className="input-box"
            type="text"
            autoFocus={true}
            {...register("title", { required: true })}
            placeholder="Enter title"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="type">
            Type
          </label>

          <select {...register("type", { required: true })}>
            <option value="Teach">Teach</option>
            <option value="Learn">Learn</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="description">
            Message
          </label>

          <textarea
            id="description"
            className="input-box"
            cols={40}
            rows={5}
            {...register("description", { required: true, maxLength: 2000 })}
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="substitute">
            Open to learn something different?
          </label>

          <textarea
            id="substitute"
            className="input-box"
            value={comment}
            cols={50}
            rows={2}
            {...register("substitute", { required: false, maxLength: 2000 })}
          ></textarea>
        </div>

        <button className="create-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
