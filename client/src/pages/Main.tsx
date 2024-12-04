import React, { useState } from "react";
import "../App.css";
import logo from "../assets/images/Become-Logo.png";
import btn1 from "../assets/images/btn_1.svg";
import heartImageL1 from "../assets/images/Mask-group-2.png";
import heartImageL2 from "../assets/images/Mask-group.png";
import heartImageL3 from "../assets/images/Mask-group-1.png";
import circleImage from "../assets/images/circleee.png";
import paperCut from "../assets/images/paper-cut.png";
import copyIcon from "../assets/images/copy.svg";
import shuffleIcon from "../assets/images/shuffle.svg";
import chatIcon from "../assets/images/arcticons_openai-chatgpt.svg";
import sendBtn from "../assets/images/btn.svg";
import spiralBook from "../assets/images/spiral-notebook.png";
import becomeLogo from "../assets/images/Become-Logo_1.png";

import toast, { Toaster } from "react-hot-toast";
import { firstFold, secondFold, thirdFold } from "../utils/questions";

import images from "../utils/images";

const callGenerateAPI = async (userInput: string) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userInput }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData.error);
      return {
        isSuccess: false,
      };
    }

    const data = await response.json();
    console.log("API Response:", data.response);
    return {
      isSuccess: true,
      apiResponse: data.response,
    };
  } catch (error) {
    console.error("Error calling API:", error);
    return {
      isSuccess: false,
    };
  }
};

function QuestionChat({ question }) {
  return (
    <div className="c_converation-1">
      <div>{question}</div>
    </div>
  );
}

function AnswerChat({ answer }) {
  return (
    <div className="c_converation-2">
      <div>{answer}</div>
      <div className="spacer-1-5rem"></div>
    </div>
  );
}

