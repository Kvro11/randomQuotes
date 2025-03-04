import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import loading from "../assets/loading.gif";
import { FaRegCopy } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";

const QuotesContainer = (props) => {
  const {
    quote,
    author,
    isLoading,
    bgColor,
    handleNewQuotes,
    copyToClipboard,
  } = props;

  const speakQuote = () => {
    if (!quote || !quote.trim()) return;
    const utterance = new SpeechSynthesisUtterance(quote);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const buttons = [
    {
      icon: <FaRegCopy />,
      name: "Copy",
      func: copyToClipboard,
    },
    {
      icon: <HiSpeakerWave />,
      name: "Speech",
      func: speakQuote,
    },
  ];

  return (
    <div
      className={`w-[80%] sm:w-[35%] h-fit p-5 sm:p-8 bg-lightBg rounded-lg
        shadow-lg flex flex-col items-center gap-5`}
    >
      <h1 className="text-[1.3rem] sm:text-[1.5rem]">Quotes of the Day</h1>
      {isLoading ? (
        <img src={loading} alt="loading" className="w-14  sm:w-20" />
      ) : (
        <div className="w-full flex flex-col gap-3">
          <div className="text-[1.2rem] sm:text-[1.5rem] flex flex-col gap-2 items-center">
            <RiDoubleQuotesL className="self-start" />
            <span className="px-3 sm:px-10 text-justify"> {quote}</span>
            <RiDoubleQuotesR className="self-end" />
          </div>
          <span
            className="italic self-end mr-5 sm:mr-20 text-[1.1rem] sm:text-[1.3rem] 
            text-lightTxt"
          >
            - {author}
          </span>
        </div>
      )}
      <div className="w-full flex justify-between pt-5 px-0 sm:px-5">
        <div className="flex gap-2 sm:gap-5">
          {buttons.map((button) => (
            <button
              key={button.name}
              aria-label={button.name}
              className={`text-[1.2rem] sm:text-[1.5rem] p-3 rounded-full border-2 
                border-lightTxt transition ease-in-out duration-200 hover:scale-90`}
              onClick={button.func}
            >
              {button.icon}
            </button>
          ))}
        </div>
        <button
          className={`py-2 px-4 ${bgColor} bg-opacity-50 rounded-lg transition ease-in-out 
            duration-200 hover:scale-90 font-semibold `}
          onClick={handleNewQuotes}
        >
          New Quotes
        </button>
      </div>
    </div>
  );
};
export default QuotesContainer;
