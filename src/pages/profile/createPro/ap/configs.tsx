import React, {useState} from 'react';
import { message,Form } from 'antd';
import ProForm, {ProFormText, ProFormSlider, ProFormSelect} from '@ant-design/pro-form';
import {channel24,channel58,htmode24,htmode58,txpowerMarks24,txpowerMarks58} from "@/pages/hiswiApi/channel";
import {  FooterToolbar } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import Ssid from './ssid';

const initValues2g = {
  radio2g_channel : 1,
  radio2g_htmode : 'HT20',
  radio2g_txpower :21,
}

const initValues5g = {
  radio5g_channel : 36,
  radio5g_htmode : 'VHT160',
  radio5g_txpower :27,
}

const Configs: React.FC = (props) => {
  // const [txpower, setTxpower] = useState(txpower2g);
  const [form] = Form.useForm();
  const {name} = props;
  let vapName = '';
  let txpowerMarks = txpowerMarks24;
  let channel = channel24;
  let htmode = htmode24;
  let maxPower = 21;
  let initValues = initValues2g;
  let radioName = 'radio2gl';
  if(name === '2.4G'){
    initValues = initValues2g;
    vapName = 'vap2g';
    txpowerMarks = txpowerMarks24;
    maxPower = 21;
    htmode = htmode24;
    radioName = 'radio2g';
  }else{
    initValues = initValues5g;
    vapName = 'vap5g';
    txpowerMarks = txpowerMarks58;
    maxPower = 27;
    channel = channel58;
    htmode = htmode58;
    radioName = 'radio5g';
  }

//setTimeout 防止组件未渲染完成
setTimeout(()=>{
  form.setFieldsValue(initValues)
},300);

  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
      }}
      submitter={{
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
      form={form}
    >
      {/*项目名称*/}
      <ProCard style={{ marginTop: -20}} gutter={[16, 2]} wrap >

        <ProCard colSpan="30%" layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>项目名称</span>} hoverable >
            <ProFormText width="md" name={'proName'} label="项目名称" tooltip="不得超过32个字符，1个中文字符=3个英文字符"
                         rules={[{ required: true, message: '项目名称不能为空' }]}
            />
        </ProCard>

        <ProCard colSpan="70%" layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>射频设置</span>} hoverable >
          <ProForm.Group  style={{maxHeight:'86px'}}>
            <ProFormSelect name={radioName+'_channel'} label="无线信道" width={'md'} options={channel}/>
            <ProFormSelect name={radioName+'_htmode'} label="无线频宽" width={'md'} options={htmode}
                           tooltip={'频宽越窄，则抗干扰越强'}
            />
            <ProFormSlider
              name={radioName+'_txpower'}
              label="发射功率"
              width={'sm'}
              max={maxPower}
              marks={txpowerMarks}
              tooltip={'每衰减3 dBm 则接收距离减少一半'}
            />
            <span>dBm</span>

          </ProForm.Group>
        </ProCard>

      </ProCard>

      <ProCard style={{ marginTop: 4 }} gutter={[16, 16]} wrap  >
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>WiFi1</span>} hoverable style={{marginTop:-40}}>
          <Ssid name={vapName+'1'} form={form}/>
        </ProCard>

        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>WiFi2</span>} hoverable style={{marginTop:-40}}>
          <Ssid name={vapName+'2'} form={form}/>
        </ProCard>

        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>WiFi3</span>} hoverable >
          <Ssid name={vapName+'3'} form={form}/>
        </ProCard>

        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>WiFi4</span>} hoverable >
          <Ssid name={vapName+'4'} form={form}/>
        </ProCard>
      </ProCard>
    </ProForm>
  );
};

export default Configs;
