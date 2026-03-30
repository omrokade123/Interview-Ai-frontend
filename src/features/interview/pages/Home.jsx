// import React, { useState, useRef } from 'react'
// import "../style/home.scss"
// import { useInterview } from '../hooks/useInterview.js'
// import { useNavigate } from 'react-router'

// const Home = () => {

//     const { loading, generateReport,reports } = useInterview()
//     const [ jobDescription, setJobDescription ] = useState("")
//     const [ selfDescription, setSelfDescription ] = useState("")
//     const resumeInputRef = useRef()

//     const navigate = useNavigate()

//     const handleGenerateReport = async () => {
//         const resumeFile = resumeInputRef.current.files[ 0 ]
//         const data = await generateReport({ jobDescription, selfDescription, resumeFile })
//         navigate(`/interview/${data._id}`)
//     }

//     if (loading) {
//         return (
//             <main className='loading-screen'>
//                 <h1>Loading your interview plan...</h1>
//             </main>
//         )
//     }

//     return (
//         <div className='home-page'>

//             {/* Page Header */}
//             <header className='page-header'>
//                 <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
//                 <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
//             </header>

//             {/* Main Card */}
//             <div className='interview-card'>
//                 <div className='interview-card__body'>

//                     {/* Left Panel - Job Description */}
//                     <div className='panel panel--left'>
//                         <div className='panel__header'>
//                             <span className='panel__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
//                             </span>
//                             <h2>Target Job Description</h2>
//                             <span className='badge badge--required'>Required</span>
//                         </div>
//                         <textarea
//                             onChange={(e) => { setJobDescription(e.target.value) }}
//                             className='panel__textarea'
//                             placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
//                             maxLength={5000}
//                         />
//                         <div className='char-counter'>0 / 5000 chars</div>
//                     </div>

//                     {/* Vertical Divider */}
//                     <div className='panel-divider' />

//                     {/* Right Panel - Profile */}
//                     <div className='panel panel--right'>
//                         <div className='panel__header'>
//                             <span className='panel__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
//                             </span>
//                             <h2>Your Profile</h2>
//                         </div>

//                         {/* Upload Resume */}
//                         <div className='upload-section'>
//                             <label className='section-label'>
//                                 Upload Resume
//                                 <span className='badge badge--best'>Best Results</span>
//                             </label>
//                             <label className='dropzone' htmlFor='resume'>
//                                 <span className='dropzone__icon'>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
//                                 </span>
//                                 <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
//                                 <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
//                                 <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
//                             </label>
//                         </div>

//                         {/* OR Divider */}
//                         <div className='or-divider'><span>OR</span></div>

//                         {/* Quick Self-Description */}
//                         <div className='self-description'>
//                             <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
//                             <textarea
//                                 onChange={(e) => { setSelfDescription(e.target.value) }}
//                                 id='selfDescription'
//                                 name='selfDescription'
//                                 className='panel__textarea panel__textarea--short'
//                                 placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
//                             />
//                         </div>

//                         {/* Info Box */}
//                         <div className='info-box'>
//                             <span className='info-box__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
//                             </span>
//                             <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className='interview-card__footer'>
//                     <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
//                     <button
//                         onClick={handleGenerateReport}
//                         className='generate-btn'>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
//                         Generate My Interview Strategy
//                     </button>
//                 </div>
//             </div>

//             {/* Recent Reports List */}
//             {reports.length > 0 && (
//                 <section className='recent-reports'>
//                     <h2>My Recent Interview Plans</h2>
//                     <ul className='reports-list'>
//                         {reports.map(report => (
//                             <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
//                                 <h3>{report.title || 'Untitled Position'}</h3>
//                                 <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
//                                 <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//             )}

//             {/* Page Footer */}
//             <footer className='page-footer'>
//                 <a href='#'>Privacy Policy</a>
//                 <a href='#'>Terms of Service</a>
//                 <a href='#'>Help Center</a>
//             </footer>
//         </div>
//     )
// }

// export default Home


import { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    // Hero refs
    const heroBadgeRef  = useRef()
    const heroH1Ref     = useRef()
    const heroSubRef    = useRef()
    const heroStatsRef  = useRef()
    const heroScrollRef = useRef()

    // Form section refs
    const formTitleRef     = useRef()
    const interviewCardRef = useRef()
    const recentReportsRef = useRef()
    const pageFooterRef    = useRef()

    useEffect(() => {
        // ── Guard: don't animate if refs aren't mounted ───────────────────
        if (!heroBadgeRef.current) return

        // ── 1. HERO ENTRANCE (on load, no scroll trigger) ─────────────────
        const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } })

        // Set initial hidden states first
        gsap.set(heroBadgeRef.current, { opacity: 0, y: -30 })
        gsap.set(heroH1Ref.current.querySelectorAll('.hero-line'), {
            opacity: 0,
            x: (i) => (i % 2 === 0 ? -100 : 100),
        })
        gsap.set(heroSubRef.current,          { opacity: 0, y: 25 })
        gsap.set(heroStatsRef.current,        { opacity: 0, y: 30 })
        gsap.set(heroScrollRef.current,       { opacity: 0, y: 12 })

        // Animate hero elements in sequence
        heroTl
            .to(heroBadgeRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.1)
            .to(
                heroH1Ref.current.querySelectorAll('.hero-line'),
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.14, ease: 'expo.out' },
                0.25
            )
            .to(heroSubRef.current,    { opacity: 1, y: 0, duration: 0.65 }, 0.65)
            .to(heroStatsRef.current,  { opacity: 1, y: 0, duration: 0.6  }, 0.82)
            .to(heroScrollRef.current, { opacity: 1, y: 0, duration: 0.5  }, 1.1)

        // ── 2. SCROLL-TRIGGERED ANIMATIONS ────────────────────────────────

        // Form section title — slides up when scrolled into view
        gsap.set(formTitleRef.current, { opacity: 0, y: 40 })
        gsap.to(formTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: formTitleRef.current,
                start: 'top 85%',
                once: true,
            },
        })

        // Card — 3-D perspective flip entry
        gsap.set(interviewCardRef.current, {
            opacity: 0,
            y: 80,
            rotationX: 20,
            rotationZ: -3,
            transformPerspective: 900,
            transformOrigin: '50% 110%',
        })
        gsap.to(interviewCardRef.current, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationZ: 0,
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: interviewCardRef.current,
                start: 'top 88%',
                once: true,
            },
        })

        // Footer — fade up
        gsap.set(pageFooterRef.current, { opacity: 0, y: 20 })
        gsap.to(pageFooterRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: pageFooterRef.current,
                start: 'top 95%',
                once: true,
            },
        })

        // Recent reports stagger (runs only if reports exist)
        if (recentReportsRef.current) {
            const items = recentReportsRef.current.querySelectorAll('.report-item')
            gsap.set(items, { opacity: 0, y: 35, rotationZ: -1.5 })
            gsap.to(items, {
                opacity: 1,
                y: 0,
                rotationZ: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.3)',
                scrollTrigger: {
                    trigger: recentReportsRef.current,
                    start: 'top 85%',
                    once: true,
                },
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [loading]) // re-run after loading resolves so refs are in the DOM

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    // ── Loading state — minimal, non-blocking spinner ─────────────────────
    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loading-screen__spinner' />
                <p>Crafting your personalized interview plan…</p>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* ══════════════════════════════════════
                HERO — full viewport
            ══════════════════════════════════════ */}
            <section className='hero'>

                {/* Decorative blobs */}
                <div className='hero__blob hero__blob--1' aria-hidden='true' />
                <div className='hero__blob hero__blob--2' aria-hidden='true' />
                <div className='hero__blob hero__blob--3' aria-hidden='true' />

                <div className='hero__content'>

                    {/* Badge */}
                    <div className='hero__badge' ref={heroBadgeRef}>
                        <span className='hero__badge-dot' />
                        AI-Powered Interview Prep
                    </div>

                    {/* Headline — 3 lines, each animated separately */}
                    <h1 className='hero__h1' ref={heroH1Ref}>
                        <span className='hero-line'>Crack Every</span>
                        <span className='hero-line hero-line--accent'>Interview</span>
                        <span className='hero-line'>With Confidence</span>
                    </h1>

                    {/* Subtitle */}
                    <p className='hero__sub' ref={heroSubRef}>
                        Drop in a job description, upload your resume, and let our AI generate
                        a hyper-personalised strategy — technical questions, behavioural prep,
                        skill gap analysis, and a day-by-day roadmap. In 30 seconds.
                    </p>

                    {/* Stats */}
                    <div className='hero__stats' ref={heroStatsRef}>
                        <div className='hero-stat'>
                            <span className='hero-stat__number'>10k+</span>
                            <span className='hero-stat__label'>Plans Generated</span>
                        </div>
                        <div className='hero-stat__divider' />
                        <div className='hero-stat'>
                            <span className='hero-stat__number'>92%</span>
                            <span className='hero-stat__label'>Interview Success Rate</span>
                        </div>
                        <div className='hero-stat__divider' />
                        <div className='hero-stat'>
                            <span className='hero-stat__number'>~30s</span>
                            <span className='hero-stat__label'>Generation Time</span>
                        </div>
                    </div>

                </div>

                {/* Scroll hint */}
                <div className='hero__scroll' ref={heroScrollRef} aria-hidden='true'>
                    <span>Scroll to build your plan</span>
                    <div className='hero__scroll-mouse'>
                        <div className='hero__scroll-dot' />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
                FORM SECTION
            ══════════════════════════════════════ */}
            <div className='form-section'>

                <div className='form-section__title' ref={formTitleRef}>
                    <h2>Create Your Custom <span className='highlight'>Interview Plan</span></h2>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>

                {/* Main Card */}
                <div className='interview-card' ref={interviewCardRef}>
                    <div className='interview-card__body'>

                        {/* Left Panel */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                className='panel__textarea'
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                        </div>

                        <div className='panel-divider' />

                        {/* Right Panel */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2>Your Profile</h2>
                            </div>

                            <div className='upload-section'>
                                <label className='section-label'>
                                    Upload Resume
                                    <span className='badge badge--best'>Best Results</span>
                                </label>
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                    <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                                </label>
                            </div>

                            <div className='or-divider'><span>OR</span></div>

                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                                </span>
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                        <button onClick={handleGenerateReport} className='generate-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                {reports.length > 0 && (
                    <section className='recent-reports' ref={recentReportsRef}>
                        <h2>My Recent Interview Plans</h2>
                        <ul className='reports-list'>
                            {reports.map(report => (
                                <li
                                    key={report._id}
                                    className='report-item'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

            </div>

            {/* Footer */}
            <footer className='page-footer' ref={pageFooterRef}>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>

        </div>
    )
}

export default Home