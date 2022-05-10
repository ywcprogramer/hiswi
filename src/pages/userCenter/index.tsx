import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import moment from 'moment';
import MyInfo from './myInfo';
import ChangePassword from './changePassword';
import ApplyServer from './applyServer';
import  CompleteInfoi from  './completeInfo';
import ApplyProgress from  './applyProgress';

//主入口
const UserCenter: React.FC = (props) => {
  const [responsive, setResponsive] = useState(false);
  const [myDate, setMyDate] = useState('');

  //更新日期
  setInterval(()=>{
    const val = moment().format('YYYY-MM-DD HH:mm:ss');
    setMyDate(val);
  },1000);

  return (
    <>
      <ProCard
        title={<div style={{fontSize:18, fontWeight:'bold',color:"#0f6fc7"}}>个人中心</div>}
        headStyle={{fontSize:14, fontWeight:'bold'}}
        extra={myDate}
        gutter={8}
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        {/*个人信息展示*/}
        <ProCard
          title={<div style={{fontSize:16, fontWeight:'bold',color:"#0f6fc7"}}>个人信息</div>}
          colSpan="33%"
          hoverable
          bordered
        >
          <MyInfo />
        </ProCard>

        {/*修改密码*/}
        <ProCard
          title={<div style={{fontSize:16, fontWeight:'bold',color:"#0f6fc7"}}>修改密码</div>}
          colSpan="34%"
          hoverable
          bordered
        >
          <ChangePassword />
        </ProCard>

        {/*申请服务商*/}
        <ProCard
          title={<div style={{fontSize:16, fontWeight:'bold',color:"#0f6fc7"}}>申请服务商</div>}
          colSpan="33%"
          hoverable
          bordered
        >
          <ApplyServer />
        </ProCard>
      </ProCard>

        {/*完善信息*/}
      <ProCard
        headStyle={{fontSize:14, fontWeight:'bold'}}
        gutter={8}
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        {/*完善信息*/}
        <ProCard
          title={<div style={{fontSize:16, fontWeight:'bold',color:"#0f6fc7"}}>个人信息完善</div>}
          colSpan="40%"
          hoverable
          bordered
        >
          <CompleteInfoi />
        </ProCard>

        {/*申请进度*/}
        <ProCard
          title={<div style={{fontSize:16, fontWeight:'bold',color:"#0f6fc7"}}>服务商申请进度</div>}
          colSpan="60%"
          hoverable
          bordered
        >
          <ApplyProgress />
        </ProCard>

      </ProCard>

    </>
  );
};

export default  UserCenter;
