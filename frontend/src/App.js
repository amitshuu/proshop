import { Container } from 'react-bootstrap';
import { Footer, Header } from './components';
import {
  CartScreen,
  HomeScreen,
  ProductScreen,
  LoginScreen,
  ProtectedRoute,
} from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileScreen from './pages/ProfileScreen';
const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main className='py-3'>
          <Routes>
            <Route
              path='/'
              exact
              element={
                <Container>
                  <HomeScreen />
                </Container>
              }
            />
            <Route
              path='/product/:id'
              element={
                <Container>
                  <ProductScreen />
                </Container>
              }
            />
            <Route
              path='/cart'
              element={
                <Container>
                  <CartScreen />
                </Container>
              }
            />
            <Route
              path='/cart/:id'
              element={
                <Container>
                  <CartScreen />
                </Container>
              }
            />
            <Route
              path='/login'
              element={
                <Container>
                  <LoginScreen />
                </Container>
              }
            />
            <Route
              path='/profile'
              element={
                <Container>
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                </Container>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
