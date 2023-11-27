import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyles />
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} position='bottom'/>
  </QueryClientProvider>
);
