import React, { useRef, useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { useInterview } from '../features/interview/hooks/useInterview'
import './style/Profile.scss'

gsap.registerPlugin(ScrollTrigger)

const Profile = () => {
  const { user, handleLogout } = useAuth()
  const { reports } = useInterview();
  const navigate = useNavigate()

  // Refs for animations
  const heroBadgeRef = useRef()
  const heroH1Ref = useRef()
  const profileCardRef = useRef()
  const statsRef = useRef()
  const actionsRef = useRef()

  useEffect(() => {
    const timeline = gsap.timeline()

    // Badge entrance
    timeline.fromTo(
      heroBadgeRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    // H1 entrance
    timeline.fromTo(
      heroH1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    // Profile card entrance
    timeline.fromTo(
      profileCardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    // Stats entrance
    timeline.fromTo(
      statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    // Actions entrance
    timeline.fromTo(
      actionsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
  }, [])

  if (!user) {
    return (
      <div className='profile-page'>
        <div className='no-user'>
          <h2>Please log in to view your profile</h2>
          <button onClick={() => navigate('/login')} className='btn-login'>
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const averageMatchScore = reports.length > 0
    ? (reports.reduce((sum, report) => sum + report.matchScore, 0) / reports.length).toFixed(2)
    : 'N/A';
  const handleLogoutClick = () => {
    handleLogout()
    navigate('/login')
  }

  return (
    <div className='profile-page'>
      {/* Decorative blobs */}
      <div className='profile__blob profile__blob--1' aria-hidden='true' />
      <div className='profile__blob profile__blob--2' aria-hidden='true' />
      <div className='profile__blob profile__blob--3' aria-hidden='true' />

      <section className='profile-hero'>
        <div className='profile-hero__content'>
          {/* Badge */}
          <div className='profile-hero__badge' ref={heroBadgeRef}>
            <span className='profile-hero__badge-dot' />
            User Profile
          </div>

          {/* Heading */}
          <h1 className='profile-hero__h1' ref={heroH1Ref}>
            Welcome,{' '}
            <span className='profile-hero__name'>{user.username}</span>
          </h1>

          {/* Subtitle */}
          <p className='profile-hero__sub'>
            Manage your account and view your interview preparation progress
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <div className='profile-content'>
        {/* Main Profile Card */}
        <div className='profile-card' ref={profileCardRef}>
          <div className='profile-card__header'>
            <div className='profile-avatar'>
              {user.username?.[0]?.toUpperCase()}
            </div>
            <div className='profile-info'>
              <h2>{user.username}</h2>
              <p className='profile-email'>{user.email}</p>
            </div>
          </div>

          <div className='profile-card__body'>
            <div className='profile-section'>
              <h3 className='section-title'>Account Information</h3>
              <div className='info-grid'>
                <div className='info-item'>
                  <label>Username</label>
                  <p>{user.username}</p>
                </div>
                <div className='info-item'>
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className='info-item'>
                  <label>Member Since</label>
                  <p>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className='info-item'>
                  <label>Account Status</label>
                  <p className='status-active'>Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className='profile-stats' ref={statsRef}>
          <h2>Your Activity</h2>
          <div className='stats-grid'>
            <div className='stat-card'>
              <div className='stat-icon'>📊</div>
              <div className='stat-content'>
                <p className='stat-number'>{reports.length}</p>
                <p className='stat-label'>Interview Plans</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon'>📈</div>
              <div className='stat-content'>
                <p className='stat-number'>{reports.length}</p>
                <p className='stat-label'>Reports Generated</p>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon'>⭐</div>
              <div className='stat-content'>
                <p className='stat-number'>{averageMatchScore}%</p>
                <p className='stat-label'>Avg. Match Score</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className='profile-actions' ref={actionsRef}>
          <button
            onClick={() => navigate('/')}
            className='action-btn action-btn--primary'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
              <polyline points='9 22 9 12 15 12 15 22' />
            </svg>
            Back to Home
          </button>
          <button onClick={handleLogoutClick} className='action-btn action-btn--danger'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
              <polyline points='16 17 21 12 16 7' />
              <line x1='21' y1='12' x2='9' y2='12' />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile