import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <>
      <Header />
      <Main weatherCard={'day-sunny'} />
      <Footer />
    </>
  );
}

export default App;
