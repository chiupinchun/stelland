import { createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "@/app/home/page";

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: HomePage
      }
    ]
  }
])