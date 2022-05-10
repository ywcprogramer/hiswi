import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login,hiswiRequest } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {rsa_encrypt, setCookie, delCookie,server_addr} from "@/pages/hiswiApi/hiswi_api";
import  Qs from 'qs';
import axios from 'axios';


import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    let pushData =  {};
    let data = {};
    data.password = values.password;
    data.phone = values.phone;
    pushData.data = rsa_encrypt(JSON.stringify(data));

    pushData.Type = 'doUserLogin';
    // console.log(pushData);

    setSubmitting(true);

    try {
      const result = await axios({
        url:server_addr+'/cgi-bin/login.lua',
        params:pushData,
        method:'post',
      })
      // console.log(result);

      if(result.data.err_code !== 1){
        message.warn('账户或者密码错误');
      }else{
        message.success('登录成功');
        // setInitialState({
        //   ...initialState,
        //   currentUser: {
        //     access:'admin',
        //     name:'hello',
        //   },
        // });
        //设置权限
        delCookie('prop');
        setCookie('prop', result.data.prop,300);
        //设置token
        delCookie('hitoken');
        setCookie('hitoken', result.data.hitoken,300);
        window.location.href = '/overview';
      }

    } catch(error){
      message.error('网络失败');
    }

    setSubmitting(false);
  };

  //获取验证码
  const handleGetPhoneCode = async (values) => {
    let pushData =  {};
    pushData.Type = 'getRandomCode';
    pushData.mobile = values;

    try {
      const result = await axios({
        url:server_addr+'/cgi-bin/login.lua',
        params:pushData,
        method:'post',
      })
      // console.log(result);
      if(result.data.err_code === 7){
        message.warn('用户已注册，请直接登录！');
      }else if(result.data.err_code === 1 || result.data.err_code === 3){
        message.success('短信发送成功，如未获取到请稍后尝试！');
      }else if(result.data.err_code === 2 || result.data.err_code === 0){
        message.success('短信发送失败！');
      }
    } catch(error){
      message.error('网络失败');
    }

  }

  //注册账户
  const handleRegister = async (values) => {
    console.log(values);
    let pushData =  {};
    let data = {};
    pushData.Type = 'doUserRegister';
    data.phone = values.mobile;
    data.code = values.captcha;
    pushData.data = data;

    try {
      const result = await axios({
        url:server_addr+'/cgi-bin/login.lua',
        params:pushData,
        method:'post',
      })
      if(result.data.err_code === 5){
        message.warn('验证码已过期，请重新获取！');
      }else if(result.data.err_code === 4){
        message.warn('验证码不正确！');
      }else if(result.data.err_code === 7){
        message.warn('用户已注册！');
      }else if(result.data.err_code === 6){
        message.warn('注册失败！');
      }else if(result.data.err_code === 1){
        message.success('注册成功，密码默认为手机号码后6位，请登录修改！');
      }
    } catch(error){
      message.error('网络失败');
    }

  }

  const { status, type: loginType } = userLoginState;
  const [form] = ProForm.useForm();

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>成都海思微科技有限公司</div>
        </div>

        <div className={styles.main}>
          <ProForm
            form={form}
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  //切换操作面板
                  id: type === 'account'?'pages.login.submit':'pages.login.register',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              //根据面板type判断是登录还是注册
              if(type === 'account'){
                handleSubmit(values);
              }else{
                console.log('register');
                handleRegister(values);
                // handleGetPhoneCode(values);
              }

            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '登录',
                })}
              />
              <Tabs.TabPane
                key="mobile"
                tab={intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '注册',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="phone"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder={intl.formatMessage({
                    id: 'pages.login.phoneNumber.placeholder',
                    defaultMessage: '手机号',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '请输入验证码',
                  })}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${intl.formatMessage({
                        id: 'pages.getCaptchaSecondText',
                        defaultMessage: '获取验证码',
                      })}`;
                    }
                    return intl.formatMessage({
                      id: 'pages.login.phoneLogin.getVerificationCode',
                      defaultMessage: '获取验证码',
                    });
                  }}
                  name="captcha"
                  countDown={120} //倒计时
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    //获取短信操作
                    handleGetPhoneCode(form.getFieldValue('mobile'))
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div>
          </ProForm>
          <Space className={styles.other}>
            {/*<FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />*/}
            {/*<AlipayCircleOutlined className={styles.icon} />*/}
            {/*<TaobaoCircleOutlined className={styles.icon} />*/}
            {/*<WeiboCircleOutlined className={styles.icon} />*/}
          </Space>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
