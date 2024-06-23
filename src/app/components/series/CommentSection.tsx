"use client";

import { useState } from "react";
import type { Comment } from "@/app/interfaces/series-interfaces";
import { createComment } from "@/app/actions/comments-actions";
import { useSessionStore } from '@/app/providers/session-store-provider';

type Props = {
  comments: Comment[],
  seriesId: number
}

export const CommentSection = ({ comments, seriesId } : Props) => {
  const { user } = useSessionStore((state) => state);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) {
        alert('You must be logged in to comment');
        return;
      }
      
      const newComment = {
        serieId: seriesId,
        userId: user.id,
        comment: comment,
        rating: rating
      }
  
      const result = await createComment(newComment);
      if (result) {
        alert('Comentario creado exitosamente');
      } else {
        alert('Un error ocurrió mientras se creaba el comentario');
      }
    } catch (error) {
      alert('Un error ocurrió mientras se creaba el comentario');
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-6">
      <h4 className="font-bold mb-4">Comments</h4>
      {comments.map((comment, index) => (
        <div key={index} className="mb-4">
          <p className="text-gray-800">{comment.comment}</p>
          <span className="text-sm text-gray-600">{comment.userId}</span>
        </div>
      ))}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea className="w-full p-2 border rounded" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input className="w-full p-2 border rounded" type="number" min={0} max={10} value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required/>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" type="submit">Submit</button>
      </form>
    </div>
  );
}
