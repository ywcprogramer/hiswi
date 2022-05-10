import React, { useEffect } from 'react';
import { Button, message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

import {getCookie, rsa_decrypt, rsa_encrypt,checkPhoneValid} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';


//添加管理者
function delPro(data){
    const hitoken = getCookie('hitoken');
    let pushData = new URLSearchParams();
    pushData.set('data', rsa_encrypt(JSON.stringify(data)));
    pushData.set('Type', 'delelePro');
    pushData.set('hitoken', hitoken);
    HiRequest(pushData, '/cgi-bin/getWifiConfig.lua').then(data =>{
      // console.log(data);
        switch(data.err_code){
            case 0:
                message.warning('删除失败');
                break;
            case 1:
                message.success('删除成功');
                break;
            case 2:
                message.warning('操作失败');
                break;                              
            default:
                message.error('操作异常');
                break;
        }
    }); 
}

//校验手机号码
function checkPhone(rule, phone, callback){
    if(!checkPhoneValid(phone)){
        callback('请输入合法的手机号码');
        return false;
    }
    callback();
    return true;
}

const DelPro: React.FC = (props) => {

    const {proNumber,setRefreshPage} = props;
    const [form] = Form.useForm();

    useEffect(()=>{
        form.setFieldsValue({
            proNumber:proNumber
        })
    },[proNumber]);

    return (
        <ModalForm
        form={form}
        initialValues={{
            proNumber:proNumber
        }}
        title="删除项目"
        trigger={
            <a type="primary">
            删除项目
            </a>
        }
        modalProps={{
            // onCancel: () => console.log('run'),
            // width:600
        }}
        onFinish={async (values) => {
            delPro(values);
            setRefreshPage(proNumber);
            return true;
        }}
        >
        <ProFormText
            width="md"
            name="proNumber"
            label="工程编号"
            tooltip=""
            readonly     
            />
            <h2>确定删除项目？</h2>
        {/* <ProFormText width="md" 
        type="number"
        name="phone" 
        label="手机号码" 
        placeholder="请输入手机号码" 
        rules={[{ required: true, message: '请输入手机号码',validator:checkPhone}]}
        /> */}
        </ModalForm>
    );
};

export default DelPro;