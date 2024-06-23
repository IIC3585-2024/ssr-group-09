'use server';

import { revalidateTag } from 'next/cache';
import { NewComment } from '../interfaces/series-interfaces';

export const getComments = async (serieId: number) => {
  try {
    const response = await fetch(`http://localhost:3001/comments?serieId=${serieId}`, {
      next: {
        tags: ["comments"],
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export const createComment = async (comment: NewComment) => {
  try {
    const response = await fetch(`http://localhost:3001/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      return null;
    }

    revalidateTag("comments");
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}