import React from 'react';
import { message,Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ProFormSlider,
  ProFormDigit
} from '@ant-design/pro-form';

import {channel24,channel58,htmode24,htmode58,txpower24} from '../../hiswiApi/channel'
import {getCookie, rsa_decrypt, rsa_encrypt,server_addr,hiswiReuqestUrl} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';
import { SELECTION_NONE } from 'antd/lib/table/hooks/useSelection';


  //更新radio配置
function updateRadio(data) {

    //转换开关
    if(data.disabled === true){
      data.disabled = 0
    }else{
      data.disabled = 1
    }


    //转换射频值
    if(data.radioType === '2.4 G'){
      data.radioType = 'radio2'
    }else if(data.radioType === '5.8 G'){
      data.radioType = 'radio5';
    }

    //转换5G优先
    if(data.lbd === true){
      data.lbd = 1;
    }else{
      data.lbd = 0;
    }

    //转换漫游
    if(data.roam === true){
      data.roam = 1;
    }else{
      data.roam = 0;
    }

    const hitoken = getCookie('hitoken');

    let pushData = new URLSearchParams();
    pushData.set('data', rsa_encrypt(JSON.stringify(data)));
    pushData.set('Type', 'updateRadio');
    pushData.set('hitoken', hitoken);
    HiRequest(pushData as HiParams.pushDataRadio, '/cgi-bin/getWifiConfig.lua').then(data =>{
      // console.log(data);
    });
}

//射频配置内容
const RightRadioConfig: React.FC = (props) => {

  const [form] = Form.useForm();
  //解析radio配置和类型
  const {radioInfo, device, proNumber} = props;
  let channel = channel24;
  let htmodeType = htmode24;
  let radioType = '2.4 G'

  if(device === 'radio2'){
    channel = channel24;
    radioType = '2.4 G';
    htmodeType = htmode24;
  }else if(device === 'radio5'){
    channel = channel58;
    radioType = '5.8 G';
    htmodeType = htmode58;
  }

  //动态赋值给表单
  form.setFieldsValue({
    disabled:radioInfo.disabled===0?true:false,
    channel: radioInfo.channel,
    htmode:radioInfo.htmode,
    minAccess:radioInfo.minAccess,
    txpower:radioInfo.txpower,
    lbd:radioInfo.lbd===0?false:true,
    roam:radioInfo.roam===0?false:true,
    proNumber:proNumber,
    radioType:radioType,
  });


    return(
      <>
      <ProForm
      onFinish={async (value) => {
        updateRadio(value);
        message.success('提交成功');
      }}
      form={form}
      initialValues={{
        proNumber:proNumber,
        radioType:radioType,
        disabled: radioInfo.disabled===0?true:false,
        channel: radioInfo.channel,
        htmode:radioInfo.htmode,
        lbd:radioInfo.lbd===0?false:true,
        minAccess:radioInfo.minAccess,
        txpower:radioInfo.txpower,
        roam:radioInfo.roma===0?false:true
      }}
    >

<ProForm.Group>
    <ProFormText
        width="sm"
        name="proNumber"
        label="工程编号"
        readonly
        fieldProps={{
          // bordered:false,
          type:"hidden"
        }}
    />

    <ProFormText
        width="sm"
        name="radioType"
        label="射频类型"
        readonly
        fieldProps={{
          bordered:false,
        }}
    />

</ProForm.Group>

<ProFormSwitch
        width="md"
        name="disabled"
        label="射频开关"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />

<ProForm.Group>
      <ProFormSelect
        options={channel}
        width="sm"
        name="channel"
        label="无线信道"
      />

      <ProFormSelect
        options={htmodeType}
        width="sm"
        name="htmode"
        label="无线频宽"
      />
</ProForm.Group>
      <ProFormSlider
      marks={txpower24}
      width="lg"
      name="txpower"
      label="发射功率"
      max={21}
      min={1}
      tooltip={'功率每衰减3dBm，则功率衰减50%'}
      />

    <ProFormDigit
      label="最低接入信号(dBm)"
      name="minAccess"
      width="sm"
      min={-95}
      max={0}
      tooltip={'0 表示不限制，最低 -95 dBm'}
     />
<ProForm.Group>
    <ProFormSwitch
        width="md"
        name="lbd"
        label="5G优先"
        checkedChildren="开启"
        unCheckedChildren="关闭"
    />

  <ProFormSwitch
        width="md"
        name="roam"
        label="无缝漫游"
        checkedChildren="开启"
        unCheckedChildren="关闭"
    />
</ProForm.Group>
    </ProForm>
      </>
    );
}

export default RightRadioConfig;
