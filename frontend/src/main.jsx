import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import LivrosIndex from "./pages/livros/LivrosIndex.jsx";
import LivrosCreate from "./pages/livros/LivrosCreate.jsx";
import LivrosShow from "./pages/livros/LivrosShow.jsx";
import LivrosEdit from "./pages/livros/LivrosEdit.jsx";

import ResenhasEdit from "./pages/resenhas/ResenhasEdit.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/livros",
    element: <LivrosIndex />,
  },

  {
    path: "/livros/create",
    element: <LivrosCreate />,
  },

  {
    path: "/livros/:id",
    element: <LivrosShow />,
  },

  {
    path: "/livros/:id/edit",
    element: <LivrosEdit />,
  },

  {
    path: "/livros/:livro_id/resenhas/:id/edit",
    element: <ResenhasEdit />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);