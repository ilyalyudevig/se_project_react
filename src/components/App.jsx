import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';

function App() {
  const page = document.querySelector('.page');

  const addGarmentModalName = 'garment-form';
  const itemModalName = 'item';

  const [activeModal, setActiveModal] = useState('');
  const [item, setItem] = useState({ title: '', link: '' });

  page.addEventListener('keydown', handleEscapeClose);
  page.addEventListener('click', handleOverlayClick);

  function handleHeaderAddButtonClick() {
    setActiveModal(addGarmentModalName);
  }

  function handleEscapeClose(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function handleOverlayClick(e) {
    if (Array.from(e.target.classList).includes(`modal_type_${activeModal}`)) {
      onClose();
    }
  }

  function onClose() {
    setActiveModal('');
    page.removeEventListener('keydown', handleEscapeClose);
    page.removeEventListener('click', handleOverlayClick);
  }

  function handleCardClick(e) {
    const title = e.currentTarget.querySelector('.card__title').textContent;
    const link = e.currentTarget.querySelector('.card__image').src;

    setActiveModal(itemModalName);
    setItem({
      title,
      link,
    });
  }

  return (
    <>
      <Header handleHeaderAddButtonClick={handleHeaderAddButtonClick} />
      <Main weatherCard={'day-sunny'} handleCardClick={handleCardClick} />
      <Footer />
      <ModalWithForm
        title="New garment"
        name={addGarmentModalName}
        buttonText="Add garment"
        onClose={onClose}
        activeModal={activeModal}
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
      <ItemModal
        name={itemModalName}
        activeModal={activeModal}
        onClose={onClose}
        title={item.title}
        link={item.link}
        weather={'cold'}
      />
    </>
  );
}

export default App;
