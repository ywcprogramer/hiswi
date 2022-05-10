import React, {useState, useEffect} from 'react';
import {getCookie, rsa_decrypt} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';
import ProDescriptions from '@ant-design/pro-descriptions';

//个人信息展示
const MyInfo: React.FC = (props) => {
  const [values, setValues] = useState(null);
  const [stop, setStop] = useState(true); //用于 useEffect 死循环
  const propType = 'manager';
//获取个人信息
  function getMyInfo(){
    const hitoken = getCookie('hitoken');
    let pushData = new URLSearchParams();
    pushData.set('Type', 'getUserInfo');
    pushData.set('hitoken', hitoken);
    HiRequest(pushData, '/cgi-bin/user.lua').then(data =>{
      setValues(JSON.parse(rsa_decrypt(data.retval)));
      setStop(false);
    })
  }

  useEffect(async()=>{
    if(stop){
      getMyInfo();
    }
  },[values])

  return (
    <>
      <ProDescriptions column={2}
      style={{minHeight:376}}
      >
        <ProDescriptions.Item label="账号"  valueType="text">
          {values&&values.phone}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="联系人" valueType="text">
          {values&&values.userName}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          tooltip="申请成为服务商，享受更多功能"
          label="权限"
          valueEnum={{
            user: {
              text: '项目管理者',
            },
            server: {
              text: '服务商',
            },
            root: {
              text: '超级管理员',
            },
          }}
        >
          {values&&values.prop}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="服务商" valueType="text"
                              tooltip="上级管理者"
        >
          {values&&values.systemServer}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="注册时间" valueType="text">
          {values&&values.registerTime}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="信息完善度" valueType="text"
                              tooltip="完善信息才能正常使用"
                              valueEnum={{
                                unComplete: {
                                  text: '未完善',
                                  status: 'Error',
                                },
                                complete: {
                                  text: '已完善',
                                  status: 'Success',
                                },
                              }}
        >
          {values&&values.isComplete===0?'unComplete':'complete'}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="账号状态" valueType="text"
                              tooltip="封禁状态不能使用"
                              valueEnum={{
                                disabled: {
                                  text: '封禁',
                                  status: 'Error',
                                },
                                enabled: {
                                  text: '正常',
                                  status: 'Success',
                                },
                              }}
        >
          {values&&values.isDisabled===0?'enabled':'disabled'}
        </ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
};

export default MyInfo;
