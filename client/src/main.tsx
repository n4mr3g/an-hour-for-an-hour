import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { storeApp } from './redux/store.ts'

import App from "./App.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Home from "./routes/Home.tsx";
import Profile from "./components/Profile/Profile.tsx";
import Form from "./components/Form/Form.tsx";
import MyList from "./components/OffersList/OffersList.tsx";
import SignUp from "./components/SignUp/SignUp.tsx";
import SignIn from "./components/SignIn/SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/app/dashboard/",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create",
        element: <Form />,
      },
      {
        path: "myList",
        element: <MyList />,
      },
    ],
  },
  {
    path: "/app/dashboard/profile",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/app/signup",
    element: <SignUp />,
  },
  {
    path: "/app/signin",
    element: <SignIn />,
  },
]);

// let store = legacy_createStore(
//   reducers
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={storeApp}>
    <RouterProvider router={router} />
  </Provider>
);
