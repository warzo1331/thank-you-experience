import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import './ParticleBackground.css';

const ParticleBackground = ({ mousePosition }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.05,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.5,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.05,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <div className="particle-background">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="particles-canvas"
      />
      <div
        className="parallax-layer"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
