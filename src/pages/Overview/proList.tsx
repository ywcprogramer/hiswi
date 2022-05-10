import React, {useEffect, useState,createContext} from 'react';
import {Button, Tooltip, Dropdown, Menu, Input, message,Table,Space} from 'antd';
import { EllipsisOutlined, PrinterOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import styles from './index.less';
import axios from 'axios';
import {getCookie, rsa_decrypt, rsa_encrypt, server_addr,checkObjEmpty} from "@/pages/hiswiApi/hiswi_api";
import EditInfo from './proAction/editInfo';
import AddDev from './proAction/addDev';
import DelDev from './proAction/delDev';
import AddManager from './proAction/addManager';
import DelManager from './proAction/delManager';
import DelPro from './proAction/delPro';
import ChangeProName from './proAction/changeProName';
import { HiRequest } from '@/services/hiswi/api';
export const proNumberContext = createContext(null);

export type TableListItem = {
  key?: number;
  proType?:string;
  proName?:string;
  proNumber?:number;
  addTime?:string;
  managerCount?:number;
  terminals?:string;
  devStatus?:string;
  alarms?:string;
  index?:number;
};

//批量删除，绑定传值 multiDelPro.bind
const multiRealDelPro = (value) =>{
  if(checkObjEmpty(value)){
    message.warning('未选中项目');
    return;
  }
  console.log(value);
  const hitoken = getCookie('hitoken');
  let pushData = new URLSearchParams();
  pushData.set('data', rsa_encrypt(JSON.stringify(value)));
  pushData.set('Type', 'multiDelPro');
  pushData.set('hitoken', hitoken);
  HiRequest(pushData, '/cgi-bin/profile.lua').then(data =>{
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

//-----------------------------表格搜索---------------------------
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
};

const handleReset = clearFilters => {
  clearFilters();
};

const getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            confirm({ closeDropdown: true });
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          搜索
        </Button>
        <Button onClick={() => handleReset(clearFilters)} 
          size="small" style={{ width: 90 }}>
          重置
        </Button>
      </Space>
    </div>
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
});
//-----------------------------表格搜索---------------------------

//项目列表
const ProList: React.FC = () => {

  const [proList, setProList] = useState<TableListItem[]>([]);
  const [refreshPage, setRefreshPage] = useState([]);

  //批量删除项目
  function multiDelPro(value){
    multiRealDelPro(value);
    setTimeout(()=>{
      setRefreshPage(value);
    },500)

  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '项目类型',
      dataIndex: 'proType',
      // ellipsis: true,
      valueType:'select',
      initialValue: ['all'],
      filters: true,
      onFilter: true,
      search:false,
      valueEnum: {
        all: { text: '全部', status: '' },
        ap: { text: '无线AP', status: '' },
        gateway: { text: '路由网关', status: '' },
        router4g: { text: '4G路由', status: '' },
        cpe: { text: 'CPE', status: '' },
      },
      copyable: true,
      render: (_) => <a>{_}</a>,
    },
    {
      title: '项目名称',
      dataIndex: 'proName',
      ellipsis: true,
      search:false,
      copyable: true,
      ...getColumnSearchProps('proName'),
      render: (_) => <a>{_}</a>,
      // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
      
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
    },
    {
      title: <>
        项目告警
        <Tooltip placement="top" title="一般/严重">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>,
      dataIndex: 'alarms',
      search:false,
    },
    {
      title: <>
        终端数量
        <Tooltip placement="top" title="2.4G/5G">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>,
      dataIndex: 'terminals',
      search:false,
    },
    {
      title: '在线/离线',
      dataIndex: 'devStatus',
      search:false,
    },
    {
      title: '下属管理',
      dataIndex: 'managerCount',
      search:false,
    },
    {
      title: '项目编号',
      dataIndex: 'proNumber',
      ...getColumnSearchProps('proNumber'),
      copyable: true,
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      search:false,
    },
    {
      title: '创建时间',
      // width: 140,
      dataIndex: 'addTime',
      search:false,
      ellipsis: true,
      // sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: '操作',
      width: 180,
      dataIndex: 'action',
      valueType: 'option',
      render: (text, record) => [
        // 向子组件传入 proNumber
        <proNumberContext.Provider value={record.proNumber} key={record.proNumber}><EditInfo key={'showedit'}/></proNumberContext.Provider>,
        <AddDev key={'AddDev'} proNumber={record.proNumber}/>,
        <TableDropdown
          key="actionGroup"
          menus={[
            { key: 'delDev', name: <DelDev key={'DelDev'} proNumber={record.proNumber}/>},
            { key: 'addManager', name: <AddManager key={'addManager'} proNumber={record.proNumber}/> },
            { key: 'delManager', name: <DelManager key={'delManager'} proNumber={record.proNumber}/>},
            { key: 'delPro', name:  <DelPro key={'delPro'} proNumber={record.proNumber} setRefreshPage={setRefreshPage}/>},
            { key: 'changeProName', name:  <ChangeProName key={'changeProName'} proNumber={record.proNumber} setRefreshPage={setRefreshPage}/>},
          ]}
        />,
      ],
    },
  ];

  useEffect(async()=>{
  //获取首页数据
    const hitoken = getCookie('hitoken');
    let pushData = new URLSearchParams();
    pushData.set('Type', 'getProlist');
    pushData.set('hitoken', hitoken);

    HiRequest(pushData, '/cgi-bin/profile.lua').then(data =>{
      const retval = JSON.parse(rsa_decrypt(data.proList));
      //如果为空，则穿空字符串
      if(checkObjEmpty(retval)){
        setProList([]);
      }else{
        setTimeout(()=>{
          setProList(JSON.parse(rsa_decrypt(data.proList)));
        },300)
      }
      //用来触发刷新
      setRefreshPage(false);
    });
  },[refreshPage]);


  return(
      <ProTable<TableListItem>
      rowSelection={{
        //批量选择
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}  
      columns={columns}
      dataSource={proList}
      rowKey="key"
      pagination={{
      showQuickJumper: false,
      }}
      search={false} //关闭上方搜索栏
       ateFormatter="string"
       oolbar={{
       itle: '项目列表',
       ooltip: '所有项目',
      }}
        toolBarRender={(text,record) => [
        <Button key="deletePros" type="primary" className={styles.warningButton}>
          恢复出厂
        </Button>,
        <Button key="deletePros" type="primary" className={styles.warningButton}>
          升级设备
        </Button>,
        // 使用 selectedRowKeys 获取到的刚好是  proNumber，是因为后台获取数据的时候，直接将 key 赋值为 proNumber
        <Button key="deletePros" type="primary" className={styles.warningButton} onClick={multiDelPro.bind(this, record.selectedRowKeys)}>
          批量删除
        </Button>,
        <Button key="reboot" type="primary">
          重启设备
        </Button>,
        <Button key="netsetting" type="primary">
          网络优化
        </Button>,
      ]}
        />
  );
}

export default ProList;
