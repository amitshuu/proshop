import React from 'react';
import { Card } from 'react-bootstrap';
import { Rating } from '../components';
import { Link } from 'react-router-dom';
const Product = ({ _id, image, name, rating, numReviews, price }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div'>{name}</Card.Title>
        </Link>
        <Card.Text as='div' className='my-3'>
          <Rating value={rating} numReviews={numReviews} />
        </Card.Text>

        <Card.Text as='h3'>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
