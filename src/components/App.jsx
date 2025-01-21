import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';

function App() {
  return (
    <>
      <Header />
      <Main weatherCard={'day-sunny'} />
      <Footer />
      <ModalWithForm
        title="New garment"
        name="garment-form"
        buttonText="Add garment"
      >
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required=""
          aria-label="Name"
        />
        <label className="form__label" htmlFor="url">
          Image
        </label>
        <input
          className="form__input"
          type="url"
          name="url"
          placeholder="Image URL"
          minLength="2"
          maxLength="40"
          required=""
          aria-label="Name"
        />
        <fieldset className="form__fieldset form__fieldset_radio">
          <legend className="form__legend">Select the weather type:</legend>
          <div className="form__input-container">
            <input
              className="form__input form__input_radio"
              type="radio"
              name="hot"
              id="hot"
              value="hot"
            />
            <label className="form__label form__label_radio" htmlFor="hot">
              Hot
            </label>
          </div>
          <div className="form__input-container">
            <input
              className="form__input form__input_radio"
              type="radio"
              name="warm"
              id="warm"
              value="warm"
            />
            <label className="form__label form__label_radio" htmlFor="warm">
              Warm
            </label>
          </div>
          <div className="form__input-container">
            <input
              className="form__input form__input_radio"
              type="radio"
              name="cold"
              id="cold"
              value="cold"
            />
            <label className="form__label form__label_radio" htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </>
  );
}

export default App;
