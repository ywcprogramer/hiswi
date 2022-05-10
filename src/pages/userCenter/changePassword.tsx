import React, {} from 'react';
import {message } from 'antd';
import ProForm, { ProFormText} from '@ant-design/pro-form';
import {getCookie, rsa_encrypt} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';


//添加到已配置池
function changePassword(data){
  //校验 新密码 和 确认密码
  if(data.newPwd !== data.checkPwd){
    message.warning('新密码与确认密码不一致！');
    return false;
  }

  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(data)));
  pushData.set('Type', 'changPwd');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/user.lua').then(data =>{
    // console.log(data);
    switch(data.err_code){
      case 0:
        message.warning('修改失败');
        break;
      case 1:
        message.success('修改成功');
        break;
      case 2:
        message.success('用户不存在');
        break;
      case 3:
        message.success('操作异常');
        break;
      case 4:
        message.success('原密码错误');
        break;
      default:
        message.error('操作异常');
        break;
    }
  });
}

function checkPwd(rule, value, callback){
  if(value.length < 8 || value.length > 16){
    callback('密码长度不能小于8位 或者 不能大于16位');
    return false;
  }
  callback();
  return true;
}

const ChangePassword: React.FC = (props) => {

  return (
    <ProForm
      style={{minHeight:376}}
      onFinish={async (values) => {
        changePassword(values);
        return true;
      }}
    >
      <ProFormText.Password width="lg" name="oldPwd" label="原密码" rules={[{ required: true,message:'原密码不能为空'}]} allowClear/>
      <ProFormText.Password width="lg" name="newPwd" label="新密码" rules={[{ required: true,validator:checkPwd}]} allowClear/>
      <ProFormText.Password width="lg" name="checkPwd" label="确认新密码" rules={[{ required: true,validator:checkPwd}]} allowClear/>
    </ProForm>
  );
};

export default ChangePassword;
