import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import {FooterToolbar, PageContainer,} from '@ant-design/pro-layout';
import {WifiOutlined,ArrowRightOutlined } from '@ant-design/icons';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Form, Button} from "antd";
import styles from "@/pages/Overview/index.less";
import {addDataToJson,rsa_encrypt,getCookie} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';
import ProList from '@/pages/Overview/proList';


//主入口
const CreateApPro: React.FC = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      <PageContainer
        header={{
          // title: '快速设置，默认创建每个射频的第一个SSID。',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '',
                breadcrumbName: '项目管理',
              },
              {
                path: '',
                breadcrumbName: '项目列表',
              },
              {
                path: '',
                breadcrumbName: 'AP项目列表',
              },
            ],
          }
        }}
      >
        {/* 项目列表 */}
        <ProList />
      </PageContainer>
    </>
  );
};
export default  CreateApPro;
