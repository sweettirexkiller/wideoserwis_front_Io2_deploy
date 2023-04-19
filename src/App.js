import React, {useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { useDispatch, useSelector } from "react-redux";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";
import PageNotFound from './components/PageNotFound';

const App = () => {

  const dispatch = useDispatch();

  const { isLoggedIn, token } = useSelector((state) => state.auth);

  useEffect(()=>{
    //check if token is valid = date is not expired, if it is expired then remove it
    if(token.token){
      const decode = JSON.parse(atob(token.token.split('.')[1]));
      if (decode.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [token, isLoggedIn]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
    }, [logOut]);

    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    );
}

export default App;