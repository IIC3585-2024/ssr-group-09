'use client';

import useSWR from "swr";
import type { Serie, Comment } from "@/app/interfaces/series-interfaces";
import { getComments } from "@/app/actions/comments-actions";
import {
  calculateAverageRating,
  getTotalComments,
} from "@/app/helpers/series-helper";
import Link from "next/link";

type Props = {
  serie: Serie;
  rating?: number;
};

export const SeriesCard = ({ serie, rating }: Props) => {
  const { data: comments } = useSWR<Comment[]>(`comments-${serie.id}`, () =>
    getComments(serie.id)
  );
  const valid = comments && calculateAverageRating(comments) >= (rating || 0);
  
  return (
    <>
    {valid && (
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <Link href={`series/${serie.id}`}>
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
        </Link>
      </div>              
    )}
    </>
  );
};
