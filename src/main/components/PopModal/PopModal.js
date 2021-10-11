import './PopModal.css';
import React, { useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const PopModal = () => {
  const setCookie = (name, value, expiredays) => {
    var today = new Date();
  
    console.log(today.getDate())
  
    today.setDate(today.getDate() + expiredays); // 현재시간에 하루를 더함 
  
    document.cookie = name + '=' + escape(value) + '; expires=' + today.toGMTString();
  
  }
  const getCookie = (name) => {
    var cookie = document.cookie;
    if (document.cookie != "") {
      var cookie_array = cookie.split("; ");
      console.log(cookie_array)
      for ( var index in cookie_array) {
        var cookie_name = cookie_array[index].split("=");
        if (cookie_name[0] == "mycookie") {
          return cookie_name[1];
        }
      }
    }
    return;
  }
  const handleOnClick = () => {
    setCookie("mycookie",'popupEnd',1);
    setVisible(false);
  }
  const [visible, setVisible] = useState(true);
  const checkCookie = getCookie("mycookie");
  return (
    <div className={`pop-modal-wrapper ${checkCookie !== 'popupEnd'?  'show': 'hide'}`}>
      <Rodal id='popup' className='pop-modal' visible={visible} onClose={() => setVisible(false)}>
        <div className='pop-context'>와플고등학교 명단 관리 프로그램입니다.</div>
        <div className='pop-modal-footer'>
        <button className='pop-button' onClick={handleOnClick}>오늘 하루 보지 않기</button>
          <button className='pop-button' onClick={() => setVisible(false)}>닫기</button>
        </div>
      </Rodal>
    </div>
  );
}

export default PopModal