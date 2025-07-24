"use client"

export default function LoginPage({ handleLogin, setCurrentView }) {
  return (
    <div className="page-content">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your personal movie collection</p>
          </div>
          <form onSubmit={handleLogin} className="auth-form">
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
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
          <div className="auth-footer">
            <p>
              {"Don't have an account?"}{" "}
              <button className="link-button" onClick={() => setCurrentView("signup")}>
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
