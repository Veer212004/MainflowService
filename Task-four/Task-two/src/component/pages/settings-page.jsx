export default function SettingsPage() {
  return (
    <div className="page-content">
      <div className="settings-container">
        <h1 className="page-title">Settings</h1>

        <div className="settings-section">
          <h3>Account Settings</h3>
          <div className="settings-item">
            <label>Email Notifications</label>
            <input type="checkbox" className="settings-toggle" />
          </div>
          <div className="settings-item">
            <label>Dark Mode</label>
            <input type="checkbox" className="settings-toggle" defaultChecked />
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy</h3>
          <div className="settings-item">
            <label>Make Profile Public</label>
            <input type="checkbox" className="settings-toggle" />
          </div>
          <div className="settings-item">
            <label>Share Watchlist</label>
            <input type="checkbox" className="settings-toggle" />
          </div>
        </div>

        <div className="settings-section">
          <h3>Danger Zone</h3>
          <button className="danger-button">Delete Account</button>
        </div>
      </div>
    </div>
  )
}
