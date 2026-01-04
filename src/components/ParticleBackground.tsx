import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Initial resize
    handleResize();

    window.addEventListener('resize', handleResize);

    // Grid parameters
    const rows = 50;
    const cols = 50;
    const spacing = 40;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        // Normalized coordinates from -1 to 1
        targetMouseX = (e.clientX / width) * 2 - 1;
        targetMouseY = (e.clientY / height) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    let time = 0;

    const render = () => {
        // Clear background
        ctx.fillStyle = '#111'; // Dark background
        ctx.fillRect(0, 0, width, height);

        // Update mouse smoothing
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        time += 0.02;

        // Camera/View parameters
        // The wave is in XZ plane
        // We look from a position slightly above and back

        // Base rotations
        const basePitch = 0.4; // Tilt down to see the floor

        // Mouse influence
        const pitch = basePitch + mouseY * 0.1;
        const yaw = mouseX * 0.1;

        const fov = 300;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Calculate grid position centered at 0,0
                const x = (c - cols / 2) * spacing;
                const z = (r - rows / 2) * spacing;

                // Height calculation (Wave)
                // Simple sine wave moving in z
                const y = Math.sin(x * 0.02 + time) * 20 + Math.cos(z * 0.02 + time) * 20;

                // 3D Rotation
                // Rotate around Y (Yaw)
                const x1 = x * Math.cos(yaw) - z * Math.sin(yaw);
                const z1 = x * Math.sin(yaw) + z * Math.cos(yaw);

                // Rotate around X (Pitch)
                const y2 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
                const z2 = y * Math.sin(pitch) + z1 * Math.cos(pitch);

                // Perspective projection
                // Push camera back
                const zFinal = z2 + 800; // Camera distance

                if (zFinal > 0) {
                    const scale = fov / zFinal;
                    const x2d = width / 2 + x1 * scale;
                    const y2d = height / 2 + y2 * scale + 250; // Offset downwards

                    // Draw particle
                    const size = 1.5 * (scale * 2);

                    // Simple clipping
                    if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
                        ctx.beginPath();
                        ctx.arc(x2d, y2d, size > 0 ? size : 0, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }

        frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleBackground;
