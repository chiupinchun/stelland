import { createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "@/app/home/page";
import TunnelPage from "./app/orb-match/tunnel/page";

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: HomePage
      },
      {
        path: 'orb-match',
        children: [
          {
            path: 'tunnel',
            Component: TunnelPage
          },
        ]
      }
    ]
  }
])