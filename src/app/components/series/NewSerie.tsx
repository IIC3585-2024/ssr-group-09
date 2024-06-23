'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSerie } from "@/app/actions/series-actions"

export const NewSerie = () => {
  const [name, setName] = useState('');
  const [streamingService, setStreamingService] = useState('');
  const [seasons, setSeasons] = useState('');
  const [episodesPerSeason, setEpisodesPerSeason] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(name, streamingService, seasons, episodesPerSeason, description, category);

    const serie = {
      name: name,
      streamingService: streamingService,
      seasons: parseInt(seasons),
      episodesPerSeason: parseInt(episodesPerSeason),
      description: description,
      category: category
    };

    const result = await createSerie(serie);
    if (result) {
      alert('Serie creada con éxito');
      router.push('/');
    } else {
      alert('Ocurrió un error al crear la serie');
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Agregar una Nueva Serie</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input className="w-full p-2 border rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Servicio de Streaming</label>
            <input className="w-full p-2 border rounded" type="text" value={streamingService} onChange={(e) => setStreamingService(e.target.value)} required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Temporadas</label>
            <input className="w-full p-2 border rounded" type="number" value={seasons} onChange={(e) => setSeasons(e.target.value)} required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Episodios por Temporada</label>
            <input className="w-full p-2 border rounded" type="number" value={episodesPerSeason} onChange={(e) => setEpisodesPerSeason(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <input className="w-full p-2 border rounded" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Agregar Serie</button>
        </form>
      </div>
    </div>
  )
}
