import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "./FileSelect.css";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 16px auto 10px auto;
`;
const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 16px auto 10px auto;
  h1 {
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  :disabled {
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button2 = styled.button`
  width: 50%;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  margin: 0 auto;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
  &::disabled {
    cursor: not-allowed;
  }
`;
const FileSelect = () => {
  const [extractionResult, setExtractionResult] = useState(false);
  const [formData, setFormData] = useState({
    selectOption: "",
    pdfFile1: null,
    pdfFile2: null,
    pdf1Url: "",
    pdf2Url: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "selectOption") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        pdfFile1: null,
        pdfFile2: null,
        pdf1Url: "",
        pdf2Url: "",
      }));
    } else if (name === "pdfFile1") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pdfFile1: files[0],
        pdf1Url: URL.createObjectURL(files[0]),
      }));
    } else if (name === "pdfFile2") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pdfFile2: files[0],
        pdf2Url: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selectOption, pdfFile1, pdfFile2 } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("selectOption", selectOption);
    formDataToSend.append("pdfFile1", pdfFile1);
    formDataToSend.append("pdfFile2", pdfFile2);
    setExtractionResult(true);
    // Uncomment and update with your backend endpoint to handle the form submission
    // try {
    //   const response = await axios.post(
    //     "/your-backend-endpoint",
    //     formDataToSend,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }
  };

  return (
    <>
      {extractionResult ? (
        <Container3>
          <h1>
            Refresh to Extract more documents or{" "}
            <span onClick={() => window.location.reload()}>Click here!</span>
          </h1>
        </Container3>
      ) : (
        <Container>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="selectOption">Select an option:</Label>
            <Select
              id="selectOption"
              name="selectOption"
              value={formData.selectOption}
              onChange={handleChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="LeasingDoc">Leasing Document</option>
              <option value="compare-gst">Compare Invoice and PO</option>
            </Select>
            {formData.selectOption === "compare-gst" ? (
              <>
                <Label htmlFor="pdfFile1">Upload Invoice PDF:</Label>
                <Input
                  id="pdfFile1"
                  name="pdfFile1"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  disabled={formData.selectOption === ""}
                />
                <Label htmlFor="pdfFile2">Upload PO PDF:</Label>
                <Input
                  id="pdfFile2"
                  name="pdfFile2"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  disabled={formData.selectOption === ""}
                />
              </>
            ) : (
              <>
                <Label htmlFor="pdfFile1">Upload PDF:</Label>
                <Input
                  id="pdfFile1"
                  name="pdfFile1"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  disabled={formData.selectOption === ""}
                />
              </>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Container>
      )}

      <div className="">
        <div className="split-screen">
          <div className="left-half">
            <div className="content">
              <h1>Uploaded Input Files shown here!</h1>
              <hr />
              {formData.pdf1Url && (
                <div className="pdfbox">
                  <h3>
                    {formData.selectOption === "compare-gst"
                      ? "Invoice "
                      : "PDF"}
                  </h3>
                  <embed
                    src={formData.pdf1Url}
                    type="application/pdf"
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              )}
              {formData.selectOption === "compare-gst" && formData.pdf2Url && (
                <div className="pdfbox">
                  <h3>Purchase Order</h3>
                  <embed
                    src={formData.pdf2Url}
                    type="application/pdf"
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="right-half">
            <div className="content">
              <div className="extractionContainer">
                <h1>Extraction Result will be shown in here!</h1>
                <hr />
                {formData.selectOption === "compare-gst" &&
                  formData.pdf2Url && (
                    <Container2>
                      {extractionResult && (
                        <Button2 type="submit">COMPARE PDF'S</Button2>
                      )}
                    </Container2>
                  )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="pdfContainer">
         
        </div>
         */}
      </div>
    </>
  );
};

export default FileSelect;
