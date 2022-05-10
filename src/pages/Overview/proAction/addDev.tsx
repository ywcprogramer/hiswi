import React, { useEffect } from 'react';
import { Button, message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

import {getCookie, rsa_decrypt, rsa_encrypt} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';


//添加到已配置池
function addDevToUnConfigedPool(data){

    const hitoken = getCookie('hitoken');
    let pushData = new URLSearchParams();
    pushData.set('data', rsa_encrypt(JSON.stringify(data)));
    pushData.set('Type', 'addDev');
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
                message.warning('未找到设备');
                break;
            case 3:
                message.warning('设备已配置，请解绑');
                break;
            case 4:
                message.warning('用户不存在');
                break;
            default:
                message.error('操作异常');
                break;
        }
    }); 
}

//校验MAC地址
function checkMacFormat(rule, value, callback){
    let temp = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
    let temp1 = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/;
    if (!temp.test(value) && !temp1.test(value))
    {
        callback('请输入合法的MAC地址');
        return false;
    }
    callback();
    return true;
}

const AddDev: React.FC = (props) => {

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
        title="添加设备"
        trigger={
            <a type="primary">
            添加设备
            </a>
        }
        modalProps={{
            // onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
            addDevToUnConfigedPool(values);
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
        name="mac" 
        label="设备MAC" 
        placeholder="00:11:22:33:44:55/00-11-22-33-44-55" 
        rules={[{ required: true, message: '请输入合法的MAC地址',validator:checkMacFormat}]}
        />
        </ModalForm>
    );
};

export default AddDev;