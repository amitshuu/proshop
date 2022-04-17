import React, { useState, useEffect } from 'react';
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Rating } from '../components';
import axios from 'axios';
const ProductScreen = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setSingleProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);
  return (
    <>
      <Link to='/' className='btn btn-outline-secondary my-3'>
        GO BACK
      </Link>
      <Row>
        <Col md={6}>
          <Image src={singleProduct.image} alt={singleProduct.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{singleProduct.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={singleProduct.rating}
                numReviews={singleProduct.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${singleProduct.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: {singleProduct.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${singleProduct.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {singleProduct.countInStock > 0
                      ? 'In Stock'
                      : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='w-100'
                  type='button'
                  disabled={singleProduct.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
