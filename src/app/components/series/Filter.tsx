'use client';

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

type Props = {
  setFilter: (filter: any) => void;
}

export const Filter = ({ setFilter } : Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [streamingService, setStreamingService] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filter = {
      search,
      streamingService,
      categoryId: category ? parseInt(category) : null,
      rating: rating ? parseInt(rating) : 0
    }

    setFilter(filter);
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg my-6">
      <div className="flex justify-between items-center mb-4 px-4">
        <h4 className="font-bold">Filtro</h4>
        <button type="button" onClick={() => setOpen(!open)}>
          <FaAngleDown />
        </button>
      </div>
      {open && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Busqueda</label>
            <input className="w-full p-2 border rounded" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Servicio de Streaming</label>
            <select className="w-full p-2 border rounded" value={streamingService} onChange={(e) => setStreamingService(e.target.value)}>
              <option value="">Todos</option>
              <option value="Netflix">Netflix</option>
              <option value="Disney+">Disney+</option>
              <option value="Amazon Prime">Amazon Prime</option>
              <option value="Apple TV+">Apple TV+</option>
              <option value="HBO">HBO</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoria</label>
            <select className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Todas</option>
              <option value="1">Drama</option>
              <option value="2">Horror</option>
              <option value="3">Accion</option>
              <option value="4">Comedia</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="ratingSlider" className="block text-gray-700">Rating Mínimo</label>
            <div className="flex justify-between mt-2">
              {Array.from({ length: 10 }, (_, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={i + 1}
                    checked={rating === `${i + 1}`}
                    onChange={(e) => setRating(e.target.value)}
                    className="mr-1"
                  />
                  {i + 1}
                </label>
              ))}
            </div>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">Filter</button>
        </form>
      )}
    </div>
  )
}
