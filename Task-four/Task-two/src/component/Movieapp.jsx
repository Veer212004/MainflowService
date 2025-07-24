"use client"

import { useState, useEffect } from "react"
import Navbar from "./navbar"
import HomePage from "./pages/home-page"
import MoviesPage from "./pages/movies-page"
import FavoritesPage from "./pages/favorites-page"
import LoginPage from "./pages/login-page"
import SignupPage from "./pages/signup-page"
import ProfilePage from "./pages/profile-page"
import SettingsPage from "./pages/settings-page"
import MovieModal from "./movie-modal"
import '../app/global.css'

// OMDb API
const API_KEY = "9471dda6"
const BASE_URL = "https://www.omdbapi.com/"

// RapidAPI Ratings API
const RAPIDAPI_KEY = "b8fcb9ce5fmsh352162e453eff0ep14c32fjsn816d403fc4f1"
const RAPIDAPI_HOST = "movies-ratings2.p.rapidapi.com"
const RATINGS_API_URL = `https://${RAPIDAPI_HOST}/ratings`

export default function MovieApp() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSearchTerm, setCurrentSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [yearFilter, setYearFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [favorites, setFavorites] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [currentView, setCurrentView] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchPopularMovies()
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user")
      const savedUsers = localStorage.getItem("users")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      }
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers))
      }
    }
  }, [])

  const fetchPopularMovies = async () => {
    setLoading(true)
    try {
      const popularTitles = [
        "Avengers", "Batman", "Spider-Man", "Star Wars", "Iron Man",
        "The Matrix", "Inception", "Interstellar", "The Dark Knight", "Joker"
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
        let ratingsData = {}

        try {
          const ratingsRes = await fetch(`${RATINGS_API_URL}?id=${imdbID}`, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": RAPIDAPI_KEY,
              "X-RapidAPI-Host": RAPIDAPI_HOST,
            },
          })
          ratingsData = await ratingsRes.json()
        } catch (err) {
          console.error("Error fetching ratings:", err)
        }

        const enrichedMovie = {
          ...data,
          customRatings: ratingsData,
        }

        setSelectedMovie(enrichedMovie)
        console.log("Fetched Movie with Ratings:", enrichedMovie)
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
      setCurrentView("home")
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
    if (!isAuthenticated) {
      alert("Please login to add favorites!")
      return
    }
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.imdbID === movie.imdbID)
      return isFavorite ? prev.filter((fav) => fav.imdbID !== movie.imdbID) : [...prev, movie]
    })
  }

  const isFavorite = (movieId) => favorites.some((fav) => fav.imdbID === movieId)

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

  const handleLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

    const existingUser = users.find((u) => u.email === email && u.password === password)

    if (existingUser) {
      const userData = {
        email: existingUser.email,
        name: existingUser.name,
        avatar: existingUser.avatar,
      }
      setUser(userData)
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData))
      }
      setCurrentView("home")
    } else {
      alert("Invalid email or password. Please try again or sign up for a new account.")
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      alert("User with this email already exists!")
      return
    }

    const newUser = {
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff`,
      joinDate: new Date().toISOString(),
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)

    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(updatedUsers))
    }

    const userData = {
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar,
    }

    setUser(userData)
    setIsAuthenticated(true)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData))
    }
    setCurrentView("home")
    alert("Account created successfully! Welcome to CineVeer!")
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setFavorites([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  const renderContent = () => {
    const commonProps = {
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
      user,
      searchTerm,
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
      setCurrentView,
      setSearchTerm,
      setCurrentSearchTerm,
      searchMovies,
      fetchPopularMovies,
      handleLogin,
      handleSignup,
    }

    switch (currentView) {
      case "movies": return <MoviesPage {...commonProps} />
      case "favorites": return isAuthenticated ? <FavoritesPage {...commonProps} /> : <LoginPage {...commonProps} />
      case "login": return <LoginPage {...commonProps} />
      case "signup": return <SignupPage {...commonProps} />
      case "profile": return isAuthenticated ? <ProfilePage {...commonProps} /> : <LoginPage {...commonProps} />
      case "settings": return isAuthenticated ? <SettingsPage {...commonProps} /> : <LoginPage {...commonProps} />
      default: return <HomePage {...commonProps} />
    }
  }

  return (
    <div className="movie-app">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        user={user}
        favorites={favorites}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
      />
      <main className="main-content">{renderContent()}</main>
      <MovieModal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      <footer className="footer">
        <div className="footer-content">
          <p>Created by <strong>Veeresh</strong></p>
          <p>
            📧 <a href="mailto:veereshhedderi18@gmail.com" target="_blank" rel="noopener noreferrer">veereshhedderi18@gmail.com</a> &nbsp;|&nbsp;
            🔗 <a href="https://www.linkedin.com/in/veeresh-hedderi-83838525b" target="_blank" rel="noopener noreferrer">LinkedIn</a> &nbsp;|&nbsp;
            💻 <a href="https://github.com/Veer212004" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
