import React, { useState } from "react";
import "./comment.scss";
import { formatDistanceToNow } from "date-fns";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "" || userName.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      user: userName,
      text: newComment,
      avatar: `https://i.pravatar.cc/40?img=${comments.length + 1}`, // Random avatar
      date: new Date(),
    };

    setComments([newCommentData, ...comments]);
    setNewComment("");
    setUserName("");
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>

      <div className="comment-box">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <img src={comment.avatar} alt="avatar" className="avatar" />
            <div className="comment-content">
              <div className="comment-header">
                <strong>{comment.user}</strong>
                <span className="date">
                  {formatDistanceToNow(new Date(comment.date), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p>{comment.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
