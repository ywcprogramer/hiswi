import React, {useState, useEffect} from 'react';
import {message, Cascader, Form} from 'antd';
import ProForm, { ProFormText} from '@ant-design/pro-form';
import {getCookie, rsa_encrypt, checkPhoneValid, rsa_decrypt} from "@/pages/hiswiApi/hiswi_api";
import {city} from "@/pages/hiswiApi/city";
import { HiRequest } from '@/services/hiswi/api';

//添加到已配置池
function applyServer(data){
  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(data)));
  pushData.set('Type', 'applyServer');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/user.lua').then(data =>{
    switch(data.err_code){
      case 0:
        message.warning('申请失败');
        break;
      case 1:
        message.success('申请成功，请等待审核');
        break;
      case 2:
        message.success('用户不存在');
        break;
      case 3:
        message.success('审核通过');
        break;
      case 4:
        message.success('已申请，请查看进度');
        break;
      default:
        message.error('操作异常');
        break;
    }
  });
}

//校验姓名
function checkName(rule, value, callback){
  if(typeof(value) === 'undefined'){
    callback('姓名不能为空');
    return false;
  }

  if(value.length > 5){
    callback('姓名长度不超过5位');
    return false;
  }
  callback();
  return true;
}

//校验单位名称
function checkCompany(rule, value, callback){
  if(typeof(value) === 'undefined'){
    callback('单位名称不能为空');
    return false;
  }
  if(value.length > 32){
    callback('单位名称长度不超过32位');
    return false;
  }
  callback();
  return true;
}

//校验手机
function checkPhone(rule, value, callback){
  const flag =  checkPhoneValid(value);
  if(!flag){
    callback('手机号码不合法');
    return false;
  }
  callback();
  return true;
}

//主入口
const ApplyServer: React.FC = (props) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState(null);
  const [stop, setStop] = useState(true); //用于 useEffect 死循环

  function getPhoneAndLocation(){
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
      getPhoneAndLocation();
    }
  },[values])

  // 动态赋值给表单，没渲染完成的情况下，需要等待时间赋值
setTimeout(()=>{
  form.setFieldsValue({
    companyLocation:values&&JSON.parse(values.companyLocation),
    contact:values&&values.phone
  })
},300);

  return (
    <>
    <ProForm
      form={form}
      initialValues={{
        // companyLocation:values&&values.companyLocation,
        city:values&&values.companyLocation,
        contact:values&&JSON.parse(values.phone)
      }}
      style={{minHeight:367}}
      onFinish={async (values) => {
        applyServer(values);
        return true;
      }}
    >
      <ProFormText width="lg" name="name" label="姓名" rules={[{ required: true,validator:checkName}]} allowClear/>
      <ProFormText width="lg" name="company" label="单位名称" rules={[{ required: true,validator:checkCompany}]} allowClear/>
      <ProFormText width="lg" name="contact" label="联系方式" rules={[{ required: true,validator:checkPhone}]}  readonly={true}/>
      <ProForm.Item name="companyLocation"  label="归属地"  rules={[{ required: true}]}  >
        {/*直接找到相关的 css 样式的选择器，给 className 赋值即可得到相同的样式*/}
        <Cascader options={city} className={'pro-field-lg'}  allowClear  />
      </ProForm.Item>

    </ProForm>
      </>
  );
};

export default ApplyServer;
