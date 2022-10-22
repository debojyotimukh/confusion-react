import "./App.css";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigureStore } from "./redux/ConfigureStore";
function App() {
  const store = ConfigureStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
