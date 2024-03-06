"use client";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [text, setText] = useState("");
  const quoteRef = useRef(null); // Create a ref for the quote container

  const takeScreenshot = () => {
    if (quoteRef.current) {
      html2canvas(quoteRef.current, {
        scale: 10, // Adjust scale as needed
        backgroundColor: "#000000", // Use null for transparent background
        logging: true, // Enable for debug information in the console
        useCORS: true, // This can help with images from different origins
      }).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "quote-wallpaper.png";
        link.href = base64image;
        link.click();
      });
    }
  };

  return (
    <main className="h-screen w-full grid grid-cols-2 bg-zinc-950">
      <section className="w-full flex flex-col justify-center p-8 h-full">
        <div className="flex flex-col gap-2">
          <p className="text-white">Text</p>
          <input
            type="text"
            className="text-white text-opacity-75 px-2 w-80 py-2 bg-transparent border border-zinc-500 outline-none focus:border-white rounded-md"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={takeScreenshot} className="mt-4">
            Capture
          </button>{" "}
          {/* Button to capture the image */}
        </div>
      </section>

      <section className="w-full h-full tracking-tight col-span-1 border-l border-zinc-500 flex items-center justify-center">
        <div className="flex relative rounded-[3rem] z-10 border-zinc-500 flex-col items-center border w-[348px] h-[720px]">
          <p className="text-xl pt-16 text-white">Wednesday, 6 March</p>
          <p className="text-7xl pt-1 text-white">12:40</p>
          <div className="absolute bottom-6 bg-white rounded-full w-32 h-1 "></div>
        </div>

        <div
          ref={quoteRef}
          className="flex absolute items-center justify-center w-[348px] h-[720px]"
        >
          <p className="text-white text-center max-w-xs">
            {text || "Enter text in the input field"}
          </p>
        </div>
      </section>
    </main>
  );
}
