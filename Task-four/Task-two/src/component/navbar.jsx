"use client"

import { useState } from "react"
import { Search, Play, Home, Film, Bookmark, User, LogIn, LogOut, Settings, Menu, ChevronDown } from "lucide-react"

export default function Navbar({
  currentView,
  setCurrentView,
  isAuthenticated,
  user,
  favorites,
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleLogout,
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setCurrentView("home")}>
          <div className="brand-icon">
            <Play />
          </div>
          <h1 className="brand-title">CineVeer</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu desktop-menu">
          <button
            className={`nav-link ${currentView === "home" ? "active" : ""}`}
            onClick={() => setCurrentView("home")}
          >
            <Home size={18} />
            Home
          </button>
          <button
            className={`nav-link ${currentView === "movies" ? "active" : ""}`}
            onClick={() => setCurrentView("movies")}
          >
            <Film size={18} />
            Movies
          </button>
          {isAuthenticated && (
            <button
              className={`nav-link ${currentView === "favorites" ? "active" : ""}`}
              onClick={() => setCurrentView("favorites")}
            >
              <Bookmark size={18} />
              My Favorites ({favorites.length})
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies..."
              className="search-input-nav"
            />
            <button type="submit" className="search-button-nav">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Auth Section */}
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="profile-dropdown">
              <button className="profile-button" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="profile-avatar" />
                <span className="profile-name">{user.name}</span>
                <ChevronDown size={16} />
              </button>
              {showProfileDropdown && (
                <div className="dropdown-menu">
                  <button
                    onClick={() => {
                      setCurrentView("profile")
                      setShowProfileDropdown(false)
                    }}
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView("settings")
                      setShowProfileDropdown(false)
                    }}
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <hr className="dropdown-divider" />
                  <button
                    onClick={() => {
                      handleLogout()
                      setShowProfileDropdown(false)
                    }}
                    className="logout-btn"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="signup-btn" onClick={() => setCurrentView("signup")}>
                Sign Up
              </button>
              <button className="login-btn" onClick={() => setCurrentView("login")}>
                <LogIn size={18} />
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <button
            className={`mobile-nav-link ${currentView === "home" ? "active" : ""}`}
            onClick={() => {
              setCurrentView("home")
              setShowMobileMenu(false)
            }}
          >
            <Home size={18} />
            Home
          </button>
          <button
            className={`mobile-nav-link ${currentView === "movies" ? "active" : ""}`}
            onClick={() => {
              setCurrentView("movies")
              setShowMobileMenu(false)
            }}
          >
            <Film size={18} />
            Movies
          </button>
          {isAuthenticated && (
            <button
              className={`mobile-nav-link ${currentView === "favorites" ? "active" : ""}`}
              onClick={() => {
                setCurrentView("favorites")
                setShowMobileMenu(false)
              }}
            >
              <Bookmark size={18} />
              My Favorites
            </button>
          )}
          {isAuthenticated ? (
            <>
              <button
                className="mobile-nav-link"
                onClick={() => {
                  setCurrentView("profile")
                  setShowMobileMenu(false)
                }}
              >
                <User size={18} />
                Profile
              </button>
              <button
                className="mobile-nav-link logout-mobile"
                onClick={() => {
                  handleLogout()
                  setShowMobileMenu(false)
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-nav-link"
                onClick={() => {
                  setCurrentView("signup")
                  setShowMobileMenu(false)
                }}
              >
                Sign Up
              </button>
              <button
                className="mobile-nav-link"
                onClick={() => {
                  setCurrentView("login")
                  setShowMobileMenu(false)
                }}
              >
                <LogIn size={18} />
                Login
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
