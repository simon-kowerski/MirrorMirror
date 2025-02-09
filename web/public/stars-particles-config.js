particlesJS("falling-stars", {
    particles: {
      number: { 
        value: 50, // Number of falling stars (adjust as needed)
        density: { enable: true, value_area: 800 }
      },
      shape: {
        type: "circle" // Uses simple white dots instead of an image
      },
      size: { value: 3 }, // Adjust particle (star) size
      opacity: { value: 0.8 },
      color: { value: "#ffffff" }, // Makes them white
      move: {
        enable: true,
        speed: 2, // Adjust falling speed
        direction: "bottom", // Makes particles fall down
        out_mode: "out" // Particles disappear when they reach the bottom
      },
      interactivity: {
        events: {
          onhover: { enable: false }, // Disable hover effects
          onclick: { enable: false }
        }
      }
    }
});
