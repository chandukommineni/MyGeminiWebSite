import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

import { setRecentPrompt, onSent, newChat } from "../../store/ContextSlice";
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const dispatch = useDispatch();
  const { prevPrompts } = useSelector((state) => state.data);
  const loadPrompt = async (prompt) => {
    dispatch(setRecentPrompt(prompt));
    await dispatch(onSent(prompt));
  };
  

  
  return (
    <div className="sidebar">
      <div className="top" >
        <img src={assets.menu_icon} alt="" className="menu" onClick={()=>setExtended(!extended)} />
        <div className="new-chat" onClick={()=>dispatch(newChat())}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {
              prevPrompts.map((item,index)=>{
                return (
                  <div className="recent-entry" onClick={()=>loadPrompt(item)}> 
                  <img src={assets.message_icon} alt="" />
                  <p>
                    {item.slice(0,18)}...
                  </p>
                </div>

                )
              })
            }
           
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
