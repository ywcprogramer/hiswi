import React from 'react';
import ProForm, {ProFormText, ProFormSwitch, ProFormSelect, ProFormSlider,ProFormDigit} from '@ant-design/pro-form';
import {ency,channel24,channel58,htmode24,htmode58,txpowerMarks24,txpowerMarks58} from '@/pages/hiswiApi/channel';
import Ssid from "@/pages/profile/createPro/ap/ssid";
import {checkSsid,checkWirelessKey} from "@/pages/hiswiApi/hiswi_api";

const initRadioValues2g = {
  radio2g_channel : 0,
  radio2g_htmode : 'HT20',
  radio2g_txpower :21,
  radio2g_disabled:true,
  radio2g_vlan:false,
  radio2g_ssid:'WiFi2G-1',
  radio2g_vlanid:0,
  radio2g_encryption:'none',
  radio2g_key:''
}

const initRadioValues5g = {
  radio5g_channel : 0,
  radio5g_htmode : 'VHT160',
  radio5g_txpower :27,
  radio5g_disabled:true,
  radio5g_vlan:false,
  radio5g_ssid:'WiFi5G-1',
  radio5g_vlanid:0,
  radio5g_encryption:'none',
  radio5g_key:''
}

const Settings: React.FC = (props) => {
  const {radio,myform} = props;
  let radioName = radio;

  //给name赋值
  const Name_channel = radioName+'_channel';
  const Name_htmode = radioName+'_htmode';
  const Name_txpower = radioName+'_txpower';
  const Name_disabled = radioName+'_disabled';
  const Name_vlan = radioName+'_vlan';
  const Name_ssid = radioName+'_ssid';
  const Name_vlanid = radioName+'_vlanid';
  const Name_encryption = radioName+'_encryption';
  const Name_key = radioName+'_key';


  //判断射频赋值
  let channelOptions = 0;
  let htmodeOptions = 0;
  let txpowerSlider = 0;
  let maxTxpower=21;
  let initValues = initRadioValues2g;

  if(radio === 'radio2g' ){
    channelOptions = channel24;
    htmodeOptions = htmode24;
    txpowerSlider = txpowerMarks24;
    maxTxpower = 21;
    initValues = initRadioValues2g;
  }else{
    channelOptions = channel58;
    htmodeOptions = htmode58;
    txpowerSlider = txpowerMarks58;
    maxTxpower = 27;
    initValues = initRadioValues5g;
  }
  
  setTimeout(()=>{
    if(typeof (myform) !== 'undefined'){ //防止未渲染完成，造成错误
      myform.setFieldsValue(initValues);
    }
  },100);



  return(
    <>
        <h3 style={{fontWeight:'bold',color:'#0f6fc7'}}>射频设置</h3>
      <ProForm.Group >
        <ProFormSelect name={Name_channel} label="无线信道" width={'md'}  options={channelOptions}
          tooltip={'默认为自动信道，以实际信道为准'}
        />
        <ProFormSelect name={Name_htmode} label="无线频宽" width={'md'} options={htmodeOptions}
                       tooltip={'频宽越窄，则抗干扰越强，不支持 160 MHz 的设备默认会调至 80 MHz 或者 40 HMz'}
        />
        <ProFormSlider
          name={Name_txpower}
          label="发射功率"
          width={'sm'}
          max={maxTxpower}
          min={1}
          marks={txpowerSlider}
          tooltip={'每衰减 3dBm 则接收距离减少一半'}
        /> <span style={{fontWeight:'bold'}}> dBm</span>
      </ProForm.Group>

      <h3 style={{fontWeight:'bold',color:'#0f6fc7'}}>SSID设置</h3>
      <ProForm.Group>
        <ProFormSwitch name={Name_disabled} label="SSID开关"  />
        <ProFormSwitch name={Name_vlan} label="VLAN 开关"  />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText width="md" name={Name_ssid} label="SSID" tooltip="不得超过32个字符，1个中文字符=3个英文字符" 
          rules={[{ required: false, validator:checkSsid}]}
        />
        <ProFormDigit width="md" name={Name_vlanid} label="VLAN ID" min={0} max={4096} keyboard={false}
          rules={[{ required: true, message:'VLAN ID 不合法'}]}
          tooltip={'VLAN ID 范围 1 ~ 4096 之间，0 表示关闭'}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect name={Name_encryption} label="加密方式" width={'md'}
                       options={ency}
          // rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormText.Password width="md" name={Name_key} label="无线密码" tooltip="不得超过16个字符"  
          rules={[{ required: false, validator:checkWirelessKey}]}
        />
      </ProForm.Group>
    </>
);
};
export  default  Settings;
