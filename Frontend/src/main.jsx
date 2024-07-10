import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './pages/Landing'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './css/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Result from './pages/Result';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: '/result',
    element:<Result/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="gray" highlightColor="#444">
     <RouterProvider router={router}/>
    </SkeletonTheme>
  </React.StrictMode>,
)
