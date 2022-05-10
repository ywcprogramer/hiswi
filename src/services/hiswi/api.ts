import { request } from 'umi';
import {server_addr} from "@/pages/hiswiApi/hiswi_api";

    // try{
    //     const result = await axios({
    //     url:server_addr+'/cgi-bin/getWifiConfig.lua',
    //     params:pushData,
    //     method:'post',
    //   })
    //   // console.log(result.data.radio2g);
    //   setLeftContent(leftConfig(result.data.radio2g));

    // }catch{
    //     message.error('请求数据失败1！');
    // }
    // const result  = hiswiReuqestUrl('/cgi-bin/getWifiConfig.lua', pushData);
    // console.log(result);

// import request from '@/utils/request';

//获取2.4G 射频配置
export async function HiRequest(body?:HiParams.pushDataRadio2g, url?:string, options?: { [key: string]: any }) {
    return request(server_addr+url, {
        method: 'POST',
        data: body,
        ...(options || {}),
      });  
}