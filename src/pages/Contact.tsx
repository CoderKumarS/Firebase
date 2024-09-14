import React from "react";

function Contact() {
  return (
    <>
      <h1 className="m-3 pb-2 text-center border-bottom border-primary">
        Contact Us
      </h1>
      <form className="m-3 p-2 border border-primary rounded bg-info bg-opacity-10">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input type="tel" className="form-control" id="phoneNumber" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea className="form-control" id="message" rows={4}></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Contact;
