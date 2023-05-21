import React from 'react';
import CustomInput from "./CustomInput.jsx";

const Captcha = ({captchaUrl}) => {
    return (
        <div className={'my-4'}>
            <img src={captchaUrl} alt="" className={'rounded-lg scale-95'}/>
            <CustomInput label={''} name={'captcha'} type={'text'} placeholder={'Enter captcha from image'} className={'mb-4 ease-in-out duration-300 focus:border-teal-700 outline-0 p-4 border-0 bg-transparent border-b-2 border-white border-solid'}/>
        </div>
    );
};

export default Captcha;