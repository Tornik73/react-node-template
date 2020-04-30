import React from 'react';
import '../assets/css/App.css';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import {toast} from "react-toastify";
import {AxiosInterceptor} from "./shared/";
import RootContainer from "./core/containers/Root/Root.container";


toast.configure()
AxiosInterceptor.init();
function App() {
  return (
      <Provider store={store}>
          <RootContainer/>
      </Provider>

  );
}

export default App;
