import { message,Row, Col } from 'antd';
import JSEncrypt from 'jsencrypt';
import { city } from './city';
// import JSEncrypt from 'encryptlong';
const server_addr = "http://www.hiswi.cn";
import axios from 'axios';
import { resolveOnChange } from 'antd/lib/input/Input';

const getCookie = (name)=>{
  let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if(arr != null) return decodeURIComponent(arr[2]);
  return null;
}

const warning = (str) => {
  message.warning(str);
};

//告警提示
const success = (str) => {
  message.success(str);
};

const error = (str) => {
  message.error(str);
};

//设置缓存
const setCookie = (name, value, min)=>{
  let default_min = 30;//默认30天
  let exp  = new Date();
  if(min){
    exp.setTime(exp.getTime() + min*1000*60);
  }else{
    exp.setTime(exp.getTime() + default_min*1000*60);
  }

  document.cookie = name + "="+ encodeURIComponent(value) +";expires="+ exp.toUTCString();
}


const delCookie = (name)=>{
  document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//检查登录时间是否过期
const checkLoginTime = ()=>{
  let userID=getCookie('hitoken');
  if(!userID){
    window.location.href="/";
  }
  return userID;
}

//检测手机号码是否合法
const checkPhoneValid=(phone)=>{
  let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(phone)) {
    return false;
  } else {
    return true;
  }
}

//rsa 公钥加密
const rsa_encrypt=(msg)=>{
  let pub_key = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDM9UyYyG82+xHIA+Gtkayp0QEl\n" +
    "fhBe4ARvRngnyDc5+h8A2GLYzemK+7PxDe3i2SQz0RT1opq2rYUlLBAZzRoVQxQ9\n" +
    "bAjQaqswjAglM3qCHbLj85zpoLKY/vsfB/2BAxhTjTsWmsnlPla2u49xOldLQBHv\n" +
    "URMNijFyxT/RYxuY5wIDAQAB\n" +
    "-----END PUBLIC KEY-----";

  if(msg.length > 117){
    //分段加密
    let arrlen = Math.ceil(msg.length/117);//向上取整得出需要的数组长度
    let msgArr = new Array(); //普通消息字符串数组
    let b64Arr = new Array(); //base64字符串数组
    //分解为<=117个字符，并加密
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(pub_key);
    let encyStr = "";//加密后的base64字符串,用于返回
    for(let i=0;i<arrlen;i++){
      msgArr[i] = msg.substr(i*117,117);
      b64Arr[i] = encrypt.encrypt(msgArr[i]);
    }
    //拼接字符串
    for(let i=0;i<arrlen;i++){
      //去掉base64等号
      b64Arr[i] = b64Arr[i].substr(0,b64Arr[i].length-1);
      encyStr = encyStr + b64Arr[i];
    }
    // console.log(encyStr);
    //返回base64数组
    return encyStr;
  }else{
    //正常加密
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(pub_key);
    let str = encrypt.encrypt(msg);// 加密后的字符串
    return str;
  }

}

