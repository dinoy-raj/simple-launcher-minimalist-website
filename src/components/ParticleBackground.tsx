import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const spacing = 35; // Slightly increased spacing to reduce count
    const numRows = 40; // Reduced from 50
    const numCols = 70; // Reduced from 80
    const particles: { x: number; y: number; z: number; ox: number; oz: number }[] = [];

    // Initialize grid centered around origin
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        particles.push({
          x: (i - numCols / 2) * spacing,
          y: 0,
          z: (j - numRows / 2) * spacing,
          ox: (i - numCols / 2) * spacing,
          oz: (j - numRows / 2) * spacing,
        });
      }
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      frame += 0.05;

      const mx = (mouseX - cx) / width;
      const my = (mouseY - cy) / height;

      ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Alpha handled per particle

      // Performance optimization: Batch drawing is tricky with varying alpha.
      // We will group by approximate alpha or just draw individually if needed.
      // For this effect, depth-based alpha is crucial.
      // To optimize, we can skip very transparent particles or use squares.

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dist = Math.sqrt(p.ox * p.ox + p.oz * p.oz);

        p.y = Math.sin(p.ox * 0.02 + frame) * 20 +
              Math.sin(p.oz * 0.03 + frame * 0.5) * 20 +
              Math.sin(dist * 0.01 - frame) * 10;

        const baseTilt = 1.2;
        const rotX = baseTilt + my * 0.5;
        const rotY = mx * 0.5;

        const x1 = p.ox * Math.cos(rotY) - p.oz * Math.sin(rotY);
        const z1 = p.oz * Math.cos(rotY) + p.ox * Math.sin(rotY);

        const y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + p.y * Math.sin(rotX);

        const cameraZ = 800;
        const scale = cameraZ / (cameraZ + z2 + 800);

        if (scale > 0) {
          const x2d = x1 * scale + cx;
          const y2d = y2 * scale + cy + 100;

          // Use squares for performance
          const size = 2 * scale;
          const alpha = Math.max(0, Math.min(1, (scale - 0.2) * 2));

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.rect(x2d, y2d, size, size);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
