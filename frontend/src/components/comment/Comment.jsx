import React, { useState, useRef } from 'react';
import { Camera, Smile, Send, Heart, MessageCircle, Trash2 } from 'lucide-react'; // Added Trash2 icon
import EmojiPicker from 'emoji-picker-react';
import './comment.scss';

const Comment = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29330?w=150"
      },
      content: "This design looks amazing! I love the warm color palette and how everything flows together.",
      timestamp: "2 hours ago",
      likes: 12
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      content: "The attention to detail in this project is remarkable. Great work!",
      timestamp: "45 minutes ago",
      likes: 8
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      user: {
        name: "You",
        avatar: userAvatar
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewComment((prevComment) => prevComment + emoji);
    setShowEmojiPicker(false);
    textareaRef.current.focus();
  };

  const handleDeleteComment = (id) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="avatar-upload">
            <img src={userAvatar} alt="Your avatar" />
            <div className="upload-icon">
              <Camera size={16} />
            </div>
          </div>
          
          <div className="comment-input">
            <textarea
              ref={textareaRef}
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="emoji-icon" onClick={handleEmojiClick}>
              <Smile size={20} />
            </div>
            {showEmojiPicker && (
              <div className="emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          <Send size={18} />
          Post Comment
        </button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <img src={comment.user.avatar} alt={`${comment.user.name}'s avatar`} />
              <div className="user-info">
                <h4>{comment.user.name}</h4>
                <span>{comment.timestamp}</span>
              </div>
              {comment.user.name === "You" && ( // Show trash icon only for the current user's comments
                <div className="delete-icon" onClick={() => handleDeleteComment(comment.id)}>
                  <Trash2 size={16} />
                </div>
              )}
            </div>
            
            <p className="comment-content">{comment.content}</p>
            
            <div className="comment-actions">
              <button>
                <Heart size={16} />
                {comment.likes}
              </button>
              <button>
                <MessageCircle size={16} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;