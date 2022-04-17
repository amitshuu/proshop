import React from 'react';

const Rating = ({ value, text, color, numReviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {value > number ? (
          <i style={{ color }} className='fas fa-star' />
        ) : value > index ? (
          <i style={{ color }} className='fas fa-star-half-alt' />
        ) : (
          <i style={{ color }} className='far fa-star' />
        )}
      </span>
    );
  });

  return (
    <div className='rating'>
      {tempStars}
      <span>{text || `${numReviews} reviews`}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
