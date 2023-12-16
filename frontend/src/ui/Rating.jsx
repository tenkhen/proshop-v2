import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {Array.from(Array(5)).map((_, i) => (
        <span key={i}>
          {value >= 1 + i ? (
            <FaStar />
          ) : value >= 0.5 + i ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}

      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
