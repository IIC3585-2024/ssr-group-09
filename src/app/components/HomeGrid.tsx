"use client";

import useSWR from "swr";
import { useSessionStore } from "../providers/session-store-provider";
import { useState } from "react";
import { getSeries } from "../actions/series-actions";
import { Filter } from "./series/Filter";
import { SeriesCard } from "./series/SeriesCard";
import { NotLogged } from "./NotLogged";
import type { Serie, FilterBar } from "../interfaces/series-interfaces";

export const HomeGrid = () => {
  const [filter, setFilter] = useState<FilterBar>();
  const { data: series, isLoading } = useSWR<Serie[]>(
    `series?${filter?.search}&${filter?.streamingService}&${filter?.categoryId}`,
    () => getSeries(filter)
  );
  const { user } = useSessionStore((state) => state);

  if (user?.id == 0) {
    return (
      <NotLogged />
    )
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Recomendaciones de Series</h1>
        <Filter setFilter={setFilter} />
        {series?.map((serie, index) => (
          <SeriesCard key={index} serie={serie} rating={filter?.rating} />
        ))}
      </div>
    </div>
  );
};
