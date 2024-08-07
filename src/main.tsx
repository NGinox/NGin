import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./components/App.tsx";
import ClickerProvider from "./utils/LocalContextProvider.tsx";
import Store from "./components/Store.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Clicker from "./components/clicker/Clicker.tsx";

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
                element: <Store/>,
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
