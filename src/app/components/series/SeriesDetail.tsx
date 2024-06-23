import { CommentSection } from "./CommentSection";
import { getComments } from "@/app/actions/comments-actions";
import type { Serie, Comment } from "@/app/interfaces/series-interfaces";
import {
  calculateAverageRating,
  getTotalComments,
} from "@/app/helpers/series-helper";

type Props = {
  serie: Serie;
};


export const SeriesDetail = async ({ serie } : Props) => {
  const comments: Comment[] = await getComments(serie.id);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-4">
          <h3 className="font-bold text-lg">{serie.name}</h3>
          <p className="text-gray-700">{serie.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              {serie.streamingService}
            </span>
            <span className="text-sm text-gray-600">
              {comments && calculateAverageRating(comments)} (
              {comments && getTotalComments(comments)})
            </span>
          </div>
        </div>
      </div>
      {comments && <CommentSection comments={comments} seriesId={serie.id} />}
    </div>
  )
}
