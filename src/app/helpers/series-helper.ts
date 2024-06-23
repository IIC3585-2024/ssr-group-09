import type { Comment, FilterBar } from "@/app/interfaces/series-interfaces";

export const calculateAverageRating = (comments: Comment[]) => {
  if (comments.length === 0) {
    return 0;
  }

  const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
  const average = sum / comments.length;
  return parseFloat(average.toFixed(2));
}

export const getTotalComments = (comments: Comment[]) => {
  return comments.length;
}

export const searchParams = (filter?: FilterBar) => {
  const params = new URLSearchParams();
  if (filter?.search) {
    params.append("q", filter.search);
  }
  if (filter?.streamingService) {
    params.append("streamingService", filter.streamingService);
  }
  if (filter?.categoryId) {
    params.append("categoryId", filter.categoryId.toString());
  }
  return params.toString();
}