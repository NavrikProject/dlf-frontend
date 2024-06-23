import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Components/Navbar";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  // const [projectId, setProjectId] = useState("");
  // const [location, setLocation] = useState("");
  // const [processorId, setProcessorId] = useState("");

  const [pdfFile, setPdfFile] = useState(null); //for file display
  const [meg, setmeg] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); //for validation select
  const [isDisable, setisDisable] = useState(true); //for input file display
  const [extbtn, setextbtn] = useState(true); //for extract btn dispaly

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setisDisable(!isDisable);
  };

  useEffect(() => {
    if (selectedValue && pdfFile) {
      setextbtn(!extbtn);
    }
  }, [selectedValue, pdfFile]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const g = e.target.files[0];
    if (g) {
      setPdfFile(URL.createObjectURL(g));
    }
    if (selectedValue == "") {
      setmeg("**Please select the document");
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);

    try {
      // Send the file and other data to the backend
      const response = await axios.post(
        "https://dlf-backend.azurewebsites.net/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set the extracted text from the response
      setText(response.data.extracted_text);
    } catch (error) {
      console.error("Error processing document:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="App">
        <div className="container">
          <h1>Document Extractor</h1>
          <form onSubmit={handleSubmit}>
            <div className="col">
              <select
                id="select-document"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="">Select Document</option>
                <option value="LeasingDoc">Leasing Document</option>
                <option value="invoice">Invoice</option>
                <option value="bank-invoice">Invoice</option>
                <option value="receipt">Receipt</option>
                <option value="loan-details">Loan Details</option>
              </select>
              {selectedValue ? "" : <span className="erroe-meg">{meg}</span>}

              <div>
                <button id="btn-select">
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept=".pdf"
                  />
                </button>
              </div>
              <button type="submit" id="btn-extract">
                Extract Document
              </button>
            </div>
          </form>
        </div>

        <div className="below-area">
          <div className="container-area">
            {" "}
            {pdfFile ? (
              ""
            ) : (
              <img className="document-image" src="" alt="Document Image" />
            )}
            {pdfFile && (
              <div>
                <embed
                  src={pdfFile}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              </div>
            )}
          </div>
          <div>
            <h2>Extracted Text:</h2>
            <p className="ext-area">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
