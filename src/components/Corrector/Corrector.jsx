import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.scss";

export default function Corrector() {
  const [dataCorrector, setDataCorrector] = useState("");
  const [activeRecording, setActiveRecording] = useState(false);
  const module = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formattin
    ],
  };
  return (
    <section className="corrector-ortografico">
      <h1 className="corrector-ortografico__title">CORRECTOR ORTOGRAFICO</h1>

      <section className="corrector-ortografico__box">
        <ReactQuill
          theme="snow"
          value={dataCorrector}
          modules={module}
          className="corrector-ortografico__quill"
          onChange={() => setDataCorrector(dataCorrector)}
        />

        <div 
            className={'button ' + activeRecording}
            onClick={()=>{
                  setActiveRecording(!activeRecording)
            }}
        >
          <div className="inner"></div>
        </div>

      </section>
    </section>
  );
}
