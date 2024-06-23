"use server";

import type { NewSerie, FilterBar } from "@/app/interfaces/series-interfaces";
import { searchParams } from "../helpers/series-helper";

export const getSeries = async (filter?: FilterBar) => {
  const params = searchParams(filter);
  try {
    const response = await fetch(
      `http://localhost:3001/series?${params}`
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const getSerie = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/series/${id}`);

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const createSerie = async (serie: NewSerie) => {
  try {
    const response = await fetch("http://localhost:3001/series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serie),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
