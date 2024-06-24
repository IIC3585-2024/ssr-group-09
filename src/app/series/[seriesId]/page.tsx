import { SeriesDetail } from '@/app/components';
import { getSerie } from '@/app/actions/series-actions';
import {
  calculateAverageRating,
  getTotalComments,
} from "@/app/helpers/series-helper";
import type { Serie } from '@/app/interfaces/series-interfaces';

type Params = {
  params: {
    seriesId: string;
  };
}

export default async function SeriePage({ params: { seriesId }} : Params) {
  const serie: Serie = await getSerie(+seriesId);

  return (
    <div>
      <SeriesDetail serie={serie} />
    </div>
  );
}