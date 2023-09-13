import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';


import App from "./background/App";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />

  </StrictMode>
);
