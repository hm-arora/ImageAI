import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ImageHoverReveal: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Handle mouse movement to track position
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Use useEffect to add and remove event listeners
  useEffect(() => {
    const handleMouseLeave = () => setHovered(false);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Variants for image reveal with zoom effect and index-based rotation
  const imageVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: (i - 1) * 10, // Rotation based on index: -10, 0, 10 degrees
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const images = [
    { src: "/images/1.webp", alt: "Image 1" },
    { src: "/images/2.webp", alt: "Image 2" },
    { src: "/images/3.webp", alt: "Image 3" },
  ];

  console.log("isHOvered", hovered);

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href="#" className="text-lg font-bold">
        Hover over me
      </a>

      {hovered && (
        <motion.div
          className="fixed z-10 w-full h-full"
          style={{
            top: mousePosition.y + 10,
            left: mousePosition.x + 20, // Adjust positioning
            pointerEvents: "none",
          }}
          initial="hidden"
          animate="visible"
        >
          {images.map((image, index) => (
            <motion.img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="absolute w-48 h-36 object-cover shadow-lg rounded-lg"
              custom={index}
              variants={imageVariants}
              style={{
                top: index === 0 ? -10 : index * 10, // Move first image up by 10px
                left: index * 80, // Adjust horizontal positioning
                zIndex: images.length + index, // Reverse z-index order
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ImageHoverReveal;
