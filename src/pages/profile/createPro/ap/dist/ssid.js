"use strict";
exports.__esModule = true;
var react_1 = require("react");
var pro_form_1 = require("@ant-design/pro-form");
var channel_1 = require("@/pages/hiswiApi/channel");
function Ssid(props) {
    var name = props.name, form = props.form;
    var Name_disabled = props.name + '_disabled';
    var Name_ssid = props.name + '_ssid';
    var Name_encryption = props.name + '_encryption';
    var Name_key = props.name + '_key';
    var disabled = false;
    var ssid = 'WiFi1';
    var encryption = 'none';
    var mykey = '';
    switch (name) {
        case 'vap2g1':
        case 'vap5g1':
            ssid = 'WiFi1';
            disabled = true;
            encryption = 'none';
            mykey = '';
            break;
        case 'vap2g2':
        case 'vap5g2':
            ssid = 'WiFi2';
            disabled = false;
            encryption = 'none';
            mykey = '';
            break;
        case 'vap2g3':
        case 'vap5g3':
            ssid = 'WiFi3';
            disabled = false;
            encryption = 'none';
            mykey = '';
            break;
        case 'vap2g4':
        case 'vap5g4':
            ssid = 'WiFi4';
            disabled = false;
            encryption = 'none';
            mykey = '';
            break;
        default:
            break;
    }
    //setTimeout防止未渲染完成
    setTimeout(function () {
        var _a;
        if (typeof (form) !== 'undefined') {
            form.setFieldsValue((_a = {},
                _a[Name_disabled] = disabled,
                _a[Name_ssid] = ssid,
                _a[Name_encryption] = encryption,
                _a[Name_key] = mykey,
                _a));
        }
    }, 100);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(pro_form_1["default"].Group, null,
            react_1["default"].createElement(pro_form_1.ProFormSwitch, { name: Name_disabled, label: "SSID\u5F00\u5173" }),
            react_1["default"].createElement(pro_form_1.ProFormText, { width: "md", name: Name_ssid, label: "SSID", tooltip: "\u4E0D\u5F97\u8D85\u8FC732\u4E2A\u5B57\u7B26\uFF0C1\u4E2A\u4E2D\u6587\u5B57\u7B26=3\u4E2A\u82F1\u6587\u5B57\u7B26" })),
        react_1["default"].createElement(pro_form_1["default"].Group, null,
            react_1["default"].createElement(pro_form_1.ProFormSelect, { name: Name_encryption, label: "\u52A0\u5BC6\u65B9\u5F0F", width: 'md', options: channel_1.ency }),
            react_1["default"].createElement(pro_form_1.ProFormText, { width: "md", name: Name_key, label: "\u65E0\u7EBF\u5BC6\u7801", tooltip: "\u4E0D\u5F97\u8D85\u8FC732\u4E2A\u5B57\u7B26" })))) /*<ProCard*/;
    { /*<ProCard*/ }
    { /*  tabs={{*/ }
    { /*    tabPosition,*/ }
    { /*    activeKey: tab,*/ }
    { /*    onChange: (key) => {*/ }
    { /*      setTab(key);*/ }
    { /*    },*/ }
    { /*  }}*/ }
    { /*  // title={'快速设置'}*/ }
    { /*>*/ }
    { /*<ProCard.TabPane key="2.4G" tab={<span style={{fontSize:18,fontWeight:'bold'}}><WifiOutlined spin={false} style={{fontSize:24,color:'#0089ff'}}/>2.4 G</span>}>*/ }
    { /*  <Configs name={'2.4G'} />*/ }
    { /*</ProCard.TabPane>*/ }
    { /*<ProCard.TabPane key="5G" tab={<span style={{fontSize:18,fontWeight:'bold'}}><WifiOutlined spin={false}  style={{fontSize:24,color:'#0089ff'}}/>5 G</span>} >*/ }
    { /*  <Configs name={'5G'}/>*/ }
    { /*</ProCard.TabPane>*/ }
    { /*</ProCard>*/ }
    ;
}
;
exports["default"] = Ssid;
