import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { lazy, Suspense, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const Detail = lazy( () => import('./routes/Detail.js') )
const Cart = lazy( () => import('./routes/Cart.js') )

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [btnnum, setBtnnum] = useState(1);


  let result = useQuery(['작명'], () =>
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => { 
    return a.data
    })
  )

  

  return (

    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto username">
            { result.isLoading && '로딩중'}
            { result.error && 'Error'}
            { result.data && result.data.name }
            </Nav>
        </Container>
      </Navbar>
      
      <Suspense fallback={ <div>...Loading</div> }>
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>

            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return (
                      <Product shoes={shoes[i]} i={i} key={i}></Product>
                    )
                  })
                }
              </div>
            </div>

            <button type="button" className="btn btn-danger" onClick={() => {
              setBtnnum(btnnum+1)
              axios.get('https://codingapple1.github.io/shop/data'+ (btnnum+1) +'.json').then((결과) => {
                let copy = [...shoes, ...결과.data]
                setShoes(copy)
              })
                .catch(() => {
                  console.log('실패함')
                })
            }}>상품 추가</button>
          </>
        } />
        <Route path="/detail/:id" element={
          <Detail shoes={shoes}></Detail>
        } />
        <Route path="/event" element={<Event />} >
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={
          <>
            <p>404 Error</p>
          </>
        } />
        <Route path="/cart" element={ <Cart/> } />
      </Routes>
      </Suspense>

    </div>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function Event() {
  return (
    <>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </>
  )
}


export default App;
