import React, { useEffect } from 'react';
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertMessage, Loading, Rating } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { useState } from 'react';
import { addToCart } from '../actions/cartActions';
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, isLoading, singleProduct } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty));
  };

  return (
    <>
      <Link to='/' className='btn btn-outline-secondary my-3'>
        GO BACK
      </Link>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
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
                {singleProduct.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(singleProduct.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='w-100'
                    type='button'
                    disabled={singleProduct.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
