import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './context/user.context';
import { TaskProvider } from './context/task.context';
import { GoogleMapProvider } from './context/google-map.context';
import Geocode from 'react-geocode';
const client = new ApolloClient({
  uri: 'http://localhost:5000/hang-out-213d4/us-central1/graphql',
  cache: new InMemoryCache({
      addTypename: false
  })
});

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_GEOCODE_KEY!);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <TaskProvider>        
          <GoogleMapProvider>        
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GoogleMapProvider>
        </TaskProvider>
      </UserProvider>
    </ApolloProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

