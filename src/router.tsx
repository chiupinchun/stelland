import { createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "@/app/home/page";
import TunnelPage from "./app/psycho-test/tunnel/page";
import Result from "./app/psycho-test/result/page";

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'psycho-test',
        children: [
          {
            path: 'tunnel',
            element: <TunnelPage />
          },
          {
            path: 'result',
            element: <Result />
          }
        ]
      }
    ]
  }
])