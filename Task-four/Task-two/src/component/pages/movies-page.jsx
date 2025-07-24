"use client"

export default function MoviesPage({ setSearchTerm, setCurrentSearchTerm, searchMovies, setCurrentView }) {
  const handleGenreClick = (genre) => {
    setSearchTerm(genre)
    setCurrentSearchTerm(genre)
    searchMovies(genre, 1)
    setCurrentView("home")
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Discover Movies</h1>
        <p className="page-subtitle">Explore our vast collection of movies and TV series</p>
      </div>

      <div className="genre-grid">
        {["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation"].map((genre) => (
          <button key={genre} className="genre-card" onClick={() => handleGenreClick(genre)}>
            <div className="genre-icon">🎭</div>
            <span>{genre}</span>
          </button>
        ))}
      </div>

      <div className="trending-section">
        <h2 className="section-title">Trending Searches</h2>
        <div className="trending-tags">
          {["Marvel", "DC", "Disney", "Netflix", "HBO", "Amazon Prime"].map((tag) => (
            <button key={tag} className="trending-tag" onClick={() => handleGenreClick(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
