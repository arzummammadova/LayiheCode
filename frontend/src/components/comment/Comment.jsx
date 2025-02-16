import React, { useState, useEffect, useRef } from 'react';
import { Smile, Send, Trash, Edit } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import person from "../../assets/icons/profile.svg";
import './comment.scss';

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(10)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={`star ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => !readonly && onRatingChange(starValue)}
            onMouseEnter={() => !readonly && setHoverRating(starValue)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
          >
            ★
          </button>
        );
      })}
      <span className="numeric-rating">{rating}</span>
    </div>
  );
};

const Comment = ({ productID }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth) || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(10);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [editedRating, setEditedRating] = useState(10);
  const textareaRef = useRef(null);

  const fetchComments = async () => {
    if (!productID) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${productID}/reviews`);
      const reviews = response.data.reviews || [];
      const formattedReviews = reviews.map(comment => ({
        ...comment,
        createdAt: comment.createdAt || new Date().toISOString(),
        user: comment.user || {}
      }));
      setComments(formattedReviews);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  // console.log(comments)

  const calculateOverallRating = () => {
    if (comments.length === 0) return 0;

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;
    return Math.round(averageRating * 10) / 10; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || newRating === 0) {
      Swal.fire('Error!', 'Please add a comment and select a rating', 'error');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/books/${productID}`,
        {
          userId: user?._id,
          comment: newComment,
          rating: newRating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments(prev => [...prev, {
        ...response.data.review,
        createdAt: new Date().toISOString(),
        user: user
      }]);
      
      setNewComment("");
      setNewRating(10);
      fetchComments();
      Swal.fire('Success!', 'Comment posted successfully', 'success');
    } catch (error) {
      console.error("Error posting comment:", error);
      Swal.fire('Error!', 'Failed to post comment', 'error');
    }
  };

  const handleDelete = async (commentID) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/books/${productID}/${commentID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComments(prev => prev.filter(c => c._id !== commentID));
        Swal.fire('Deleted!', 'Comment deleted successfully', 'success');
      } catch (error) {
        console.error("Error deleting comment:", error);
        Swal.fire('Error!', 'Failed to delete comment', 'error');
      }
    }
  };

  const handleEdit = (commentId, commentText, commentRating) => {
    setEditingCommentId(commentId);
    setEditedComment(commentText);
    setEditedRating(commentRating);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!editedComment.trim() || editedRating === 0) {
      Swal.fire('Error!', 'Please add a comment and select a rating', 'error');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/books/${productID}/${editingCommentId}`,
        { comment: editedComment, rating: editedRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments(prev => prev.map(comment =>
        comment._id === editingCommentId 
          ? { ...comment, comment: editedComment, rating: editedRating } 
          : comment
      ));
      
      setEditingCommentId(null);
      setEditedComment('');
      setEditedRating(10);
      Swal.fire('Success!', 'Comment updated successfully', 'success');
    } catch (error) {
      console.error("Error updating comment:", error);
      Swal.fire('Error!', 'Failed to update comment', 'error');
    }
  };

  useEffect(() => { fetchComments(); }, [productID]);

  return (
    <div className="comment-section">
      <h2>Comments</h2>

      <div className="overall-rating">
        <h3>Overall Rating: {calculateOverallRating()}</h3>
        <StarRating rating={calculateOverallRating()} readonly />
      </div>

      {isLoggedIn && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="avatar-upload">
              <img src={user?.image ? `http://localhost:5000${user.image}` : person} alt="Your avatar" />
            </div>

            <div className="comment-input">
              <textarea
                ref={textareaRef}
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="emoji-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Smile size={20} />
              </div>
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <EmojiPicker onEmojiClick={(e) => {
                    setNewComment(prev => prev + e.emoji);
                    setShowEmojiPicker(false);
                    textareaRef.current.focus();
                  }} />
                </div>
              )}
            </div>
          </div>

          <div className="rating-section">
            <span>Rating: </span>
            <StarRating rating={newRating} onRatingChange={setNewRating} />
          </div>

          <button type="submit" className="submit-button">
            <Send size={18} />
            Post Comment
          </button>
        </form>
      )}

      <div className="comments-list">
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <img
                src={comment.user?.image ? `http://localhost:5000${comment.user.image}` : person}
                alt={`${comment.user?.name || "Anonymous"}'s avatar`}
              />
              <div className="user-info">
                <h4>{comment.user?.name || "Anonymous"}</h4>
                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                <StarRating rating={comment.rating} readonly />
              </div>

              {(user?._id === comment.user?._id || user?.isAdmin) && (
                <div className="comment-actions">
                  {user?._id === comment.user?._id && (
                    <button onClick={() => handleEdit(comment._id, comment.comment, comment.rating)}>
                      <Edit size={18} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(comment._id)}>
                    <Trash size={18} />
                  </button>
                </div>
              )}
            </div>

            {editingCommentId === comment._id ? (
              <form className="edit-form" onSubmit={handleUpdateComment}>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <div className="rating-section">
                  <span>Rating: </span>
                  <StarRating rating={editedRating} onRatingChange={setEditedRating} />
                </div>
                <div className="edit-buttons">
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => {
                    setEditingCommentId(null);
                    setEditedComment('');
                    setEditedRating(10);
                  }}>Cancel</button>
                </div>
              </form>
            ) : (
              <p className="comment-content">{comment.comment}</p>
            )}
          </div>
        )) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comment;