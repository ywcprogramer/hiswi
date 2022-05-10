import React,{useState,useEffect,useContext} from 'react';
import { Button, message ,Timeline,Tag,Select} from 'antd';
import RightRadioConfig from './rightRadioConfig';
import RightVapConfig from './rightVapConfig';
import {proNumberContext} from '../proList';
import axios from 'axios';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined,WifiOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import {getCookie, rsa_decrypt, server_addr,hiswiReuqestUrl} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';
const { Option } = Select;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

interface Props {
  proNumber:number;
}

// const EditInfo: React.FC <Props>= (props) => {}

const EditInfo: React.FC = () => {

  const [topTitle, setTopTitle] = useState();
  const [leftContent, setLeftContent] = useState();
  const [dataInfo, setDataInfo] = useState(null);
  const [device, setDevice] = useState(null);
  const proNumber = useContext(proNumberContext);
  const [radioVisible, setRadioVisible] = useState(false);

  //获取射频信息
  function getRadioConfig(radioType){
    const hitoken = getCookie('hitoken');

    let pushData = new URLSearchParams();
    pushData.set('Type', 'getRaidoConfig');
    pushData.set('radioType', radioType);
    pushData.set('hitoken', hitoken);
    pushData.set('proNumber', proNumber);
    HiRequest(pushData as HiParams.pushDataRadio, '/cgi-bin/getWifiConfig.lua').then(data =>{
      setDataInfo(JSON.parse(rsa_decrypt(data.radio)));
    });
  }

    //获取SSID信息
  function getSsidConfig(vapType){
    const hitoken = getCookie('hitoken');

    let pushData = new URLSearchParams();
    pushData.set('Type', 'getVapConfig');
    pushData.set('vapType', vapType);
    pushData.set('hitoken', hitoken);
    pushData.set('proNumber', proNumber);
    HiRequest(pushData as HiParams.pushDataRadio, '/cgi-bin/getWifiConfig.lua').then(data =>{
      setDataInfo(JSON.parse(rsa_decrypt(data.vap)));
    });
  }

  //判断显示内容


  function handleSelect(value){
    setDevice(value);
    switch(value){
      case 'radio2':
          setTopTitle('射频配置');
          getRadioConfig(value);
          break;
      case 'wifi21':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'wifi22':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'wifi23':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'wifi24':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'radio5':
          setTopTitle('射频配置');
          getRadioConfig(value);
          break;
      case 'wifi51':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'wifi52':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'wifi53':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      case 'wifi54':
          setTopTitle('SSID配置');
          getSsidConfig(value);
          break;
      default:
        break;
    }
  }
 

  //完成组件加载后
  useEffect(()=>{
    if(dataInfo !== null ){
      if(dataInfo.channel){
        setLeftContent(<RightRadioConfig radioInfo={dataInfo} device={device} proNumber={proNumber}/>);
      }else{
        setLeftContent(<RightVapConfig vapInfo={dataInfo} device={device} proNumber={proNumber}/>);
      }
      
    }
  },[dataInfo]);

  //点击详情编辑利用 proNumber 获取 相应的数据
 function showGetHanddel(){
    handleSelect('radio2');
  }

  return (
    <ModalForm
      title="详情编辑"
      // visible={radioVisible}
      trigger={
        <a type="primary" onClick={showGetHanddel}>
          详情编辑
        </a>
      }
      modalProps={{
        onCancel: () => {setRadioVisible(false)},
      }}
      submitter={{
        submitButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        }
      }}
    >


      <ProCard split="vertical">
        <ProCard title="射频选择" colSpan="30%">
          <Timeline style={{marginTop:"20px"}}>
            <Timeline.Item>
              <Tag icon={<WifiOutlined />} color="#55acee" style={{fontSize:'24px',fontWeight:'500'}}>
                <Select defaultValue="2.4 G" bordered={false} style={{fontSize:'24px',fontWeight:'500',color:'#fff',background:'#55acee'}}
                  onSelect={handleSelect}
                >
                  <Option value="radio2">2.4 G</Option>
                  <Option value="wifi21">WiFi1</Option>
                  <Option value="wifi22">WiFi2</Option>
                  <Option value="wifi23">WiFi3</Option>
                  <Option value="wifi24">WiFi4</Option>
                </Select>
              </Tag>
              <div>
                &nbsp;
              </div>
              <div>
                &nbsp;
              </div>
              <div>
                &nbsp;
              </div>
              <div>
                &nbsp;
              </div>
            </Timeline.Item>
            <Timeline.Item>
              <Tag icon={<WifiOutlined />} color="#87d068" style={{fontSize:'24px',fontWeight:'500'}}>
                <Select defaultValue="5.8 G" bordered={false} style={{fontSize:'24px',fontWeight:'500',color:'#fff',background:'#87d068'}}
                  onSelect={handleSelect}
                >
                  <Option value="radio5">5.8 G</Option>
                  <Option value="wifi51">WiFi1</Option>
                  <Option value="wifi52">WiFi2</Option>
                  <Option value="wifi53">WiFi3</Option>
                  <Option value="wifi54">WiFi4</Option>
                </Select>
              </Tag>
            </Timeline.Item>
          </Timeline>
        </ProCard>
        {/*右侧内容*/}
        <ProCard title={<div style={{fontWeight:'bold'}}>{topTitle}</div>} headerBordered>
          {leftContent}
        </ProCard>
      </ProCard>

</ModalForm>
);
};


export default EditInfo;
