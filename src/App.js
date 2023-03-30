import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./features/auth/Welcome";
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
          <Route element={<RequireAuth/>}>
            <Route path={"/welcome"} element={<Welcome/>}/>
          </Route>
        </Routes>
      </Layout>
    );
  }
}