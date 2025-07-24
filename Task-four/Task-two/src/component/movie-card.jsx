"use client"

import { Calendar, Heart, Play } from "lucide-react"

export default function MovieCard({ movie, isFavorite, toggleFavorite, fetchMovieDetails }) {
  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=450&width=300"}
          alt={movie.Title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=450&width=300"
          }}
        />
        <div className="poster-overlay" />
        <button
          onClick={() => toggleFavorite(movie)}
          className={`favorite-button ${isFavorite(movie.imdbID) ? "active" : "inactive"}`}
        >
          <Heart />
        </button>
        <button onClick={() => fetchMovieDetails(movie.imdbID)} className="details-button">
          <Play />
          View Details
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-meta">
          <span className="movie-year">
            <Calendar />
            {movie.Year}
          </span>
          <span className="movie-type">{movie.Type?.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}
