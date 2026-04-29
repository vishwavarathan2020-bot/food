import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

const Hero = () => (
  <section className="explosive-hero-section">
    <div className="explosive-hero-bg-glow"></div>
    <div className="explosive-hero-grid">
      
      {/* Left Content Area */}
      <div className="explosive-hero-content">
        <div className="explosive-badge">
          <span className="explosive-badge-icon">🔥</span>
          <span className="explosive-badge-text">#1 Food Delivery App</span>
        </div>
        
        <h1 className="explosive-title">
          Experience the <span className="explosive-highlight ">Magic</span> of Fine Dining at Home.
        </h1>
        
        <p className="explosive-subtitle">
          From local favorites to gourmet meals, get your cravings delivered hot and fresh in under 30 minutes. Let's feast!
        </p>
        
        <div className="explosive-ctas">
          <a href="#menu" className="explosive-btn-primary" style={{ textDecoration: 'none' }}>
            Order Now <ArrowRight size={20} strokeWidth={3} />
          </a>
          <a href="#about" className="explosive-btn-secondary" style={{ textDecoration: 'none' }}>
            <PlayCircle size={20} strokeWidth={3} /> 
            <span>How it works</span>
          </a>
        </div>
      </div>
      
      {/* Right Image Area */}
      <div className="explosive-hero-visuals">
        <div className="explosive-hero-images-grid">
          <div className="explosive-hero-image-wrapper explosive-hero-image-main">
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800"
              alt="Gourmet burger with fries"
              className="explosive-hero-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800";
              }}
            />
            {/* Dynamic Floating Element */}
            <div className="explosive-floating-card">
              <div className="explosive-pulse-dot"></div>
              <div>
                <p className="explosive-float-title">Hot & Fresh</p>
                <p className="explosive-float-sub">Delivering right now</p>
              </div>
            </div>
          </div>

          <div className="explosive-hero-image-wrapper explosive-hero-image-secondary">
            <img
              src="https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800"
              alt="Colorful salad bowl"
              className="explosive-hero-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800";
              }}
            />
            <div className="explosive-floating-card explosive-floating-card-secondary">
              <div className="explosive-pulse-dot"></div>
              <div>
                <p className="explosive-float-title">Premium Quality</p>
                <p className="explosive-float-sub">Fresh ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
);

export default Hero;
