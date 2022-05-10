import React from 'react';
import {message, Cascader} from 'antd';
import ProForm, { ProFormText,ProFormDigit} from '@ant-design/pro-form';
import {getCookie, rsa_encrypt, checkMail,} from "@/pages/hiswiApi/hiswi_api";
import {city} from "@/pages/hiswiApi/city";
import { HiRequest } from '@/services/hiswi/api';

//添加到已配置池
function completeInfo(data){
  //转换坐标位字符串
  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(data)));
  pushData.set('Type', 'completeInfo');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/login.lua').then(data =>{
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
        message.success('审核通过');
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

//校验邮箱
function checkcQmail(rule, value, callback){
  const flag =  checkMail(value);
  if(!flag){
    callback('邮箱不合法');
    return false;
  }
  callback();
  return true;
}

//主入口
const CompleteInfoi: React.FC = (props) => {
  return (
    <>
      <ProForm
        onFinish={async (values) => {
          completeInfo(values);
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText width="lg" name="name" label="联系人" rules={[{ required: true,validator:checkName}]} allowClear style={{maxWidth:100}} width={200}/>
          <ProForm.Item name="location"  label="归属地"  rules={[{ required: true}]}  >
            {/*直接找到相关的 css 样式的选择器，给 className 赋值即可得到相同的样式*/}
            <Cascader options={city} className={'pro-field-lg'}  allowClear style={{ width:200}} />
          </ProForm.Item>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormDigit  width="lg" name="qq" label="QQ号" rules={[{ required: true}]} style={{maxWidth:100}} width={200} keyboard={false}/>
          <ProFormText width="lg" name="qqmail" label="QQ邮箱" rules={[{ required: true,validator:checkcQmail}]} allowClear  width={200}/>
        </ProForm.Group>

      </ProForm>
    </>
  );
};

export default CompleteInfoi;
