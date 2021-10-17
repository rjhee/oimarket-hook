import { Component, useState, useEffect } from 'react';
import { Link, Router, Switch, Route } from 'react-router-dom';
import { firestore, storage, firebaseAppAuth } from './fireBase';

import Navbar from './components/navbar';
import FooterMenu from './components/footerMenu';
import ProductDetail from './components/productDetail';
import ProductList from './components/productList';
import UserProfile from './components/userProfile';
import UploadForm from './components/uploadForm';

const App = () => {
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const db = await firestore.collection('product').get();

    db.forEach((product) => {
      const productObject = {
        ...product.data(),
        id: product.id,
      };
      setProducts((prev) => [productObject, ...prev]);
    });
  };

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const getUser = async () => {
    // firebaseAppAuth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setIsLoggedIn(true);
    //     setUserObj(user);
    //     localStorage.setItem('user', JSON.stringify(user));
    //   } else {
    //     setIsLoggedIn(false);
    //   }
    //   setInit(true);
    // });
  };
  useEffect(() => {
    getData();
    getUser();
  }, []);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <Navbar></Navbar>
      <Switch>
        <Route path="/productList" component={ProductList}>
          <ProductList products={products}></ProductList>
        </Route>
        <Route path="/userProfile" component={UserProfile}>
          <UserProfile></UserProfile>
        </Route>
        <Route path="/productDetail/:id" component={ProductDetail}>
          <ProductDetail products={products}></ProductDetail>
        </Route>
        <Route path="/uploadForm" component={UploadForm}>
          <UploadForm></UploadForm>
        </Route>
      </Switch>
      <FooterMenu></FooterMenu>
    </div>
  );
};

export default App;
