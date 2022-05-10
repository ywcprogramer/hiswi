import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import {FooterToolbar, PageContainer,} from '@ant-design/pro-layout';
import {WifiOutlined,ArrowRightOutlined } from '@ant-design/icons';
import Settings from './settings';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Form, Button} from "antd";
import styles from "@/pages/Overview/index.less";
import {addDataToJson,rsa_encrypt,getCookie} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';

function addPro(values){
  let data = addDataToJson(values, 'addPro');
  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(data)));
  pushData.set('Type', 'addApPro');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/profile.lua').then(resp =>{
    switch(resp.err_code){
      case 0:
          message.warning('添加失败');
          break;
      case 1:
          message.success('添加成功');
          break;
      case 2:
          message.warning('账户异常');
          break;
      case 3:
          message.warning('操作异常');
          break;
      case 4:
          message.warning('普通用户只能创建一个项目，请省级为服务商');
          break;
      case 5:
          message.warning('项目已存在');
          break;    
      default:
          message.error('操作异常');
          break;
  }
  });
}

//主入口
const CreateApPro: React.FC = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      <PageContainer
        header={{
          title: '快速设置，默认创建每个射频的第一个SSID。',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '',
                breadcrumbName: '项目管理',
              },
              {
                path: '',
                breadcrumbName: '新建项目',
              },
              {
                path: '',
                breadcrumbName: 'AP项目',
              },
            ],
          }
        }}
      >
        <ProForm
          onFinish={async (values) => {
            addPro(values);
            return true;
          }}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          form={form}
        >
          <ProForm.Group>
            <ProFormText width="md" name={'proName'} label="项目名称" tooltip="不得超过32个字符，1个中文字符=3个英文字符"
                         rules={[{ required: true, message: '项目名称不能为空' }]}
            />

          <ProForm.Item  label={'工程列表'} >
              <Button type="primary" className={styles.warningButton} icon={<ArrowRightOutlined />}>点击跳转</Button>
          </ProForm.Item>
          </ProForm.Group>
        <ProCard style={{ marginTop: -20}} gutter={[16, 2]} wrap >
          <ProCard colSpan="50%" layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>2.4 G</span>} hoverable >
              <Settings radio={'radio2g'} myform={form}/>
          </ProCard>

          <ProCard colSpan="50%" layout="left" bordered title={<span style={{fontWeight:'bold',color:'#0f6fc7'}}>5G</span>} hoverable >
            <Settings radio={'radio5g'} myform={form}/>
          </ProCard>
        </ProCard>
    </ProForm>
      </PageContainer>
    </>
  );
};
export default  CreateApPro;
