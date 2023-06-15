import "@/styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default function App({ Component, pageProps }) {
  return (
      <>
            <Component {...pageProps} />
            <ToastContainer />
      </>
    );
}
