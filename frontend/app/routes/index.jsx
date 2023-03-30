import { Provider } from "react-redux";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { store } from "../store/store";



export default function Index() {
  return (
    <Provider store={store}>
      <Home />
      <Contact />
    </Provider>
  );
}
