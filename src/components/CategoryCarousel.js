import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryCarousel = ({ categories, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Update the parent component whenever the active index changes
  const handleCategoryChange = (newIndex) => {
    setActiveIndex(newIndex);
    onSelect(categories[newIndex]);
  };

  const navigate = (dir) => {
    if (animating) return;

    setAnimating(true);
    let newIndex;
    if (dir === "next") {
      newIndex = (activeIndex + 1) % categories.length;
    } else {
      newIndex = (activeIndex - 1 + categories.length) % categories.length;
    }
    handleCategoryChange(newIndex);

    setTimeout(() => setAnimating(false), 400);
  };

  const goToIndex = (index) => {
    if (animating || index === activeIndex) return;
    setAnimating(true);
    handleCategoryChange(index);
    setTimeout(() => setAnimating(false), 400);
  };

  // Calculate what items to display and their positions
  const visibleItems = () => {
    let result = [];

    // We'll show 3 items - the active one plus 1 on each side
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + categories.length) % categories.length;

      // Position info
      const position = i;
      const isActive = i === 0;

      result.push({
        category: categories[index],
        index,
        position,
        isActive,
      });
    }

    return result;
  };

  return (
    <div className="category-carousel">
      <div className="carousel-container">
        {/* Carousel items */}
        <div className="carousel-items">
          {visibleItems().map((itemData) => {
            // Determine exact positioning
            let xOffset, scale, zIndex, opacity;

            if (itemData.position === 0) {
              // Center (active) item
              xOffset = 0;
              scale = 1;
              zIndex = 10;
              opacity = 1;
            } else if (itemData.position === -1) {
              // Item to the left of active
              xOffset = -150;
              scale = 0.75;
              zIndex = 5;
              opacity = 0.65;
            } else if (itemData.position === 1) {
              // Item to the right of active
              xOffset = 150;
              scale = 0.75;
              zIndex = 5;
              opacity = 0.65;
            }

            const displayName =
              itemData.category.charAt(0).toUpperCase() +
              itemData.category.slice(1);

            return (
              <div
                key={itemData.index}
                className="carousel-item"
                style={{
                  transform: `translateX(${xOffset}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                <div
                  className={`category-icon ${
                    itemData.isActive ? "active" : ""
                  }`}
                >
                  {displayName.charAt(0)}
                </div>
                <h3
                  className={`category-title ${
                    itemData.isActive ? "active" : ""
                  }`}
                >
                  {displayName}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={() => navigate("prev")}
          className="nav-button prev"
          disabled={animating}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => navigate("next")}
          className="nav-button next"
          disabled={animating}
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator dots */}
        <div className="carousel-indicators">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => goToIndex(index)}
              disabled={animating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
