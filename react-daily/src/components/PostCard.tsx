import React from 'react';
import { Post } from "../App"

interface PostCardProps{
    post: Post;
}

const PostCard:React.FC<PostCardProps> = ({post}) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  )
}
export default PostCard;