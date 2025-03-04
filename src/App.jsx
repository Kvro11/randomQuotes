import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QuotesContainer from "./QuotesContainer";

const App = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
  ];

  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState(colors[0]);
  const hasFetched = useRef(false);

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const fetchQuotes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://dummyjson.com/quotes/random");
      setQuote(response?.data.quote);
      setAuthor(response?.data.author);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewQuotes = async () => {
    changeColor();
    await fetchQuotes();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    toast.success("Quote copied to clipboard!", { position: "top-center" });
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchQuotes();
      changeColor();
      hasFetched.current = true;
    }
  }, []);

  console.error("Error fetching quote:", error);

  return (
    <div
      className={`w-screen h-screen ${bgColor} flex justify-center items-center`}
    >
      <ToastContainer />
      <QuotesContainer
        handleNewQuotes={handleNewQuotes}
        isLoading={isLoading}
        quote={quote}
        author={author}
        bgColor={bgColor}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
};
export default App;
