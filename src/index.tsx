import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const Root = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<Root />);
