import React from 'react';
import ProForm, { ProFormText, ProFormSwitch, ProFormSelect } from '@ant-design/pro-form';
import {ency} from '@/pages/hiswiApi/channel';

function Ssid(props){
  const {name, form} = props;
  const Name_disabled = props.name+'_disabled';
  const Name_ssid = props.name+'_ssid';
  const Name_encryption = props.name+'_encryption';
  const Name_key = props.name+'_key';

  let disabled = false;
  let ssid = 'WiFi1';
  let encryption = 'none';
  let mykey = '';

  switch (name){
    case 'vap2g1':
    case 'vap5g1':
      ssid ='WiFi1';
      disabled = true;
      encryption = 'none';
      mykey = '';
      break;
    case 'vap2g2':
    case 'vap5g2':
      ssid ='WiFi2';
      disabled = false;
      encryption = 'none';
      mykey = '';
      break;
    case 'vap2g3':
    case 'vap5g3':
      ssid ='WiFi3';
      disabled = false;
      encryption = 'none';
      mykey = '';
      break;
    case 'vap2g4':
    case 'vap5g4':
      ssid ='WiFi4';
      disabled = false;
      encryption = 'none';
      mykey = '';
      break;
    default:
      break;
  }

  //setTimeout防止未渲染完成
  setTimeout(()=>{
    if(typeof (form) !== 'undefined'){
      form.setFieldsValue({
        [Name_disabled] :disabled,
        [Name_ssid]:ssid,
        [Name_encryption]:encryption,
        [Name_key]:mykey
      })
    }

  },100);

  return(
    <>
      <ProForm.Group>
        <ProFormSwitch name={Name_disabled} label="SSID开关"  />
        <ProFormText width="md" name={Name_ssid} label="SSID" tooltip="不得超过32个字符，1个中文字符=3个英文字符"/>
      </ProForm.Group>


      <ProForm.Group>
        <ProFormSelect name={Name_encryption} label="加密方式" width={'md'}
                       options={ency}
          // rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormText width="md" name={Name_key} label="无线密码" tooltip="不得超过32个字符"  />
      </ProForm.Group>

    </>

  {/*<ProCard*/}
  {/*  tabs={{*/}
  {/*    tabPosition,*/}
  {/*    activeKey: tab,*/}
  {/*    onChange: (key) => {*/}
  {/*      setTab(key);*/}
  {/*    },*/}
  {/*  }}*/}
  {/*  // title={'快速设置'}*/}
  {/*>*/}
  {/*<ProCard.TabPane key="2.4G" tab={<span style={{fontSize:18,fontWeight:'bold'}}><WifiOutlined spin={false} style={{fontSize:24,color:'#0089ff'}}/>2.4 G</span>}>*/}
  {/*  <Configs name={'2.4G'} />*/}
  {/*</ProCard.TabPane>*/}
  {/*<ProCard.TabPane key="5G" tab={<span style={{fontSize:18,fontWeight:'bold'}}><WifiOutlined spin={false}  style={{fontSize:24,color:'#0089ff'}}/>5 G</span>} >*/}
  {/*  <Configs name={'5G'}/>*/}
  {/*</ProCard.TabPane>*/}
  {/*</ProCard>*/}
  );
};
export  default  Ssid;
