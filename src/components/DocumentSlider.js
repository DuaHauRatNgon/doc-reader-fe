import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import './DocumentSlider.css';

function DocumentSlider({ title, documents }) {

  
  const sliderRef = useRef(null);

  useEffect(() => {
    const glide = new Glide(sliderRef.current, {
      type: 'carousel',
      perView: 4,
      gap: 20,
      breakpoints: {
        1024: { perView: 3 },
        768: { perView: 2 },
        480: { perView: 1 }
      }
    });

    glide.mount();

    return () => glide.destroy();
  }, [documents]);

  return (
    <div className="slider-wrapper">
      <h2>{title}</h2>
      <div className="glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {documents.map((doc, index) => (
              <li className="glide__slide" key={index}>
                <div className="slider-item">
                  <img src={doc.image} alt={doc.title} />
                  <h4>{doc.title}</h4>
                  <p>{doc.author}</p>
                  <button>Đọc</button>
                  <button>Bookmark</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glide__arrows" data-glide-el="controls">
          <button className="glide__arrow glide__arrow--left" data-glide-dir="<">‹</button>
          <button className="glide__arrow glide__arrow--right" data-glide-dir=">">›</button>
        </div>
      </div>
    </div>
  );
}

export default DocumentSlider;
