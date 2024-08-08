import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import ClickerProvider from "./utils/LocalContextProvider.tsx";
import ComingSoon from "./components/ComingSoon.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Clicker from "./components/clicker/Clicker.tsx";
import Store from "./components/store/Store.tsx";

const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Clicker/>,
            },
            {
                path: "store",
                element: <Store/>,
            },
            {
                path: "coming-soon",
                element: <ComingSoon/>,
            },
        ],
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ClickerProvider>
              <RouterProvider router={router} />
          </ClickerProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
