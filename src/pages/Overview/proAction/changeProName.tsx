import React, { useEffect } from 'react';
import {message, Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import {getCookie, rsa_encrypt} from "@/pages/hiswiApi/hiswi_api";
import { HiRequest } from '@/services/hiswi/api';


//添加到已配置池
function changeProName(data){

  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(data)));
  pushData.set('Type', 'updateProName');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/getWifiConfig.lua').then(data =>{
    // console.log(data);
    switch(data.err_code){
      case 0:
        message.warning('修改失败');
        break;
      case 1:
        message.success('修改成功');
        break;
      case 2:
        message.success('用户不存在');
        break;
      case 3:
        message.success('操作异常');
        break;
      case 4:
        message.success('无权限修改');
        break;
      default:
        message.error('操作异常');
        break;
    }
  });
}

const ChangeProName: React.FC = (props) => {

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
      title="修改名称"
      trigger={
        <a type="primary">
          修改名称
        </a>
      }
      modalProps={{
        // onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        changeProName(values);
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
      <ProFormText width="md"
                   name="proName"
                   label="工程名称"
                   placeholder=""
                   rules={[{ required: true, message: '工程名称不能为空'}]}
      />
    </ModalForm>
  );
};

export default ChangeProName;
