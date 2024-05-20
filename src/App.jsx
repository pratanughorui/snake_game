import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const App = () => {
  const initialData = new Map([
    ['one', 'Reassure'],
    ['two', "Apply tourniquets"],
    ['three', "Apply Pressure Immobilisation Method"],
    ['four', "Immobilize like a fractured limb"],
    ['five', "Do suction at wound site"],
    ['six', "Apply turmeric/antiseptic ointment to local wound"],
    ['seven', "Make an incision at the bite site"],
    ['eight', "Traditional healers can be consulted because they are locally accessible"],
    ['nine', "Go directly to a large hospital"],
    ['ten', "Go to nearest hospital"],
    ['eleven', "Tell the doctor of any emergent sign"],
    ['twelve', "Try to capture the snake or take a picture of the snake"]
  ]);

  const correctSequence = ['one', 'four', 'ten', 'eleven'];
  const [data, setData] = useState(initialData);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [result3, setResult3] = useState('');
  const [result4, setResult4] = useState('');
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNextRoundModal, setShowNextRoundModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    let keysArray = Array.from(data.keys());
    keysArray = shuffle(keysArray);
    setCards(keysArray);
  }, []);

  useEffect(() => {
    if (result4 !== '') {
      checkSequence([result1, result2, result3, result4]);
    }
  }, [result4]);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const checkSequence = (selectedSequence) => {
    if (JSON.stringify(selectedSequence) === JSON.stringify(correctSequence)) {
      setModalContent('Congratulations! You got the correct sequence!');
    } else {
      setModalContent('Sorry, the sequence is incorrect. Please try again.');
    }
    setShowModal(true);
  };

  const handleCardClick = (key) => {
    if (result1 === key || result2 === key || result3 === key || result4 === key) {
      alert('Same card not allowed');
      return;
    }

    if (!result1) {
      setResult1(key);
    } else if (!result2) {
      setResult2(key);
    } else if (!result3) {
      setResult3(key);
    } else if (!result4) {
      setResult4(key);
    }

    const newData = new Map(data);
    newData.set(key, ''); // Empty the content of the clicked card
    setData(newData);
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page
  };

  const handleNextRoundModalClose = () => {
    setShowNextRoundModal(false);
    // Add logic to proceed to the next round if needed
  };

  const handleWrongModalClose = () => {
    setShowWrongModal(false);
  };

  const handleRadioChange = (event) => {
    if (event.target.id === 'transferRadio') {
      setShowWrongModal(true);
    } else if (event.target.id === 'waitRadio') {
      setShowNextRoundModal(true);
    }
  };

  const handleSelectedCards = (key, content, n) => {
    if (n === 1) {
      data.set(key, content);
      setResult1('');
    } else if (n === 2) {
      if (!result1) {
        setResult2('');
        setResult1(key);
      } else {
        data.set(key, content);
        setResult2('');
      }
    } else if (n === 3) {
      setResult3('');
      if (!result1 || !result2) {
        if (!result1) setResult1(key);
        if (!result2) setResult2(key);
      } else {
        data.set(key, content);
        setResult3('');
      }
    } else {
      setResult4('');
      if (!result1 || !result2 || !result3) {
        if (!result1) setResult1(key);
        if (!result2) setResult2(key);
        if (!result3) setResult3(key);
      } else {
        data.set(key, content);
        setResult4('');
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Select the correct cards and place them in the correct sequence</h2>
          <div className="row">
            {cards.map((item) => (
              <div key={item} className="col-6 col-md-3 mb-4">
                <div className="card border border-dark" style={{ height: "150px", width: "100%" }} onClick={() => handleCardClick(item)}>
                  <div className="card-body d-flex align-items-center justify-content-center" style={{ overflow: "hidden", fontSize: "14px" }}>
                    {data.get(item)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 mt-4">
          <h2 className="text-center">Your selection and sequence</h2>
          <div className="row">
            <div className="col-6 col-md-3 mb-4">
              <div className="card border border-dark" style={{ height: "150px", width: "100%" }} onClick={() => handleSelectedCards(result1, initialData.get(result1), 1)}>
                <div className="card-body d-flex align-items-center justify-content-center" style={{ overflow: "hidden", fontSize: "14px" }}>
                  {initialData.get(result1)}
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <div className="card border border-dark" style={{ height: "150px", width: "100%" }} onClick={() => handleSelectedCards(result2, initialData.get(result2), 2)}>
                <div className="card-body d-flex align-items-center justify-content-center" style={{ overflow: "hidden", fontSize: "14px" }}>
                  {initialData.get(result2)}
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <div className="card border border-dark" style={{ height: "150px", width: "100%" }} onClick={() => handleSelectedCards(result3, initialData.get(result3), 3)}>
                <div className="card-body d-flex align-items-center justify-content-center" style={{ overflow: "hidden", fontSize: "14px" }}>
                  {initialData.get(result3)}
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <div className="card border border-dark" style={{ height: "150px", width: "100%" }} onClick={() => handleSelectedCards(result4, initialData.get(result4), 4)}>
                <div className="card-body d-flex align-items-center justify-content-center" style={{ overflow: "hidden", fontSize: "14px" }}>
                  {initialData.get(result4)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal show={showModal} handleClose={handleModalClose} content={modalContent} handleRadioChange={handleRadioChange} />
      <NextRoundModal show={showNextRoundModal} handleClose={handleNextRoundModalClose} />
      <WrongModal show={showWrongModal} handleClose={handleWrongModalClose} />
    </div>
  );
};

const CustomModal = ({ show, handleClose, content, handleRadioChange }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
        <br /><br />
        {content === 'Congratulations! You got the correct sequence!' && (
          <>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="options"
                id="transferRadio"
                onChange={handleRadioChange}
              />
             
             <label className="form-check-label" htmlFor="transferRadio">
                Transfer the patient as soon as possible even on motorcycles
              </label>
            </div>
            <br />
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="options"
                id="waitRadio"
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="waitRadio">
                Wait for an ambulance to transfer the patient
              </label>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const NextRoundModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Congratulations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Congratulations, you can go to the next round!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const WrongModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>No, you are wrong</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        No, you are wrong. Please try again.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default App;
