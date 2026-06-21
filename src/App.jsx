import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [running])

  const formatTime = useCallback((ms) => {
    const mins = String(Math.floor((ms / 60000) % 60)).padStart(2, '0')
    const secs = String(Math.floor((ms / 1000) % 60)).padStart(2, '0')
    const centis = String(Math.floor((ms / 10) % 100)).padStart(2, '0')
    return { mins, secs, centis }
  }, [])

  const { mins, secs, centis } = formatTime(time)

  const handleStart = () => setRunning(true)
  const handleStop = () => setRunning(false)
  const handleReset = () => {
    setRunning(false)
    setTime(0)
    setLaps([])
  }
  const handleLap = () => {
    if (running && time > 0) {
      const lastLapTime = laps.length > 0 ? laps[0].totalTime : 0
      setLaps((prev) => [
        { id: prev.length + 1, totalTime: time, diff: time - lastLapTime },
        ...prev,
      ])
    }
  }

  const progressWidth = ((time / 10) % 100)

  return (
    <>
      {/* Background Effects */}
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">⏱</div>
          <div className="nav-logo-text">
            Count<span>Up</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#timer">Timer</a></li>
          <li><a href="#features">Features</a></li>
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById('timer')?.scrollIntoView({ behavior: 'smooth' })}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="timer">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Precision Time Tracking
        </div>

        <h1>
          Track Every<br />
          <span className="gradient-text">Millisecond</span>
        </h1>

        <p className="hero-subtitle">
          A beautifully crafted stopwatch with lap tracking, precision timing, and a sleek dark interface designed for focus.
        </p>

        {/* Timer Card */}
        <div className="timer-card">
          <div className="timer-label">Elapsed Time</div>

          {/* Timer Display */}
          <div className="timer-display">
            <div className="timer-segment">
              <span className={`timer-value ${running ? 'running' : ''}`}>{mins}</span>
              <span className="timer-unit">min</span>
            </div>
            <span className={`timer-separator ${running ? 'running' : ''}`}>:</span>
            <div className="timer-segment">
              <span className={`timer-value ${running ? 'running' : ''}`}>{secs}</span>
              <span className="timer-unit">sec</span>
            </div>
            <span className={`timer-separator ${running ? 'running' : ''}`}>:</span>
            <div className="timer-segment">
              <span className={`timer-value ${running ? 'running' : ''}`}>{centis}</span>
              <span className="timer-unit">ms</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressWidth}%` }} />
          </div>

          {/* Controls */}
          <div className="controls">
            {!running ? (
              <button className="btn btn-start" id="btn-start" onClick={handleStart} type="button">
                <span className="btn-icon">▶</span>
                {time > 0 ? 'Resume' : 'Start'}
              </button>
            ) : (
              <button className="btn btn-stop" id="btn-stop" onClick={handleStop} type="button">
                <span className="btn-icon">⏸</span>
                Pause
              </button>
            )}

            <button className="btn btn-reset" id="btn-lap" onClick={handleLap} type="button" disabled={!running || time === 0} style={{ opacity: running && time > 0 ? 1 : 0.4 }}>
              <span className="btn-icon">🏁</span>
              Lap
            </button>

            <button className="btn btn-reset" id="btn-reset" onClick={handleReset} type="button" disabled={time === 0} style={{ opacity: time > 0 ? 1 : 0.4 }}>
              <span className="btn-icon">↺</span>
              Reset
            </button>
          </div>

          {/* Lap Times */}
          {laps.length > 0 && (
            <div className="laps-section">
              <div className="laps-header">
                <span className="laps-title">Lap Times</span>
                <span className="laps-count">{laps.length} laps</span>
              </div>
              <div className="laps-list">
                {laps.map((lap) => {
                  const lapF = formatTime(lap.diff)
                  return (
                    <div className="lap-item" key={lap.id}>
                      <span className="lap-number">#{String(lap.id).padStart(2, '0')}</span>
                      <span className="lap-time">
                        {lapF.mins}:{lapF.secs}:{lapF.centis}
                      </span>
                      <span className="lap-diff">
                        +{formatTime(lap.diff).mins}:{formatTime(lap.diff).secs}.{formatTime(lap.diff).centis}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-header">
          <h2>Built for Precision</h2>
          <p>Every detail designed to give you the most accurate and beautiful timing experience.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon purple">⚡</div>
            <h3>10ms Accuracy</h3>
            <p>Ultra-precise timing with 10-millisecond intervals for professional-grade accuracy in every measurement.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon blue">📋</div>
            <h3>Lap Tracking</h3>
            <p>Record unlimited laps with split times and differences. Perfect for training sessions and competitions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon cyan">🎨</div>
            <h3>Minimal Design</h3>
            <p>A clean, distraction-free interface with a dark theme that keeps you focused on what matters most.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Crafted with precision — <a href="#">CountUp</a> © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}

export default App