function ChatbotSection({ questions }: any) {
  const [questionInfo, setQuestionInfo] = useState<string[]>([]);
  const [answerInfo, setAnswerInfo] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async ({
    userInput,
    setQuestionInfo,
    setAnswerInfo,
  }: any) => {
    setLoading(true);
    const data = localStorage.getItem("userDetails");
    if (data) {
      const { Name } = JSON.parse(data);
      const returnedValue: any = callGenerateAPI(userInput);
      console.log(returnedValue);
      toast.promise(
        returnedValue,
        {
          loading: "Getting Your response",
          success: <b>Your response is ready</b>,
          error: <b>Please try again later</b>,
        },
        {
          style: {
            fontSize: "20px",
            width: "300px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      const response = await returnedValue;
      if (response.isSuccess) {
        setQuestionInfo((prev: any) => [...prev, userInput]);
        setAnswerInfo((prev: any) => [...prev, response.apiResponse]);
      } else {
        toast.error("model is not able to generate response please try later");
      }
    } else {
      const allQuestions = Object.values(thirdFold);
      const questionFound = allQuestions.some((q) => userInput.includes(q));
      if (questionFound) {
        setQuestionInfo((prev: any) => [...prev, userInput]);
        setAnswerInfo((prev: any) => [
          ...prev,
          "Thank you for using our Positioning Alchemy please fill the details below for better answers\n Organization Name ? and your Email? separated with ','",
        ]);
      } else {
        const splitInput = userInput.split(",");
        if (splitInput.length >= 2) {
          const name = splitInput[0].trim();
          const email = splitInput[1].trim();
          console.log({ name });
          console.log({ email });
          localStorage.setItem(
            "userDetails",
            JSON.stringify({
              Name: name,
              email: email,
            })
          );
          setQuestionInfo((prev: any) => [...prev, userInput]);
          setAnswerInfo((prev: any) => [
            ...prev,
            "Thankyou give your name and organization. You can now ask a question",
          ]);
        } else {
          toast.error(
            "Invalid input format. Please provide both name and email."
          );
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="c_chatbot-wrap">
        <img
          src={circleImage}
          loading="lazy"
          width="406"
          alt=""
          className="c_btm-gradient"
        />
        <div className="w-layout-hflex c_chat-box">
          <input
            className="c_chat-field"
            type="text"
            placeholder="Ask your questions here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="c_chat-sent_btn"
            onClick={() =>
              handleSubmit({
                userInput,
                setQuestionInfo,
                setAnswerInfo,
              })
            }
            disabled={loading}
          >
            <img src={sendBtn} loading="lazy" alt="Send Button" />
          </button>
        </div>
        {questionInfo?.map((key, index) => (
          <div key={index}>
            {questionInfo[index] && (
              <div className="c_box-1">
                <QuestionChat question={questionInfo[index]} />
              </div>
            )}
            {answerInfo[index] && (
              <div className="c_box-2">
                <img src={chatIcon} loading="lazy" width="30" alt="Chat Icon" />
                <AnswerChat answer={answerInfo[index]} />
              </div>
            )}
          </div>
        ))}
        <div className="spacer-7rem"></div>
        <img
          src={paperCut}
          loading="lazy"
          width="954"
          alt="Paper Cut"
          className="c_btm-paperwrap"
        />
      </div>
      <div className="c_num-text-wrap">
        <p className="paragraph is-small">Scroll Down to buy The Book</p>
      </div>
      <div className="spacer-1-5rem"></div>
      <div className="spacer-1-5rem"></div>
    </>
  );
}

const HeroSection = ({
  sequenceNumber,
  setSequenceNumber,
  setQuestions,
  questions,
}: any) => {
  const handleLock = () => {
    console.log(`t${imageData.image3 + 1}`);
  };

  const [imageData, setImageData] = useState<any>({
    image1: 0,
    image2: 0,
    image3: 0,
  });

  const handleShuffle = async (setQuestions, setSequenceNumber) => {
    const randomIndex: number = Math.floor(Math.random() * 12);
    const randomIndex2: number = Math.floor(Math.random() * 12);
    const randomIndex3: number = Math.floor(Math.random() * 12);
    const data: string = firstFold[randomIndex];
    const data2: string = secondFold[randomIndex2];
    const data3: string = thirdFold[randomIndex3];

    const finalData = { data, data2, data3 };

    setImageData({
      image1: randomIndex,
      image2: randomIndex2,
      image3: randomIndex3,
    });

    setSequenceNumber(
      (randomIndex + 1) * (randomIndex2 + 1) * (randomIndex3 + 1)
    );

    setQuestions(finalData);
  };

  const handleCopy = (questions) => {
    const question =
      questions["data"] + " " + questions["data2"] + " " + questions["data3"];
    navigator.clipboard.writeText(question);
    toast.success("Copied to clipboard!", {
      id: "clipboard",
      style: {
        padding: "16px",
        fontSize: "18px",
      },
    });
  };

  return (
    <>
      <section className="c_second-fold">
        <div className="w-layout-blockcontainer c_master-container is--mob w-container">
          <div className="div-block">
            <div className="div-block-2">
              <div className="c_num-text-wrap is--left">
                <p className="paragraph is--small">{sequenceNumber}</p>
                <p className="paragraph is--small">/</p>
                <p className="paragraph is--small">1728</p>
              </div>
              <div className="c_generate-wrap">
                <div className="c_image-wrapper">
                  <div className="c_image-layer-1">
                    {imageData && (
                      <img
                        src={images.f[imageData.image1]}
                        alt="Layer 1"
                        className="c_heart-image-l1"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="c_image-layer-2">
                    {imageData && (
                      <img
                        src={images.s[imageData.image2]}
                        alt="Layer 2"
                        className="c_heart-image-l2"
                        width="290"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="c_image-layer-3">
                    {imageData && (
                      <img
                        src={images.t[imageData.image3]}
                        alt="Layer 3"
                        className="c_heart-image-l3"
                        width="289"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className="c_custom-text_wrap">
                  <div className="c_custom-text_l1">
                    <div className="text-block">{questions.data}</div>
                    <div className="c_combination-locker">
                      <button
                        className="button-randomize"
                        onClick={() => handleLock()}
                      >
                        <img
                          src={btn1}
                          alt="Randomize"
                          className="c_randomize"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="c_custom-text_l1">
                    <div className="text-block">{questions.data2}</div>
                    <div className="c_combination-locker">
                      <button
                        className="button-randomize"
                        onClick={() => handleLock()}
                      >
                        <img
                          src={btn1}
                          alt="Randomize"
                          className="c_randomize"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="c_custom-text_l1">
                    <div className="text-block">{questions.data3}</div>
                    <div className="c_combination-locker">
                      <button
                        className="button-randomize"
                        onClick={() => handleLock()}
                      >
                        <img
                          src={btn1}
                          alt="Randomize"
                          className="c_randomize"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <img
                  src={circleImage}
                  alt="Gradient"
                  className="c_btm-gradient"
                  width="406"
                  loading="lazy"
                />
              </div>
              <div>
                <Toaster position="bottom-center" reverseOrder={true} />
                <div className="c_btn-wrap">
                  <button
                    className="button-randomize c_copy-btn w-inline-block"
                    onClick={() => handleCopy(questions)}
                  >
                    <img src={copyIcon} alt="Copy" loading="lazy" />
                  </button>
                  <button
                    onClick={() =>
                      handleShuffle(setQuestions, setSequenceNumber)
                    }
                    className="button-randomize c_generate-btn_cta w-inline-block"
                  >
                    <div>Shuffle</div>
                    <img src={shuffleIcon} alt="Shuffle" loading="lazy" />
                  </button>
                </div>
                <div className="c_num-text-wrap">
                  <p className="paragraph">Scroll Down to get answers</p>
                </div>
                <div className="spacer-1-5rem"></div>
                <img src={paperCut} loading="lazy" width="954" alt="" />
              </div>
              <div>
                <div className="c_chatgpt-text">
                  <p className="paragraph is--bright">ChatGPT APK</p>
                  <p className="paragraph is-small">
                    You can generate your answers here. Our APK will give
                    answers to your startup chaos.
                  </p>
                  <ChatbotSection questions={questions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function Main() {
  const [sequenceNumber, setSequenceNumber] = React.useState<number>(0);
  const data: string = firstFold[0];
  const data2: string = secondFold[0];
  const data3: string = thirdFold[0];
  const [questions, setQuestions] = React.useState({
    data: data,
    data2: data2,
    data3: data3,
  });

  return (
    <div>
      <div className="c_header">
        <div className="w-layout-blockcontainer c_master-container w-container">
          <img
            src={logo}
            alt="Logo"
            className="image"
            width="188"
            loading="lazy"
          />
        </div>
      </div>
      <section className="c_first-fold">
        <div className="w-layout-blockcontainer c_master-container w-container">
          <div className="w-layout-hflex c_horizontal-flex is--breadcrumb">
            <a href="#" className="c_btn w-inline-block">
              <div>Become</div>
            </a>
            <div>/</div>
            <a href="#" className="c_btn w-inline-block">
              <div>Positioning alchemist</div>
            </a>
          </div>
          <h1 className="heading">Positioning Alchemy</h1>
          <p className="paragraph">
            The Positioning Alchemist website offers startups 1,728 unique
            question combinations for tailored strategic insights.
          </p>
        </div>
      </section>
      <HeroSection
        sequenceNumber={sequenceNumber}
        setSequenceNumber={setSequenceNumber}
        setQuestions={setQuestions}
        questions={questions}
      />
      <section className="c_third-fold">
        <div className="w-layout-blockcontainer c_master-container w-container">
          <div className="c_sub-header">Buy Our Book</div>
          <h1 className="heading is--black">Positioning Alchemy</h1>
          <p className="paragraph">The Ultimate Flip for Brand Mastery</p>
          <div className="spacer-1-5rem"></div>
          <img
            src={spiralBook}
            loading="lazy"
            width="390"
            alt=""
            className="image-2"
          />
          <div className="spacer-1-5rem"></div>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur. Proin et maecenas lectus
            ornare gravida lorem et.
          </p>
          <div className="spacer-1-5rem"></div>
          <div className="w-layout-hflex">
            <a href="#" className="c_cta w-inline-block">
              <div>Order Now</div>
            </a>
          </div>
          <div className="spacer-1-5rem"></div>
          <div className="spacer-1-5rem"></div>
        </div>
      </section>
      <footer className="c_footer">
        <div className="w-layout-blockcontainer c_master-container w-container">
          <div className="w-layout-hflex c_horizontal-flex is--wide">
            <div>Copyright © 2024 Become | All Rights Reserved</div>
            <img src={becomeLogo} loading="lazy" width="94" alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Main;
