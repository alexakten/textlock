"use client";
import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

export default function App() {
  // Initialize state with localStorage values or defaults
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState("16px");
  const textColors = [
    "#9F8A6C",
    "#9F9E91",
    "#506066",
    "#131313",
    "#404447",
    "#4D7C5A",
    "#E1E2D7",
    "#F7F7F7",
  ];
  const [textColor, setTextColor] = useState("");
  const backgroundColors = [
    "#9F8A6C",
    "#9F9E91",
    "#506066",
    "#131313",
    "#404447",
    "#4D7C5A",
    "#E1E2D7",
    "#F7F7F7",
  ];
  const [backgroundColor, setBackgroundColor] = useState("");
  const quoteRef = useRef(null);

  // Initialize state from localStorage and default values
  useEffect(() => {
    const storedText =
      typeof window !== "undefined" ? localStorage.getItem("text") : "";
    setText(storedText || "");

    const storedBgColor =
      typeof window !== "undefined"
        ? localStorage.getItem("backgroundColor")
        : backgroundColors[0];
    setBackgroundColor(storedBgColor || backgroundColors[0]);

    const storedTextColor =
      typeof window !== "undefined"
        ? localStorage.getItem("textColor")
        : textColors[0];
    setTextColor(storedTextColor || textColors[0]);
  }, []); // Empty dependency array ensures this effect only runs once on mount

  // Save text and colors to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("text", text);
      localStorage.setItem("backgroundColor", backgroundColor);
      localStorage.setItem("textColor", textColor);
    }
  }, [text, backgroundColor, textColor]);

  const takeScreenshot = () => {
    if (quoteRef.current) {
      html2canvas(quoteRef.current, {
        scale: 15,
        backgroundColor: backgroundColor,
        logging: true,
        useCORS: true,
      }).then((canvas) => {
        canvas.toBlob(function (blob) {
          if (blob) {
            const url = URL.createObjectURL(blob);
            // Open the blob URL in a new tab
            window.open(url, "_blank");
            // No need for a hidden anchor tag or download attribute
            // Note: Cleanup is tricky here since the blob needs to be accessible in the new tab
          }
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- 
  /*                            Date and Time Section                           
  /* -------------------------------------------------------------------------- */

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();

      // Format the date as "weekday, day month"
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      // Format the time as "HH:MM", you can change 'en-US' to your locale and options as needed
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
      });

      setCurrentDate(dateStr);
      setCurrentTime(timeStr);
    }, 10);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  /* --------------------------------------------------------------------------- */

  return (
    <main className="h-auto sm:h-screen w-full grid grid-cols-1 sm:grid-cols-2 bg-zinc-950">
      {/* /* -------------------------------------------------------------------------- 
  /*                                  Settings                          
  /* -------------------------------------------------------------------------- */}
      <section className="w-full flex flex-col justify-center items-start p-8 h-full">
        <div className="flex flex-col gap-8">
          {/* Text input */}
          <div className="flex flex-col gap-2´">
            <p className="text-white">Text</p>
            <input
              type="text"
              className="text-white text-opacity-75 px-2 w-80 py-2 bg-transparent border border-zinc-500 outline-none focus:border-white rounded-md"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {/* Text size */}
          <div className="flex flex-col gap-2">
            <p className="text-white">Font size</p>
            <div className="flex items-center gap-2">
              <button
                className="rounded-md bg-zinc-100 hover:bg-zinc-300 text-black px-4 py-2"
                onClick={() => setTextSize(`${parseInt(textSize, 10) - 1}px`)} // Decrease font size
              >
                -
              </button>
              <button
                className="rounded-md bg-zinc-100 hover:bg-zinc-300 text-black px-4 py-2"
                onClick={() => setTextSize(`${parseInt(textSize, 10) + 1}px`)} // Increase font size
              >
                +
              </button>

              <p className="text-white">{textSize}</p>
            </div>
          </div>
          {/* Text color */}
          <div className="flex flex-col gap-2">
            <p className="text-white">Text color</p>

            <div>
              {textColors.map((color, index) => (
                <button
                  key={index}
                  className="rounded-full border w-6 h-6 m-1"
                  style={{
                    backgroundColor: color,
                    borderColor: textColor === color ? "white" : color, // Set border color based on selection
                  }}
                  onClick={() => setTextColor(color)}
                />
              ))}
            </div>
          </div>
          {/* Background color */}
          <div className="flex flex-col gap-2">
            <p className="text-white">Background color</p>

            <div>
              {backgroundColors.map((color, index) => (
                <button
                  key={index}
                  className={`rounded-full border w-6 h-6 m-1 ${
                    backgroundColor === color ? " border-white" : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    borderColor: backgroundColor === color ? "white" : color, // Set border color based on selection
                  }}
                  onClick={() => setBackgroundColor(color)}
                />
              ))}
            </div>
          </div>
          {/* Take screenshot */}
          <button
            onClick={takeScreenshot}
            className="px-12 py-3 bg-zinc-100 hover:bg-zinc-300 rounded-md text-black"
          >
            Capture
          </button>{" "}
        </div>
      </section>

      {/* /* -------------------------------------------------------------------------- 
  /*                                 Lockscreen                          
  /* -------------------------------------------------------------------------- */}
      <section className="w-full h-full tracking-tight col-span-1 sm:border-l border-zinc-500 flex items-center justify-center">
        <div
          className="flex relative rounded-[3rem] border-zinc-500 flex-col items-center border w-[348px] h-[720px]"
          style={{ backgroundColor: backgroundColor }}
        >
          <p className="text-xl pt-16 text-white">{currentDate}</p>
          <p className="text-7xl pt-1 text-white">{currentTime}</p>
          <div className="absolute bottom-6 bg-white rounded-full w-32 h-1 "></div>
        </div>

        <div
          ref={quoteRef}
          className="flex absolute items-center justify-center w-[348px] h-[720px]"
          style={{ color: textColor, fontSize: textSize }}
        >
          <p className="font-semibold text-center max-w-xs">
            {text || "Enter text in the input field"}
          </p>
        </div>
      </section>
    </main>
  );
}
