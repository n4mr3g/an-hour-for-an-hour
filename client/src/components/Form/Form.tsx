import "./Form.css";
import { useState } from "react";
import { Offer } from "../../dataTypes";

import { postOffer } from "../../api/apiService";
import { useNavigate } from "react-router-dom";

import * as DOMPurify from "dompurify";

export default function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  let clean = DOMPurify.sanitize;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !type || !message || !comment) {
      //TODO: change alert to modal
      alert("Please enter details correctly");
      return;
    }
    let newOffer: Offer = {
      title: clean(title),
      type: clean(type),
      message: clean(message),
      comment: clean(comment),
      author: clean(author),
      image: clean(image),
    };
    postOffer(newOffer);
    event.currentTarget.reset();
    navigate("/app");
  }
  return (
    <div className="form-container">
      {/* DOMPurify: */}
      <script type="text/javascript" src="dist/purify.min.js"></script>

      <form className="form-itself" onSubmit={handleSubmit}>
        <div className="form-title"> Create your offer </div>
        <div className="input-group">
          <label className="input-label" htmlFor="title">
            title
          </label>
          <input
            className="input-box"
            type="text"
            name="title"
            value={title}
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="offer-type">
            type
          </label>
          <select
            id="type"
            value={type}
            className="input-box"
            name="offer-type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Teach">Teach</option>
            <option value="Learn">Learn</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="input-box"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            cols={40}
            rows={5}
          ></textarea>
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="substitute">
            Open to learn something different?
          </label>
          <textarea
            id="substitute"
            className="input-box"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            cols={50}
            rows={2}
          ></textarea>
        </div>
        <button className="create-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
