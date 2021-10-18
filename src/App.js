import { useState, useEffect } from 'react';
import {
  useHistory,
  useParams,
  Link,
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { firestore, storage, firebaseAppAuth } from './fireBase';

import Navbar from './components/navbar';
import FooterMenu from './components/footerMenu';
import Join from './components/join';
import Login from './components/login';
import ProductDetail from './components/productDetail';
import ProductList from './components/productList';
import UserProfile from './components/userProfile';
import UploadForm from './components/uploadForm';
import Edit from './components/edit';
import Chat from './components/chat';

const App = () => {
  let history = useHistory();
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const db = await firestore
      .collection('product')
      .orderBy('time', 'asc')
      .get();
    db.forEach((product) => {
      const productObject = {
        ...product.data(),
        id: product.id,
      };
      setProducts((prev) => [productObject, ...prev]);
    });
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = async (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const [user, setUser] = useState({ name: '', email: '', uid: '' });
  const [isUser, setIsUser] = useState(false);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    firebaseAppAuth
      .signInWithEmailAndPassword(email, password)
      .then(
        (result) =>
          setUser({
            name: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
          }),

        setIsUser(true)
      )
      .then(() => {
        history.location.pathname === '/join'
          ? history.goBack()
          : history.push('/userProfile');
      })
      .catch((error) => console.log(error));
  };

  const onClickLogout = async () => {
    firebaseAppAuth
      .signOut()
      .then(() => setIsUser(false))
      .then(() => history.goBack());
  };

  let uploadid,
    uploaduid,
    uploaduser,
    uploadtitle,
    uploadprice,
    uploaddesc,
    uploadimg,
    uploadtime;

  const onProductChange = async (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'title') {
      uploadtitle = value;
    } else if (name === 'price') {
      uploadprice = value;
    } else if (name === 'desc') {
      uploaddesc = value;
    }
  };

  const onFileChange = async (event) => {
    const {
      target: { files },
    } = event;

    const storageRef = storage.ref();
    const imgSavePath = storageRef.child(`image/${files[0].name}`);
    const uploadImg = imgSavePath.put(files[0]);
    // _delegate._location.path_);
    uploadImg.snapshot.ref.getDownloadURL().then((url) => (uploadimg = url));
    console.log(uploadimg);
  };

  const [modal, setModal] = useState(false);

  const onSubmitUploadForm = async (event) => {
    event.preventDefault();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    uploadid = date.getTime();
    uploaduser = user.name;
    uploaduid = user.uid;
    uploadtime = [year, month, day, hours, minutes];

    const uploadProductObject = {
      id: uploadid,
      uid: uploaduid,
      user: uploaduser,
      title: uploadtitle,
      price: uploadprice,
      desc: uploaddesc,
      img: uploadimg,
      time: uploadtime,
    };

    console.log(uploadProductObject);
    firestore
      .collection('product')
      .add(uploadProductObject)
      .then(
        () => setModal(true),
        setTimeout(() => {
          setModal(false);
        }, 1000)
      )
      .then(() => history.push('/'));
  };

  const [editProduct, setEditProduct] = useState({
    title: '',
    price: '',
    desc: '',
  });
  const getProductDetail = async (event) => {
    const product = products.find(
      (product) => product.id === history.location.pathname.substr(6)
    );

    setEditProduct({
      title: product.title,
      price: product.price,
      desc: product.desc,
    });
  };

  const onEditChange = async (event) => {
    const {
      target: { name, value },
    } = event;

    let edittitle, editprice, editdesc;
    if (name === 'title') {
      edittitle = value;
    } else if (name === 'price') {
      editprice = value;
    } else if (name === 'desc') {
      editdesc = value;
    }

    setEditProduct({ title: edittitle, price: editprice, desc: editdesc });

    if (history.location.pathname.includes('edit') === false) {
      setEditProduct(null);
    }
  };

  const onSubmitEdit = async (event) => {
    event.preventDefault();
    const product = products.find(
      (product) => product.id === history.location.pathname.substr(6)
    );

    //     var updates = {};
    // updates['/users/123952306/nickname'] = 'gildong.hong';
    // updates['/users/123952306/hobbies'] = {
    //   "0": "자전거"
    // };
    console.log(product.id);
    // firestore
    //   .collection('product')
    //   .doc(product.id)
    //   .get()
    //   .then((snap) => {
    //     console.log(snap.data());
    //   });
    // .update({
    //   title: editProduct.title,
    //   price: editProduct.price,
    //   desc: editProduct.desc,
    // });
    // .then((result) => {
    //   console.log(result.data());
    // });
  };

  const createChat = async () => {
    const chatData = {
      from: user.uid,
      to: uploaduid,
      product: uploadtitle,
      date: new Date(),
    };

    firestore
      .collection('chatroom')
      .add(chatData)
      .then((result) => {
        console.log(result);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Navbar></Navbar>
      {modal === true ? <Modal></Modal> : null}
      <Switch>
        <Route exact path="/" component={ProductList}>
          <ProductList products={products}></ProductList>
        </Route>
        <Route path="/userProfile" component={UserProfile}>
          <UserProfile
            user={user}
            onClickLogout={onClickLogout}
            isUser={isUser}
          ></UserProfile>
        </Route>
        <Route path="/productDetail/:id" component={ProductDetail}>
          <ProductDetail
            products={products}
            getProductDetail={getProductDetail}
            createChat={createChat}
          ></ProductDetail>
        </Route>
        <Route path="/edit/:id" component={Edit}>
          <Edit
            products={products}
            editProduct={editProduct}
            onEditChange={onEditChange}
            onSubmitEdit={onSubmitEdit}
            getProductDetail={getProductDetail}
          ></Edit>
        </Route>
        <Route path="/uploadForm" component={UploadForm}>
          <UploadForm
            onProductChange={onProductChange}
            onSubmitUploadForm={onSubmitUploadForm}
            onFileChange={onFileChange}
          ></UploadForm>
        </Route>
        <Route path="/join" component={Join}>
          <Join
            name={name}
            email={email}
            password={password}
            onChange={onChange}
          ></Join>
        </Route>
        <Route path="/Login" component={Login}>
          <Login
            email={email}
            password={password}
            onChange={onChange}
            onSubmitLogin={onSubmitLogin}
          ></Login>
        </Route>
        <Route path="/chat" component={Chat}>
          <Chat></Chat>
        </Route>
      </Switch>
      <FooterMenu></FooterMenu>
    </div>
  );
};

function Modal() {
  return <div className="modal">성공</div>;
}

export default App;
