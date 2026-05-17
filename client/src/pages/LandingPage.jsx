import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

import ClubCard from "../components/ClubCard";

import {Camera,Code2,Music,ArrowRight } from "lucide-react";

import EventCard from "../components/EventCard";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="page-container">

      <div className="glow-purple"></div>
      <div className="glow-cyan"></div>

      <Navbar />

      <section className="section-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Empowering
          <span className="gradient-text">
            {" "}Campus Clubs
          </span>
        </motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          className="hero-description"
        >
          A modern platform for student clubs,
          events, participation, and campus
          engagement.
        </motion.p>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hero-buttons"
        >

        <a href="#clubs" className="primary-btn">Explore Clubs</a>

         <Link
            to="/login"
            className="secondary-btn"
          >
            Login
          </Link>

        </motion.div>

      </section>
      {/* FEATURED CLUBS */}

      <section id="clubs" className="py-24 relative z-10">

        <div className="main-container">

          <h2 className="section-title text-center">
            Featured Clubs
          </h2>

          <p className="section-description text-center">
            Explore communities, events,
            and opportunities across campus.
          </p>


          <div className="club-grid">

            <ClubCard
              title="Photography Club"
              description="Capture moments, tell stories, and build your creative portfolio."
              gradient="gradient-purple"
              icon={<Camera size={32} />}
            />

            <ClubCard
              title="Coding Club"
              description="Build projects, attend hackathons, and grow your tech skills."
              gradient="gradient-cyan"
              icon={<Code2 size={32} />}
            />

            <ClubCard
              title="Music Club"
              description="Collaborate, perform, and express your musical creativity."
              gradient="gradient-pink"
              icon={<Music size={32} />}
            />

          </div>

        </div>

        </section>

        {/* UPCOMING EVENTS */}

        <section className="py-24 relative z-10">

          <div className="main-container">

            <h2 className="section-title text-center">
              Upcoming Events
            </h2>

            <p className="section-description text-center">
              Discover workshops, competitions,
              and campus experiences happening soon.
            </p>


            <div className="events-grid">

              <EventCard
                title="Photography Workshop"
                date="10 June 2026"
                venue="Main Auditorium"
                attendees="120"
                gradient="event-gradient-1"
              />

              <EventCard
                title="Hackathon 2026"
                date="18 June 2026"
                venue="Innovation Lab"
                attendees="250"
                gradient="event-gradient-2"
              />

              <EventCard
                title="Music Night"
                date="25 June 2026"
                venue="Open Air Theatre"
                attendees="180"
                gradient="event-gradient-3"
              />

            </div>

          </div>

        </section>
        {/* CTA SECTION */}

        <section className="cta-section">

        <div className="main-container">

          <div className="cta-container">

            <div className="cta-gradient"></div>

            <div className="cta-overlay"></div>

            <div className="cta-content">

              <h2 className="cta-title">
                Build Your Campus
                Experience
              </h2>

              <p className="cta-description">
                Join clubs, attend events,
                collaborate with students,
                and become part of a thriving
                campus community.
              </p>


              <div className="cta-buttons">

              <Link to="/register" className="white-btn flex items-center gap-2">
                Get Started<ArrowRight size={20} /></Link>

                <button className="glass-btn">
                  Explore Events
                </button>

              </div>

            </div>

          </div>

        </div>

        </section>


        {/* FOOTER */}

        <footer className="footer">

        <h3 className="footer-title">
          Nexus Club
        </h3>

        <p className="footer-text">
          Empowering campus communities
          through clubs, events, and
          student engagement.
        </p>

        </footer>

    </div>
  );
};

export default LandingPage;