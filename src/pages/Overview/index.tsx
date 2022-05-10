import React, {useEffect, useState} from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { StatisticProps } from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import  {GlobalOutlined,WifiOutlined,SmileOutlined,TeamOutlined,AlertOutlined,FileOutlined} from '@ant-design/icons';
import ProList from './proList';
import styles from './index.less';
import {server_addr,getCookie,rsa_decrypt} from "@/pages/hiswiApi/hiswi_api";
const { Statistic } = StatisticCard;
import axios from 'axios';
import { message } from 'antd';

const Overview: React.FC = () => {

  const [proList, setProList] = useState({});

  const items = [
    { key: '1', title: '已建项目', value: 10, total: true,icon:(<GlobalOutlined className={styles.global}/>)},
    { key: '2', title: '设备总数', value: 10, total: true,icon:(<WifiOutlined className={styles.wifi}/>)},
    { key: '3', title: '终端用户', value: 10, total: true,icon:(<SmileOutlined className={styles.custom}/>)},
    { key: '4', title: '下属管理', value: 10, total: true,icon:(<TeamOutlined className={styles.manager}/>)},
    { key: '5', title: '告警详情', value: 10, total: true,icon:(<AlertOutlined className={styles.alarm}/>)},
    { key: '6', title: '日志详情', value: 10, total: true,icon:(<FileOutlined className={styles.syslog}/>)},
  ];

  // useEffect(async()=>{
  //   const hitoken = getCookie('hitoken');
  //   let pushData={}
  //   pushData.Type='getProlist';
  //   pushData.hitoken=hitoken;
  //   // console.log(pushData);
  //   try {
  //     const result = await axios({
  //       url:server_addr+'/cgi-bin/profile.lua',
  //       params:pushData,
  //       method:'post',
  //     })
  //     console.log(result.data);
  //     const list=rsa_decrypt(result.data.proList);
  //     console.log(list);
  //     // if(result.data.err_code === 7){
  //     //   message.warn('用户已注册，请直接登录！');
  //     // }else if(result.data.err_code === 1 || result.data.err_code === 3){
  //     //   message.success('短信发送成功，如未获取到请稍后尝试！');
  //     // }else if(result.data.err_code === 2 || result.data.err_code === 0){
  //     //   message.success('短信发送失败！');
  //     // }
  //   } catch(error){
  //     message.error('请求数据失败！');
  //   }
  // },[]);

  return(
    <PageContainer>
      <ProCard
        tabs={{
          onChange: (key) => {
            // console.log('key', key);
          },
        }}
      >
        {items.map((item) => (
          <ProCard.TabPane
            style={{ width: '100%' }}
            key={item.key}
            tab={
              <Statistic
                layout="vertical"
                title={item.title}
                value={item.value}
                icon={item.icon}
                status={item.status as StatisticProps['status']}
                style={{ width: 120, borderRight: item.total ? '1px solid #f0f0f0' : undefined }}
              />
            }
          >
            {/*根据tab key 进行选择显示哪些组件*/}
          <ProList />
          </ProCard.TabPane>
        ))}
      </ProCard>
    </PageContainer>
  );
}

export default Overview;
