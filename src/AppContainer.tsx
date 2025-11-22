import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const AppContainer = () => {
    return (
        // <ProtectedRoute>
        <Provider store={store}>
            <App/>
        </Provider>
        // </ProtectedRoute>
    );
};

export default AppContainer;