import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const New = (p) => {
  const history = useHistory();
  const [Id, setId] = useState(0);
  const [Image, setImage] = useState(null);
  const [Done, setDone] = useState(false);
  const [Data, setData] = useState({
    studname: "",
    file: "",
    email: "",
    phone: "",
    language: "",
    qualification: "",
    percentage: "",
    projects: "",
  });
  function updateInput(e) {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
    console.log(Data);
  }

  function sendData(event) {
    event.preventDefault();
    const fd = new FormData();
    console.log(Image);
    fd.append("file", Image, Image.name);
    fd.append("data", JSON.stringify(Data));
    console.log("formData: ", fd);
    axios
      .post("http://localhost:5000/student-form", fd)
      .then((res) => {
        console.log(res.data._id);
        setId(res.data._id);
        setDone(true);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }
  const [File, setFile] = useState({ file: null });
  function fileChange(e) {
    setImage(e.target.files[0]);
    let image = e.target.files[0];
    console.log("Image: ", image);
    if (image) {
      setData({ ...Data, file: image });
      setFile({ file: URL.createObjectURL(image) });
    } else {
      setFile({ file: null });
      setData({ ...Data, file: "" });
    }
  }

  function onRec(data) {
    console.log("rec");
    p.clicked(data);
    history.push("/home");
  }

  return (
    <>
      <div className="container" hidden={Done}>
        <div className="text-center">
          <h1>Student Database</h1>
          <p>Enter your personal details below.</p>
        </div>
        <form>
          <div className="form-group">
            <label>
              Name: <span>*</span>
            </label>
            <input
              type="name"
              className="form-control"
              id="exampleInputName"
              name="studname"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="dp form-group">
            <label>
              Upload your photo: <span>*</span>
            </label>
            <input type="file" name="file" onChange={fileChange}></input>
            <div className="img">
              <h5 className="text-center" hidden={File.file !== null}>
                No
                <br /> Photo
              </h5>
              <img hidden={File.file === null} src={File.file} alt="dp"></img>
            </div>
          </div>
          <div className="form-group">
            <label>
              Email Address: <span>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>
              Phone No. <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="phone"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>
              Preferred Language: <span>*</span>{" "}
            </label>
            <select
              name="language"
              onChange={updateInput}
              required
              className="form-control"
            >
              <option>Choose...</option>
              <option value="JS">JS</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Educational Qualification: <span>*</span>{" "}
            </label>
            <select
              name="qualification"
              onChange={updateInput}
              required
              id="inputState"
              className="form-control"
            >
              <option>Choose...</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.sc.">B.sc.</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Percentage: <span>*</span>{" "}
            </label>
            <input
              type="score"
              className="form-control"
              id="exampleInputScore"
              name="percentage"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>
              Project Done: <span>*</span>
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlScore"
              rows="3"
              name="projects"
              onChange={updateInput}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={sendData}
            disabled={
              Data.studname === "" ||
              Data.file === "" ||
              Data.email === "" ||
              Data.phone === "" ||
              Data.language === "" ||
              Data.qualification === "" ||
              Data.percentage === "" ||
              Data.projects === ""
            }
          >
            Submit
          </button>
          <h6
            className="btnhover"
            hidden={
              Data.studname !== "" &&
              Data.file !== "" &&
              Data.email !== "" &&
              Data.phone !== "" &&
              Data.language !== "" &&
              Data.qualification !== "" &&
              Data.percentage !== "" &&
              Data.projects !== ""
            }
          >
            All Fields Are Required *
          </h6>
        </form>
      </div>
      <div className="msg" hidden={!Done}>
        <div className="success">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">
                <i className="bi bi-check-circle"></i>
              </h5>
              <h5 className="card-title text-center">Saved!</h5>
              <p className="card-text text-center">
                <b>{Data.studname},</b>
              </p>
              <p className="card-text text-center">
                Your data has recorded successfully !
              </p>
              <p
                className="card-text text-center"
                onClick={() => {
                  onRec(Id);
                }}
              >
                <span className=" link-text-2">Click Here</span> to view your
                data . . .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
