import { createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "@/app/home/page";
import Puzzle from "@/app/puzzle/page";
import OrbMatchBattle from "@/app/orb-match/battle/page";
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
        path: 'puzzle',
        Component: Puzzle
      },
      {
        path: 'orb-match',
        children: [
          {
            path: 'tunnel',
            Component: TunnelPage
          },
          {
            path: 'battle',
            Component: OrbMatchBattle
          }
        ]
      }
    ]
  }
])