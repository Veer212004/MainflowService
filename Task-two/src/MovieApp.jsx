"use client"

import { useState, useEffect } from "react"
import { Search, Star, Calendar, Filter, Loader, Heart, Play, X } from "lucide-react"
import "./MovieApp.css"

const API_KEY = "9471dda6"
const BASE_URL = "https://www.omdbapi.com/"

const MovieApp = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSearchTerm, setCurrentSearchTerm] = useState("") // Track what we're actually searching for
  const [loading, setLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [yearFilter, setYearFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [favorites, setFavorites] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchPopularMovies()
  }, [])

  const fetchPopularMovies = async () => {
    setLoading(true)
    try {
      const popularTitles = [
        "Avengers",
        "Batman",
        "Spider-Man",
        "Star Wars",
        "Iron Man",
        "The Matrix",
        "Inception",
        "Interstellar",
        "The Dark Knight",
        "Joker",
      ]
      const randomTitle = popularTitles[Math.floor(Math.random() * popularTitles.length)]
      setCurrentSearchTerm(randomTitle)
      await searchMovies(randomTitle, 1)
    } catch (error) {
      console.error("Error fetching popular movies:", error)
    }
    setLoading(false)
  }

  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`

      if (yearFilter) url += `&y=${yearFilter}`
      if (typeFilter) url += `&type=${typeFilter}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.Response === "True") {
        setMovies(data.Search || [])
        setTotalResults(Number.parseInt(data.totalResults) || 0)
        setCurrentPage(page)
      } else {
        setMovies([])
        setTotalResults(0)
        setCurrentPage(1)
      }
    } catch (error) {
      console.error("Error searching movies:", error)
      setMovies([])
      setTotalResults(0)
      setCurrentPage(1)
    }
    setLoading(false)
  }

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`)
      const data = await response.json()
      if (data.Response === "True") {
        setSelectedMovie(data)
      }
    } catch (error) {
      console.error("Error fetching movie details:", error)
    }
  }

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm)
      searchMovies(searchTerm, 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      searchMovies(currentSearchTerm, currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage * 10 < totalResults) {
      searchMovies(currentSearchTerm, currentPage + 1)
    }
  }

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.imdbID === movie.imdbID)
      if (isFavorite) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID)
      } else {
        return [...prev, movie]
      }
    })
  }

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.imdbID === movieId)
  }

  const applyFilters = () => {
    if (currentSearchTerm.trim()) {
      searchMovies(currentSearchTerm, 1)
    }
    setShowFilters(false)
  }

  const clearFilters = () => {
    setYearFilter("")
    setTypeFilter("")
    if (currentSearchTerm.trim()) {
      searchMovies(currentSearchTerm, 1)
    }
  }

  const MovieCard = ({ movie }) => (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/300/450"}
          alt={movie.Title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/450"
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

  const MovieModal = () => {
    if (!selectedMovie) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={() => setSelectedMovie(null)} className="modal-close">
            <X />
          </button>
          <div className="modal-body">
            <div className="modal-poster">
              <img
                src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/api/placeholder/400/600"}
                alt={selectedMovie.Title}
              />
            </div>
            <div className="modal-details">
              <h2 className="modal-title">{selectedMovie.Title}</h2>
              <div className="modal-badges">
                {selectedMovie.imdbRating !== "N/A" && (
                  <div className="rating-badge">
                    <Star />
                    <span>{selectedMovie.imdbRating}</span>
                  </div>
                )}
                <div className="year-badge">{selectedMovie.Year}</div>
                <div className="runtime-badge">{selectedMovie.Runtime}</div>
              </div>
              <div className="modal-info-grid">
                <div className="info-item">
                  <h4>Genre</h4>
                  <p>{selectedMovie.Genre}</p>
                </div>
                <div className="info-item">
                  <h4>Director</h4>
                  <p>{selectedMovie.Director}</p>
                </div>
                <div className="info-item">
                  <h4>Released</h4>
                  <p>{selectedMovie.Released}</p>
                </div>
                <div className="info-item">
                  <h4>Language</h4>
                  <p>{selectedMovie.Language}</p>
                </div>
              </div>
              <div className="cast-section">
                <h4>Cast</h4>
                <p>{selectedMovie.Actors}</p>
              </div>
              <div className="plot-section">
                <h4>Plot</h4>
                <p>{selectedMovie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-app" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-brand">
              <div className="brand-icon">
                <Play />
              </div>
              <h1 className="brand-title">CineVeer</h1>
            </div>

            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                placeholder="Search for movies, series, episodes..."
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                <Search />
              </button>
            </div>

            <button onClick={() => setShowFilters(!showFilters)} className="filters-toggle">
              <Filter />
              Filters
            </button>
          </div>

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
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' , width:'100%'}}>
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
              {favorites.length > 0 && (
                <div className="favorites-count">
                  <Heart />
                  {favorites.length} Favorites
                </div>
              )}
            </div>

            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalResults > 10 && (
              <div className="pagination">
                {currentPage > 1 && (
                  <button onClick={handlePrevPage} className="pagination-button">
                    Previous
                  </button>
                )}
                <span className="pagination-current">Page {currentPage} of {Math.ceil(totalResults / 10)}</span>
                {currentPage * 10 < totalResults && (
                  <button onClick={handleNextPage} className="pagination-button">
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div style={{ flex: 1, 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  minHeight: '70vh',
  width: '100%'}}>
            <div className="empty-state">
              <div className="empty-state-icon">🎬</div>
              <h3 className="empty-state-title">No movies found</h3>
              <p className="empty-state-text">Try searching for a different movie or series</p>
              <button onClick={fetchPopularMovies} className="empty-state-button">
                Discover Popular Movies
              </button>
            </div>
          </div>
        )}
      </main>

      <MovieModal />
            <footer className="footer">
        <div className="footer-content">
          <p>Created by <strong>Veeresh</strong></p>
          <p>
            📧 <a href="mailto:veereshhedderi18@gmail.com" target="_blank" rel="noopener noreferrer">veereshhedderi18@gmail.com</a> &nbsp;|&nbsp;
            🔗 <a href="www.linkedin.com/in/veeresh-hedderi-83838525b" target="_blank" rel="noopener noreferrer">LinkedIn</a> &nbsp;|&nbsp;
            💻 <a href="https://github.com/Veer212004" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </footer>

    </div>
  )
}

export default MovieApp