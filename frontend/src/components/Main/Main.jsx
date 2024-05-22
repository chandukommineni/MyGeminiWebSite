import React, { useContext } from "react";
import "./Main.css"
import { assets} from "../../assets/assets"
import { setInput, onSent,setRecentPrompt } from "../../store/ContextSlice";
import { useDispatch,useSelector } from "react-redux";
const Main = () => {
    const dispatch = useDispatch();
    const { input, recentPrompt, showResult, loading, resultData } = useSelector((state) => state.data);
    const randomTexts=["Suggest beautiful places to see on an upcoming road trip",
    "Roadmap for Fulll stack Developer","Briefly summarize this concept : urban planning",
    "Write a code to peform addition of two numbers"
    ]
  return (
    <div className="main">
        <div className="nav">
            <p>MyGemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {
                !showResult ?
                <>
                <div className="greet">
                <p><span>Hello, Buddy !</span></p>
                <p>How can I help you today ?</p>
            </div>
            <div className="cards">
                <div className="card " onClick={()=>{dispatch(setRecentPrompt(randomTexts[0]))
                dispatch(onSent(randomTexts[0]))}}>
                    <p>{randomTexts[0]}</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card" onClick={()=>{dispatch(setRecentPrompt(randomTexts[1]))
                    dispatch(onSent(randomTexts[1]))}}>
                    <p>{randomTexts[1]}</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card" onClick={()=>{dispatch(setRecentPrompt(randomTexts[2]))
                    dispatch(onSent(randomTexts[2]))}}>
                    <p>{randomTexts[2]}</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card" onClick={()=>{dispatch(setRecentPrompt(randomTexts3))
                    dispatch(onSent(randomTexts[3]))}}>
                    <p>{randomTexts[3]}</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            :
            <div className="result">

                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {
                        loading?
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />

                        </div>
                        :
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                   
                </div>


            </div>
            
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>dispatch(setInput(e.target.value))} value={input} type="text" placeholder="Enter a prompt here" />
                     <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                       {input? <img src={assets.send_icon} alt="" onClick={()=>dispatch(onSent())} />:null} 
                    </div>
                </div>
                <p className="bottom-info">
                    Mygemini may display inaccurate info,including about people,so double check its responses 
                </p>
            </div>
            
        </div> 
    </div>
  )
};

export default Main;