//rsa私钥解密
//rsa 公钥加密
const rsa_decrypt=(msg)=>{
  let pri_key = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXQIBAAKBgQDM9UyYyG82+xHIA+Gtkayp0QElfhBe4ARvRngnyDc5+h8A2GLY\n" +
    "zemK+7PxDe3i2SQz0RT1opq2rYUlLBAZzRoVQxQ9bAjQaqswjAglM3qCHbLj85zp\n" +
    "oLKY/vsfB/2BAxhTjTsWmsnlPla2u49xOldLQBHvURMNijFyxT/RYxuY5wIDAQAB\n" +
    "AoGBAMzYejbVVPpxkwMChiMwzo5nOysaxQfeA/CnUN4J6NCEYUo5+wlPPBTRnrXV\n" +
    "QyYP+nPji3w5iUH9SW6ujGUNLfu3r842bQyKjf7tMOjkERG6DfJjIvGU4wIgfwC8\n" +
    "EWVZ5Skk15y57UBiRn3/p3ij/a05VmLR/Jj+xoo/DZuReE4xAkEA/u28nhroI/f9\n" +
    "4F9SSBs17iYpEUI3n6B7wIJOZhdi3Agzgni8+qf18a0ZCVUqBJOiO344mM4vrsBn\n" +
    "18m8qlS0yQJBAM3RzVMo3F536RVpciwrMkTh+RjGzhETtnLp2ts50y2Ffwy+3ZSi\n" +
    "YozkhXnFFuSyQmyJUSQCLcH+By5bGWlXKC8CQQC0bS6B+Ck0y+AzXUOvJRMWaovG\n" +
    "W0djAwKTTaaPOx4M/QD35txZy2aWlhySLmR+uL6pvLvx6nx1Alh8sZuGMk2BAkAm\n" +
    "UguykgcFp7nD/M//HUPMw24HiOxRDaSInLXc31VMQnC3RMoopFtI9DtNwr5SckYf\n" +
    "wylSVP2EAvH/VYLTtCCNAkAENc175hs0EvukSyunQLFl/AhuRDo3QoGddLseMd0N\n" +
    "5WN01xjhCgLXNUqMQIyAIBAr59W4QbawNFyzqcDR3UvM\n" +
    "-----END RSA PRIVATE KEY-----";

  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(pri_key);
  let msgLen = msg.length;
  let arrlen = msgLen/171;
  let b64arr= new Array();
  let b64str= "";
  let allStr="";
  if(msgLen > 172){
    //分段解密
    let i = 0;
    for(i;i<arrlen;i++){
      b64arr[i] = msg.substr(i*171,171);
      b64str=b64arr[i]+"=";
      //解密
      allStr=allStr+decrypt.decrypt(b64str);
    }
    return allStr;

  }else{
    //正常解密
    let str = decrypt.decrypt(msg);// 解密后的字符串
    return str;
  }

}

//获取省市区/县
const getLocation=(location)=>{
  let locationArr = JSON.parse(location);
  let cityLen = city.length;
  let i = 0,j=0,n=0;
  let location1='';//省
  let location2='';//市
  let location3='';//区县
  for(i;i<cityLen;i++){
    if(city[i].value == locationArr[0]){
      location1 = city[i].label;
      for(j;j<city[i].children.length;j++){
        if(city[i].children[j].value == locationArr[1]){
          location2 = city[i].children[j].label
          for(n;n<city[i].children[j].children.length;n++){
            if(city[i].children[j].children[n].value == locationArr[2]){
              location3 = city[i].children[j].children[n].label
            }
          }
        }
      }
    }
  }

  return location1+"/"+location2+"/"+location3;
}

//判断是否空数组
const checkObjEmpty=(obj)=>{
  if(Object.keys(obj).length === 0){
    return true;
  }else{
    return false;
  }
}

//判断是否完成信息
const isCompleteInfo=()=>{
  let flag=getCookie('iscompelete');
  if(flag == 'no'){
    window.location.href="/index/complete";
  }
}

//教研MAC地址是否合法
const checkMacValid = (value)=>{
  let temp = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
  let temp1 = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/;

  if (!temp.test(value) && !temp1.test(value))
  {
      return false;
  }
  return true;
}

 const hiswiReuqestUrl = async (url, pushData)=>{
  try{
    await axios({
    url:server_addr+'/cgi-bin/getWifiConfig.lua',
    params:pushData,
    method:'post',
  }).then(res=>{
    return Promise.resolve(res.data);
  })

  }catch{
      message.error('请求数据失败！');
      // return false;
  }
}

//校验邮箱
const checkMail = (value) =>{
  const  reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
  if(!reg.test(value)){
    return false
  }else{
    return true
  }
}

//校验SSID
const checkSsid=(rule, value, callback)=>{

  let reg = new RegExp('[\u4E00-\u9FA5]+'); //中文正则
  let count = 0;
  for(let i=0;i < value.length;i++){
    if(reg.test(value[i])){
      count = count + 3;
    }else{
      count = count + 1;
    }
  }

  if(count > 32 ||  count === 0){
    callback('SSID不合法');
    return false;
  }
  callback();
  return true;
}

