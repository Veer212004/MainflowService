export default function ProfilePage({ user, favorites }) {
  return (
    <div className="page-content">
      <div className="profile-container">
        <div className="profile-header">
          <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="profile-image" />
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{favorites.length}</span>
                <span className="stat-label">Favorites</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Watchlist</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Recently Added Favorites</h3>
          {favorites.slice(0, 4).length > 0 ? (
            <div className="recent-favorites">
              {favorites.slice(0, 4).map((movie) => (
                <div key={movie.imdbID} className="recent-movie">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=150&width=100"}
                    alt={movie.Title}
                  />
                  <span>{movie.Title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">No favorites added yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
