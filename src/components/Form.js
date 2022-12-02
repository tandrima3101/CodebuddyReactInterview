import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();

  // second form
  const initialValuesSecond = { firstName: '', lastName: '', address: '' };
  const [formValuesSecond, setformValuesSecond] = useState(initialValuesSecond);
  const [formErrorsSecond, setformErrorsSecond] = useState({});
  const [isSubmitSecond, setIsSubmitSecond] = useState(false);
  // first form
  const initialValuesFirst = { emailId: '', password: '' };
  const [formValuesFirst, setformValuesFirst] = useState(initialValuesFirst);
  const [formErrorsFirst, setformErrorsFirst] = useState({});
  const [isSubmitFirst, setIsSubmitFirst] = useState(false);
  // third form
  const initialValuesThird = { countryCode: '', phoneNumber: '' };
  const [isChecked, setIsChecked] = useState(false);
  const [formValuesThird, setformValuesThird] = useState(initialValuesThird);
  const [formErrorsThird, setformErrorsThird] = useState({});
  const [isSubmitThird, setIsSubmitThird] = useState(false);
  // showing forms
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);

  // checkbox func
  const handleChangeCheckbox = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  // form validation first
  const validateFirst = () => {
    const errors = {};
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    const pattern2 = new RegExp(
      /^(?=(?:\D*\d){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:\w*\W){2})(?=[^A-Z]*[A-Z]{2})/i,
    );

    if (!formValuesFirst.emailId) {
      errors.emailId = 'Please enter an email Id';
    }

    if (!formValuesFirst.password) {
      errors.password = 'Please enter a password';
    }

    if (formValuesFirst.emailId && !pattern.test(formValuesFirst.emailId)) {
      errors.emailId = 'Please enter a valid email Id';
    }

    if (formValuesFirst.password && !pattern2.test(formValuesFirst.password)) {
      errors.password =
        'Please enter a valid password(atleast 2 Uppercase 2 lowercase 2 Number 2 Special Char)';
    }

    return errors;
  };

  // submitting first form
  const handleSubmitFirstForm = () => {
    setformErrorsFirst(validateFirst(formValuesFirst));
    setIsSubmitFirst(true);
  };

  // validating errors second
  const validateSecond = () => {
    const pattern = /^[a-zA-Z]+$/;

    setIsSubmitSecond(true);
    const errors = {};
    if (!formValuesSecond.firstName) {
      errors.firstName = 'Please enter your first name';
    }

    if (formValuesSecond.firstName && !pattern.test(formValuesSecond.firstName)) {
      errors.firstName = 'Please enter a valid last name(only alphabets)';
    }

    if (formValuesSecond.firstName && formValuesSecond.firstName.length < 2) {
      errors.firstName = 'Atleast 2 letters required';
    }

    if (formValuesSecond.firstName && formValuesSecond.firstName.length > 50) {
      errors.firstName = 'Maximum 50 letters';
    }

    if (formValuesSecond.lastName && !pattern.test(formValuesSecond.lastName)) {
      errors.lastName = 'Please enter a valid last name(only alphabets)';
    }

    if (!formValuesSecond.address) {
      errors.address = 'Please enter your address';
    }

    if (formValuesSecond.address && formValuesSecond.address.length < 10) {
      errors.firstName = 'Atleast 10 letters required';
    }

    return errors;
  };

  // submitting second form
  const handleSubmitSecondForm = () => {
    setformErrorsSecond(validateSecond(formValuesSecond));
    setIsSubmitSecond(true);
  };

  const validateThird = () => {
    const pattern = new RegExp(
      /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/,
    );

    const errors = {};
    if (!formValuesThird.countryCode) {
      errors.countryCode = 'Please enter the country code';
    }

    if (!formValuesThird.phoneNumber) {
      errors.phoneNumber = 'Please enter your phone number';
    }

    if (formValuesThird.phoneNumber && !pattern.test(formValuesThird.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!isChecked) {
      errors.checked = 'You have to accept all terms & Conditions';
    }

    return errors;
  };

  // submitting third form
  const handleSubmitThirdForm = () => {
    setformErrorsThird(validateThird(formValuesThird));
    setIsSubmitThird(true);
  };

  useEffect(() => {
    if (Object.keys(formErrorsSecond).length === 0 && isSubmitSecond) {
      setShowSecondForm(false);
      setShowThirdForm(true);
    }
  }, [formErrorsSecond]);
  useEffect(() => {
    if (Object.keys(formErrorsFirst).length === 0 && isSubmitFirst) {
      setShowFirstForm(false);
      setShowSecondForm(true);
    }
  }, [formErrorsFirst]);
  const userData = {
    method: 'POST',
    body: JSON.stringify({ ...formValuesFirst, ...formValuesSecond, ...formValuesThird }),
  };
  // submit form

  const submitForm = () => {
    fetch('https://codebuddy.review/submit', userData).then(response => {
      console.log(response);
      if (response.statusText === 'OK') {
        navigate('/posts');
      }
    });
  };

  useEffect(() => {
    if (Object.keys(formErrorsThird).length === 0 && isSubmitThird) {
      submitForm();
    }
  }, [formErrorsThird]);

  // goto previous
  const showFirst = () => {
    setShowFirstForm(true);
    setShowSecondForm(false);
  };

  const showSecond = () => {
    setShowSecondForm(true);
    setShowThirdForm(false);
  };

  const showFirstFromThid = () => {
    setShowThirdForm(false);
    setShowFirstForm(true);
  };

  return (
    <>
      {showFirstForm && (
        <div className="row body-container">
          <div className="col-lg-6 mx-auto">
            <div className="form_container">
              <h2 className="text-center mb-4 purple-text">First Form</h2>
              <div className="w-100 mb-4">
                <label className="mb-2" htmlFor="emailId">
                  email Id
                </label>
                <input
                  className="form-control"
                  id="emailId"
                  value={formValuesFirst.emailId}
                  onChange={e =>
                    setformValuesFirst({ ...formValuesFirst, emailId: e.target.value })
                  }
                  required
                />
                {formErrorsFirst && (
                  <small className="text-danger mt-1">{formErrorsFirst.emailId}</small>
                )}
              </div>
              <div className="w-100 mb-4">
                <label className="mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control"
                  id="password"
                  value={formValuesFirst.password}
                  onChange={e =>
                    setformValuesFirst({ ...formValuesFirst, password: e.target.value })
                  }
                  required
                />
                {formErrorsFirst && (
                  <small className="text-danger mt-1">{formErrorsFirst.password}</small>
                )}
              </div>
              <div className="w-100">
                <button
                  type="submit"
                  className="mt-4 highlighted_btn right-btn"
                  onClick={() => handleSubmitFirstForm()}
                >
                  SAVE & NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSecondForm && (
        <div className="row body-container">
          <div className="col-lg-6 mx-auto">
            <div className="form_container">
              <h2 className="text-center mb-4 purple-text">Second Form</h2>
              <div className="w-100">
                <label className="mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="form-control mb-4"
                  required
                  id="firstName"
                  value={formValuesSecond.firstName}
                  onChange={e =>
                    setformValuesSecond({ ...formValuesSecond, firstName: e.target.value })
                  }
                />
                {formErrorsSecond && (
                  <small className="text-danger">{formErrorsSecond.firstName}</small>
                )}
              </div>
              <div className="w-100 mb-2">
                <label className="mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="form-control mb-4"
                  id="lastName"
                  value={formValuesSecond.lastName}
                  onChange={e =>
                    setformValuesSecond({ ...formValuesSecond, lastName: e.target.value })
                  }
                />
                {formErrorsSecond && (
                  <small className="text-danger mt-1">{formErrorsSecond.lastName}</small>
                )}
              </div>
              <div className="w-100">
                <label className="mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="form-control"
                  required
                  id="address"
                  value={formValuesSecond.address}
                  onChange={e =>
                    setformValuesSecond({ ...formValuesSecond, address: e.target.value })
                  }
                />
                {formErrorsSecond && (
                  <small className="text-danger mt-1">{formErrorsSecond.address}</small>
                )}
              </div>
              <div className="w-100 d-flex justify-content-between">
                <button
                  type="submit"
                  className="mt-4 nonhighlighted_btn"
                  onClick={() => showFirst()}
                >
                  PREVIOUS
                </button>
                <button
                  type="submit"
                  className="mt-4 highlighted_btn"
                  onClick={() => handleSubmitSecondForm()}
                >
                  SAVE & NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showThirdForm && (
        <div className="row body-container">
          <div className="col-lg-6 mx-auto">
            <div className="form_container">
              <h2 className="text-center mb-4 purple-text">Third Form</h2>
              <div className="w-100 mb-3">
                <label className="mb-2" htmlFor="countryCode ">
                  Country Code
                </label>
                <select
                  value={formValuesThird.countryCode}
                  className="form-control"
                  id="countryCode"
                  onChange={e => {
                    setformValuesThird({ ...formValuesThird, countryCode: e.target.value });
                  }}
                >
                  <option value=""> </option>
                  <option value="+91">India(+91)</option>
                  <option value="+1">America(+1)</option>
                </select>
                {formErrorsThird && (
                  <small className="text-danger mt-1">{formErrorsThird.countryCode}</small>
                )}
              </div>

              <div className="w-100 mb-3">
                <label className="mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="form-control"
                  id="phoneNumber"
                  value={formValuesThird.phoneNumber}
                  onChange={e => {
                    setformValuesThird({ ...formValuesThird, phoneNumber: e.target.value });
                  }}
                />
                {formErrorsThird && (
                  <small className="text-danger mt-1">{formErrorsThird.phoneNumber}</small>
                )}
              </div>

              <div className="w-100">
                <div className="w-100 d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleChangeCheckbox()}
                  />
                  <p className="mb-0">I accept all the terms & conditions</p>
                </div>
                {formErrorsThird && (
                  <small className="text-danger mt-1 d-block">{formErrorsThird.checked}</small>
                )}
              </div>

              <div className="d-flex justify-content-between w-100">
                <button
                  type="submit"
                  className="mt-4 nonhighlighted_btn"
                  onClick={() => showFirstFromThid()}
                >
                  Show First
                </button>
                <button
                  type="submit"
                  className="mt-4 nonhighlighted_btn"
                  onClick={() => showSecond()}
                >
                  PREVIOUS
                </button>
                <button
                  type="submit"
                  className="mt-4 highlighted_btn"
                  onClick={() => handleSubmitThirdForm()}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
