import React, {useState, useEffect} from 'react';
import {Steps } from 'antd';
import {getCookie , rsa_decrypt} from "@/pages/hiswiApi/hiswi_api";
import styles from './index.less';
import { HiRequest } from '@/services/hiswi/api';
const { Step } = Steps;

//主入口
const ApplyProgress: React.FC = (props) => {
  const [values, setValues] = useState(null);
  const [stop, setStop] = useState(true); //用于 useEffect 死循环

  function getProgress(){
    const hitoken = getCookie('hitoken');
    let pushData = new URLSearchParams();
    pushData.set('Type', 'getInfo');
    pushData.set('hitoken', hitoken);
    HiRequest(pushData, '/cgi-bin/user.lua').then(data =>{
      setValues(JSON.parse(rsa_decrypt(data.retval)));
      setStop(false);
    })
  }

  useEffect(async()=>{
    if(stop){
      getProgress();
    }
  },[values])

  return (
    <>
      <Steps current={values&&values.applyProgress}  style={{minHeight:204}}>
        <Step title="提交申请"  className={styles.progress} />
        <Step title="平台审核" className={styles.progress}/>
        <Step title="审核完成"  className={styles.progress}/>
      </Steps>
    </>
  );
};

export default ApplyProgress;
