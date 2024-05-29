//import "./styles.css";
import DiagnosisForm from "./DiagnosisForm";
import FlipCard from "./FlipCard";
import Organs from "./Organs";
import SymptomsInput from "./search";
import Parameters from "./Parameters";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "./footer";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [post, setPost] = useState({
    "Blood Sugar": "",
    Haemoglobin: "",
    Temperature: "",
    "Blood Pressure": "",
  });

  const [diagnosis, setDiagnosis] = useState({
    x1: null,
    x2: null,
    x3: null,
  });

  const [answer, setAnswer] = useState({
    "": "",
    "": "",
    "": "",
    "": "",
  });
  const [wishToSeeDoctor, setWishToSeeDoctor] = useState("no");
  const [hospitalInfo, setHospitalInfo] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
    console.log(post);

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/emergency/detect",
        post
      );
      console.log("Post request successful", response.data);
      setPost({
        "Blood Sugar": "",
        Haemoglobin: "",
        Temperature: "",
        "Blood Pressure": "",
      });
      alert("Diagnosis Successful");
      setAnswer(response.data);
    } catch (error) {
      console.error("Error posting data", error);
      // Handle error
      // Clear form data even if there's an error

      setPost({
        "Blood Sugar": "",
        Haemoglobin: "",
        Temperature: "",
        "Blood Pressure": "",
      });
      setAnswer("NOT CRITICAL");
      alert("Diagnosis Unsuccessful");
    }
  }

  async function handleDiagnosis(event) {
    event.preventDefault();
    console.log("Diagnosis submitted");
    console.log(diagnosis);

    try {
      console.log(diagnosis)
      const response = await axios.post(
        "http://127.0.0.1:4000/api/mu/processLocation",
        diagnosis
      );
      console.log("Post request successful", response.data);
      // Clear form data after successful submission
      setDiagnosis({
        x1: null,
        x2: null,
        x3: null,
      });
      // if (hospitalResponse.status === 200) {
      //   setHospitalInfo(hospitalResponse.data);
      //   alert("Search Successful");
      // } else {
      //   setHospitalInfo(null);
      //   alert("Search Unsuccessful");
      // }
      // const hospitalResponse =
      setHospitalInfo(response.data);
    } catch (error) {
      setHospitalInfo(null);
      console.error("Error posting data", error);

      setDiagnosis({
        x1: null,
        x2: null,
        x3: null,
      });
      // alert("Search Unsuccessful");
    }
  }

  console.log(answer);

  const handleInputChange = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const handleDiagnosisChange = (event) => {
    setDiagnosis({
      ...diagnosis,
      [event.target.name]: parseFloat(event.target.value),
    });
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="App">
      {/* <div className="header">
				<h1>NAVBAR</h1>
			</div> */}
      <div className="top-container">
        <SymptomsInput className="text-box" />
      </div>
      <div className="result">
        <div className="diagnosis">
          <form onSubmit={handleSubmit}>
            {Parameters.map((p) => {
              return (
                <div className="diagnosis-card">
                  <h4 className="diagnosis-heading">{p.text} :</h4>
                  <input
                    onChange={handleInputChange}
                    key={p.id}
                    type="number"
                    className="diagnosis-input"
                    name={p.text}
                    value={post[p.text]}
                    min={p.min}
                    max={p.max}
                  ></input>
                </div>
              );
            })}
            <button type="submit" className="formButton">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="wish">
          <h1>Diagnosis Results</h1>
          <ul>
            {Object.entries(answer).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
          <div>
            <label for="diagnosis">Do you wish to see a doctor: </label>
            <select
              id="diagnosis"
              name="diagnosis"
              value={wishToSeeDoctor}
              onChange={(e) => setWishToSeeDoctor(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {/* Conditionally render the form based on wishToSeeDoctor state */}
            {wishToSeeDoctor === "yes" && (
              <form onSubmit={handleDiagnosis}>
                <input
                  type="number"
                  placeholder="Enter your X coordinate"
                  onChange={handleDiagnosisChange}
                  name="x1"
                  value={diagnosis["x1"]}
                />
                <input
                  type="number"
                  placeholder="Enter your Y coordinate"
                  onChange={handleDiagnosisChange}
                  name="x2"
                  value={diagnosis["x2"]}
                />
                <input
                  type="number"
                  placeholder="Enter your Z coordinate"
                  onChange={handleDiagnosisChange}
                  name="x3"
                  value={diagnosis["x3"]}
                />
                <button type="submit" className="formButton">
                  SUBMIT
                </button>
              </form>
            )}
            {hospitalInfo ? (
              <div className="answer">
                <p>
                  {
                    ((hospitalInfo.selLoc[0], hospitalInfo.selLoc[1]),
                    hospitalInfo.selLoc[2])
                  }
                </p>
                <p>{hospitalInfo.selPhone}</p>
                <p>{hospitalInfo.selAddress}</p>
              </div>
            ) : (
              <div className="answer">
                <p>No hospital found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="cards-container">
        <Carousel
          swipeable={true}
          draggable={true}
          arrows={true}
          showDots={true}
          keyBoardControl={true}
          responsive={responsive}
        >
          {Organs.map((organ, index) => {
            return (
              <FlipCard
                key={index}
                id={organ.id}
                name={organ.name}
                symptoms={organ.symptoms}
                img={organ.img}
              />
            );
          })}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}
