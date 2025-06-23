"use client"

export default function SignupPage({ handleSignup, setCurrentView }) {
  return (
    <div className="page-content">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join CineVeer and start building your movie collection</p>
          </div>
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="form-input"
                placeholder="Enter your full name"
                minLength="2"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required className="form-input" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                className="form-input"
                placeholder="Create a password"
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="form-input"
                placeholder="Confirm your password"
                minLength="6"
              />
            </div>
            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <button className="link-button" onClick={() => setCurrentView("login")}>
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
