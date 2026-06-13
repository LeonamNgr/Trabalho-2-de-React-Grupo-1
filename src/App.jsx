import Navbar from "./components/Navbar/index.jsx";
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter.jsx";

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}
export default App;
