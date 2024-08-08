import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";

const ReactQuillAbout = () => {
  const [value, setValue] = useState("");

  return (
    <section className="my-8">
      <ReactQuill theme="snow" value={value} onChange={setValue} />

      <div className="text-end">
        <button
          className="bg-secondary-color text-white px-6 py-1 font-semibold rounded-md mt-2"
          type="button"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default ReactQuillAbout;
