import "@/styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
      <>
            <Component {...pageProps} />
            <ToastContainer />
      </>
    );
}
