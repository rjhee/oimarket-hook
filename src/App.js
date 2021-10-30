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
import ChatList from './components/chatList';
import ChatRoom from './components/chatroom';
import Chat from './components/chat';

const App = () => {
  let history = useHistory();
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState({ name: '', email: '', uid: '' });
  const [isUser, setIsUser] = useState(false);

  const [editProduct, setEditProduct] = useState({
    id: '',
    uid: '',
    img: '',
    time: '',
    title: '',
    price: '',
    desc: '',
  });

  const [chatList, setChatList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  let uploadid,
    uploaduid,
    uploaduser,
    uploadtitle,
    uploadprice,
    uploaddesc,
    uploadimg,
    uploadtime;

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

    uploadImg.on(
      'state_changed',
      // 변화시 동작하는 함수
      null,
      // 에러시 동작하는 함수
      (error) => {
        console.log('실패사유는', error);
      },
      // 성공시 동작하는 함수
      () => {
        uploadImg.snapshot.ref
          .getDownloadURL()
          .then((url) => (uploadimg = url));
      }
    );
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

  const product = products.find((product) => {
    return product.id === history.location.pathname.substr(15);
  });

  const getProductDetail = async () => {
    // const product = products.find(
    //   (product) => product.id === history.location.pathname.substr(6)
    // );

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
    // const product = products.find(
    //   (product) => product.id === history.location.pathname.substr(6)
    // );

    console.log(product.id);
    // setEditProduct({
    //   id: editProduct.id,
    //   uid: editProduct.uid,
    //   // img: editProduct.img,
    //   // time: editProduct.time,
    //   title: editProduct.title,
    //   price: editProduct.price,
    //   desc: editProduct.desc,
    // });
    // var newProductKey = database.ref().child('product').push().key;

    // var updates = {};
    // updates['/product/' + newProductKey] = editProduct;
    // updates['/product/' + product.uid + '/' + newProductKey] = editProduct;

    // console.log(updates);
    // await database.ref(`product/${newProductKey}`).update(updates);
    // firestore.collection('product').doc().update(editProduct);

    console.log(editProduct);

    // firestore
    //   .collection('product')
    //   .doc(product.id)
    //   .update(editData)
    //   .then((result) => {
    //     console.log(result);
    //   });
  };

  const deleteProduct = async () => {
    firestore.collection('product').doc(product.id).delete();
  };

  const createChat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let time = [year, month, day, hours, minutes];
    const chatData = {
      name: [user.name, product.user],
      who: [user.uid, product.uid],
      product: product.title,
      time: time,
      img: product.img,
    };

    firestore
      .collection('chatroom')
      .add(chatData)
      .then((result) => {
        console.log(result);
      });
  };

  const getChatList = async () => {
    const db = await firestore
      .collection('chatroom')
      .where('who', 'array-contains', user.uid)
      .get();

    db.forEach((doc) => {
      const chatListObject = {
        ...doc.data(),
        id: doc.id,
      };
      setChatList((prev) => [chatListObject, ...prev]);
    });
    console.log(chatList);
  };

  const chat = chatList.find((chat) => {
    return chat.id === history.location.pathname.substr(10);
  });

  let messageContent, messageTime;
  const onMessageChange = async (event) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let message = event.target.value;
    if (message === '') {
      return;
    } else {
      messageContent = message;
    }
    messageTime = [year, month, day, hours, minutes];
  };

  const createChatMessages = async (event) => {
    event.preventDefault();
    event.target.firstChild.value = '';
    event.target.firstChild.focus();

    const messageDataObject = {
      content: messageContent,
      time: messageTime,
      uid: user.uid,
      name: user.name,
    };

    firestore
      .collection('chatroom')
      .doc(chat.id)
      .collection('messages')
      .add(messageDataObject)
      .then((result) => {
        console.log(result);
      });
  };

  const getChatMessages = async () => {
    const chatId = history.location.pathname.substr(10);
    firestore
      .collection('chatroom')
      .doc(chatId)
      .collection('messages')
      .orderBy('time', 'desc')
      .onSnapshot((db) => {
        setChatMessages([]);
        db.forEach((doc) => {
          let chatMessagesObject = {
            ...doc.data(),
            id: doc.id,
          };

          // const messageId = chatMessages.find((message) => {
          //   return chatMessagesObject.id === message.id;
          // });
          // console.log(messageId);
          // if (!messageId) {
          setChatMessages((prev) => [chatMessagesObject, ...prev]);
          // }
        });
      });
  };

  useEffect(() => {
    getData();
    getChatList();
  }, [user]);

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
            chatList={chatList}
            products={products}
            getProductDetail={getProductDetail}
            createChat={createChat}
            deleteProduct={deleteProduct}
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
        <Route path="/chatList" component={ChatList}>
          <ChatList
            chatList={chatList}
            getChatList={getChatList}
            getChatMessages={getChatMessages}
          ></ChatList>
        </Route>

        <Route path="/chatroom/:id" component={ChatRoom}>
          <ChatRoom
            user={user}
            chatList={chatList}
            chatMessages={chatMessages}
            createChatMessages={createChatMessages}
            onMessageChange={onMessageChange}
            getChatMessages={getChatMessages}
          ></ChatRoom>
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
      </Switch>
      <FooterMenu></FooterMenu>
    </div>
  );
};

function Modal() {
  return <div className="modal">성공</div>;
}

export default App;
