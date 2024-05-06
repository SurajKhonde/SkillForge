
import ReactDOM from "react-dom/client";
import App from '../ClientSide/src/App';
import { HashRouter } from 'react-router-dom';
import ContextProviders from "../ClientSide/src/Context/index"
import MyComponent from "./src/MobileSupport";


const rootElement = document.getElementById("root")
const root = ReactDOM.createRoot(rootElement);
root.render(
  <HashRouter>
     <ContextProviders> 
      <MyComponent/>
     </ContextProviders> 
  </HashRouter>
);