"use client"

import { X, Star } from "lucide-react"

export default function MovieModal({ selectedMovie, setSelectedMovie }) {
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
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/placeholder.svg?height=600&width=400"}
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
