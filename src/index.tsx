import { store } from '@app/store/store';
import 'config/config';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface EventTarget {
  state?: 'activated';
}

const queryClient = new QueryClient();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if ((event.target as EventTarget).state === 'activated') window.location.reload();
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
}); // app will reload if new version of app is available

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
