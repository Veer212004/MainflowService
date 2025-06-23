"use client"

import MovieCard from "../movie-card"

export default function FavoritesPage({ favorites, isFavorite, toggleFavorite, fetchMovieDetails, setCurrentView }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">My Favorites</h1>
        <p className="page-subtitle">Your personally curated collection</p>
      </div>

      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              fetchMovieDetails={fetchMovieDetails}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">💝</div>
          <h3 className="empty-state-title">No favorites yet</h3>
          <p className="empty-state-text">Start adding movies to your favorites by clicking the heart icon</p>
          <button onClick={() => setCurrentView("home")} className="empty-state-button">
            Browse Movies
          </button>
        </div>
      )}
    </div>
  )
}
