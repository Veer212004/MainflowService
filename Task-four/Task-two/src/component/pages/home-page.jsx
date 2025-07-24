"use client"

import { Filter, Loader, Heart } from "lucide-react"
import MovieCard from "../movie-card"

export default function HomePage({
  movies,
  loading,
  favorites,
  currentSearchTerm,
  totalResults,
  currentPage,
  showFilters,
  yearFilter,
  typeFilter,
  isAuthenticated,
  isFavorite,
  toggleFavorite,
  fetchMovieDetails,
  handlePrevPage,
  handleNextPage,
  setShowFilters,
  applyFilters,
  clearFilters,
  setYearFilter,
  setTypeFilter,
  fetchPopularMovies,
}) {
  return (
    <div className="page-content">
      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Year</label>
              <input
                type="number"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                placeholder="e.g., 2023"
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label>Type</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
                <option value="">All Types</option>
                <option value="movie">Movies</option>
                <option value="series">TV Series</option>
                <option value="episode">Episodes</option>
              </select>
            </div>
            <div className="filter-buttons">
              <button onClick={applyFilters} className="filter-button primary">
                Apply
              </button>
              <button onClick={clearFilters} className="filter-button secondary">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="controls-bar">
        <button onClick={() => setShowFilters(!showFilters)} className="filters-toggle">
          <Filter />
          Filters
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-content">
            <Loader className="loading-spinner" />
            <p className="loading-text">Loading amazing movies...</p>
          </div>
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="results-header">
            <h2 className="results-title">
              {currentSearchTerm ? `Search Results for "${currentSearchTerm}"` : "Featured Movies"}
              <span className="results-count">({totalResults} results)</span>
            </h2>
            {isAuthenticated && favorites.length > 0 && (
              <div className="favorites-count">
                <Heart />
                {favorites.length} Favorites
              </div>
            )}
          </div>

          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                fetchMovieDetails={fetchMovieDetails}
              />
            ))}
          </div>

          {totalResults > 10 && (
            <div className="pagination">
              {currentPage > 1 && (
                <button onClick={handlePrevPage} className="pagination-button">
                  Previous
                </button>
              )}
              <span className="pagination-current">
                Page {currentPage} of {Math.ceil(totalResults / 10)}
              </span>
              {currentPage * 10 < totalResults && (
                <button onClick={handleNextPage} className="pagination-button">
                  Next
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h3 className="empty-state-title">No movies found</h3>
          <p className="empty-state-text">Try searching for a different movie or series</p>
          <button onClick={fetchPopularMovies} className="empty-state-button">
            Discover Popular Movies
          </button>
        </div>
      )}
    </div>
  )
}