//校验无线密码
const checkWirelessKey = (rule, value, callback) =>{
  if(value.length > 16){
    callback('无线密码不合法');
    return false;
  }
  callback();
  return true;
}

const setJson = (obj, name, value) =>{
  obj.forEach((val,index)=>{
      val['ssid']=value;
  })
}

//封装json数据
const addDataToJson = (values, action) =>{
  const keys= Object.keys(values);
  let data = new Object();
  let radio2g = new Object();
  let vap2g1 = new Object();
  let vap2g2 = new Object();
  let vap2g3 = new Object();
  let vap2g4 = new Object();
  let radio5g = new Object();
  let vap5g1 = new Object();
  let vap5g2 = new Object();
  let vap5g3 = new Object();
  let vap5g4 = new Object();
  const reg = new RegExp(/radio2g/);
  const reg4 = new RegExp(/radio5g/);
  const reg2 = new RegExp(/channel|htmode|txpower/);
  const reg3 = new RegExp(/disabled|vlan|ssid|vlanid|encryption|key/);
  for(let i=0;i<keys.length;i++){
      if(reg.test(keys[i])){
        if(reg2.test(keys[i]))
          radio2g.[keys[i].replace("radio2g_", "")] = values.[keys[i]];

        if(reg3.test(keys[i]))
          vap2g1.[keys[i].replace("radio2g_", "")] = values.[keys[i]];

      }
      
      if(reg4.test(keys[i])){
        if(reg2.test(keys[i]))
          radio5g.[keys[i].replace("radio5g_", "")] = values.[keys[i]];

        if(reg3.test(keys[i]))
          vap5g1.[keys[i].replace("radio5g_", "")] = values.[keys[i]];

      }
      
  }

//批量操作，配合后台以前的接口
  if(action === "addPro"){
    //复制对象，以免对原对象造成影响
    vap2g2 = Object.assign({}, vap2g1);
    vap2g3 = Object.assign({}, vap2g1);
    vap2g4 = Object.assign({}, vap2g1);
  
    vap2g2.disabled = false;
    vap2g2.ssid = 'WiFi2G-2';
    vap2g3.disabled = false;
    vap2g3.ssid = 'WiFi2G-3';
    vap2g4.disabled = false;
    vap2g4.ssid = 'WiFi2G-4';
  
    vap5g2 = Object.assign({}, vap5g1);
    vap5g3 = Object.assign({}, vap5g1);
    vap5g4 = Object.assign({}, vap5g1);

    vap5g2.disabled = false;
    vap5g2.ssid = 'WiFi5G-2';
    vap5g3.disabled = false;
    vap5g3.ssid = 'WiFi5G-3';
    vap5g4.disabled = false;
    vap5g4.ssid = 'WiFi5G-4';

    data.vap2g2 = vap2g2;
    data.vap2g3 = vap2g3;
    data.vap2g4 = vap2g4;

    data.vap5g2 = vap5g2;
    data.vap5g3 = vap5g3;
    data.vap5g4 = vap5g4;
  }


  data.radio2g = radio2g;
  data.vap2g1 = vap2g1;

  data.radio5g = radio5g;
  data.vap5g1 = vap5g1;

  data.proName = values.proName;
  return data;
}

//-----------------------------表格搜索---------------------------
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
};

const handleReset = clearFilters => {
  clearFilters();
};

export {
  checkObjEmpty,
  getCookie,
  warning,
  success,
  error,
  setCookie,
  delCookie,
  checkLoginTime,
  checkPhoneValid,
  isCompleteInfo,
  rsa_encrypt,
  rsa_decrypt,
  getLocation,
  checkMacValid,
  hiswiReuqestUrl,
  checkMail,
  checkSsid,
  checkWirelessKey,
  addDataToJson,
  server_addr
}
