import React from 'react';
import CustomInput from "./CustomInput.jsx";

const Captcha = ({captchaUrl}) => {
    return (
        <div>
            <img src={captchaUrl} alt=""/>
            <CustomInput label={'Captcha'} name={'captcha'} type={'text'} placeholder={'Enter captcha from image'}/>
        </div>
    );
};

export default Captcha;