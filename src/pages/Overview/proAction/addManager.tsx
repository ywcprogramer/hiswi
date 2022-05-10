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
function addManager(data){
    const hitoken = getCookie('hitoken');
    let pushData = new URLSearchParams();
    pushData.set('data', rsa_encrypt(JSON.stringify(data)));
    pushData.set('Type', 'addManager');
    pushData.set('hitoken', hitoken);
    HiRequest(pushData, '/cgi-bin/getWifiConfig.lua').then(data =>{
      // console.log(data);
        switch(data.err_code){
            case 0:
                message.warning('添加失败');
                break;
            case 1:
                message.success('添加成功');
                break;
            case 2:
                message.warning('账户不存在');
                break;
            case 3:
                message.warning('操作失败');
                break;                
            case 4:
                message.warning('您暂无权限添加管理员，需要升级成为服务商');
                break;
            case 5:
                message.warning('管理者已存在项目中');
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

const AddManager: React.FC = (props) => {

    const {proNumber} = props;
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
        title="添加管理"
        trigger={
            <a type="primary">
            添加管理
            </a>
        }
        modalProps={{
            // onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
            addManager(values);
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
        <ProFormText width="md" 
        type="number"
        name="phone" 
        label="手机号码" 
        placeholder="请输入手机号码" 
        rules={[{ required: true, message: '请输入手机号码',validator:checkPhone}]}
        />

        <ProFormText width="md" 
        name="name" 
        label="姓名" 
        placeholder="" 
        rules={[{ required: true, message: '请输入姓名'}]}
        />
        </ModalForm>
    );
};

export default AddManager;