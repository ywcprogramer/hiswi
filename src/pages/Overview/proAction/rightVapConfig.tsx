import React from 'react';
import { message,Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ProFormSlider,
  ProFormDigit
} from '@ant-design/pro-form';

import {selectBintval,selectEncryption} from '../../hiswiApi/vapinfo';
import {getCookie, rsa_decrypt, rsa_encrypt} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';
//更新SSID
function updateSsid(data) {

  //转换SSID开关
  if(data.disabled === true){
    data.disabled = 0
  }else{
    data.disabled = 1
  }

  //转换vlan 开关
  if(data.vlan === true){
    data.vlan = 'on'
  }else{
    data.vlan = 'off'
  }

  //转换隐藏ssid hidden
  if(data.hidden === true ){
    data.hidden = 1
  }else{
    data.hidden = 0
  }

  //转换访客模式 guest
  if(data.guest === true ){
    data.guest = 1
  }else{
    data.guest = 0
  }

  //转换组播优化 mcastenhance
  if(data.mcastenhance === true ){
    data.mcastenhance = 1
  }else{
    data.mcastenhance = 0
  }

  //转换漫游 roam
  if(data.roam === true ){
    data.roam = 1
  }else{
    data.roam = 0
  }  
  

  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(data)));
  pushData.set('Type', 'updateSsid');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/getWifiConfig.lua').then(data =>{
    // console.log(data);
  });   
}

//SSID配置内容
const RightVapConfig: React.FC = (props) => {

    const [form] = Form.useForm();
    const {vapInfo, device, proNumber} = props;
    let deviceName = '';
    
    //转换接口名字
    switch(device){
      case 'wifi21':
        deviceName = 'WiFi1'
        break;
      case 'wifi22':
        deviceName = 'WiFi2'
         break;
      case 'wifi23':
          deviceName = 'WiFi3'
           break;   
      case 'wifi24':
         deviceName = 'WiFi4'
         break;
      case 'wifi51':
          deviceName = 'WiFi5'
          break;
      case 'wifi52':
          deviceName = 'WiFi6'
           break;
      case 'wifi53':
            deviceName = 'WiFi7'
             break;   
      case 'wifi54':
           deviceName = 'WiFi8'
           break;                                     
      default:
        break;
    }

  //动态赋值给表单
  form.setFieldsValue({
    proNumber:proNumber,
    vapType:deviceName,
    disabled: vapInfo.disabled===0?true:false,
    ssid:vapInfo.ssid,
    encryption:vapInfo.encryption,
    key:vapInfo.key,
    vlan:vapInfo.vlan==='off'?false:true,
    vlanid:vapInfo.vlanid,
    bintval:vapInfo.bintval,
    rts:vapInfo.rts==='off'?0:vapInfo.rts,
    maxsta:vapInfo.maxsta,
    hidden:vapInfo.hidden===0?false:true,
    mcastenhance:vapInfo.mcastenhance===0?false:true,
    guest:vapInfo.guest===0?false:true,
  }); 

    return(
      <ProForm
      onFinish={async (values) => {
        updateSsid(values);
        message.success('提交成功');
      }}
      form={form}
      initialValues={{
        proNumber:proNumber,
        vapType:device,
        disabled: vapInfo.disabled===0?true:false,
        ssid:vapInfo.ssid,
        encryption:vapInfo.encryption,
        key:vapInfo.key,
        vlan:vapInfo.vlan==='off'?false:true,
        vlanid:vapInfo.vlanid,
        bintval:vapInfo.bintval,
        rts:vapInfo.rts==='off'?0:vapInfo.rts,
        maxsta:vapInfo.maxsta,
        hidden:vapInfo.hidden===0?false:true,
        mcastenhance:vapInfo.mcastenhance===0?false:true,
        guest:vapInfo.guest===0?false:true,
      }}        
    >

<ProForm.Group>
    <ProFormText
        width="sm"
        name="proNumber"
        label="工程编号"
        readonly        
    />  

    <ProFormText
        width="sm"
        name="vapType"
        label="设备接口"
        readonly         
    />       
</ProForm.Group>

<ProFormSwitch
        width="md"
        name="disabled"
        label="SSID开关"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />

<ProForm.Group>
      <ProFormText
        width="sm"
        name="ssid"
        label="SSID"
      />      

     <ProFormSelect
        options={selectBintval}
        width="sm"
        name="bintval"
        label="Beacon间隔"
      />  
</ProForm.Group>


<ProForm.Group>
      <ProFormSelect
        options={selectEncryption}
        width="sm"
        name="encryption"
        label="加密方式"
      />

      <ProFormText.Password
        width="sm"
        name="key"
        label="无线密码"
      />
</ProForm.Group>

<ProForm.Group>
      <ProFormSwitch
        width="md"
        name="vlan"
        label="VLAN开关"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />

       <ProFormText
        width="md"
        name="vlanid"
        label="VLAN ID"
      />       

</ProForm.Group>


<ProForm.Group>
      <ProFormSwitch
        width="md"
        name="hidden"
        label="隐藏SSID"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />

      <ProFormSwitch
        width="md"
        name="guest"
        label="访客模式"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />

      <ProFormSwitch
        width="md"
        name="mcastenhance"
        label="组播优化"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />

 </ProForm.Group>   

<ProForm.Group> 
      <ProFormText
        width="sm"
        name="rts"
        label="RTS/CTS"
      />                    

      <ProFormText
        width="sm"
        name="maxsta"
        label="最大接入终端"
      />   
</ProForm.Group>               
    </ProForm>
    );
}

export default RightVapConfig;