import React, { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';
import { Loading, Product, AlertMessage } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { isLoading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <Row>
          {products?.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
