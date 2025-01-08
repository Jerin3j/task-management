import React, { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './components/Authentication/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from "../src/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from './Reducer/userSlice';
import { RootState } from './Reducer/store';

function App() {

  const [isLogin, setIsLogin ] = useState<any>()
  console.log(isLogin);
  const dispatch = useDispatch()


  useEffect(()=>{
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = {
          uuid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          profilePic: user.photoURL || '',
        };
        setIsLogin(user);
        dispatch(addUser(userDetails));
      } else {
        setIsLogin(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch])
  
  const currentUser = useSelector((state: RootState) => state.authUser.userDetails);
     console.log('currentUser', currentUser);
     
     return(
     <div className="App font-mulish">
     {isLogin ? 
      <Home/> :
      <Login/>
    }
    </div>
  );
}

export default App;

