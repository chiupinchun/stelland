import { createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "@/app/home/page";
import TunnelPage from "./app/psycho-test/tunnel/page";
import Result from "./app/psycho-test/result/page";
import DailyDivination from "./app/divination/daily/page";
import RuneDivination from "./app/divination/rune/page";
import Profiles from "./app/profiles/page";
import Diary from "./app/diary/page";

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
            path: 'result/:key',
            element: <Result />
          }
        ]
      },
      {
        path: 'divination',
        children: [
          {
            path: 'daily',
            element: <DailyDivination />
          },
          {
            path: 'rune',
            element: <RuneDivination />
          }
        ]
      },
      {
        path: 'profiles',
        element: <Profiles />
      },
      {
        path: 'diary',
        element: <Diary />
      }
    ]
  }
])