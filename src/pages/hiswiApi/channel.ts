const channel24 = [
    {
        value: 0,
        label: '自动'
    },
    {
        value: 1,
        label: '1 (2412 MHz)'
    },
    {
        value: 2,
        label: '2 (2417 MHz)'
    },
    {
        value: 3,
        label: '3 (2422 MHz)'
    },
    {
        value: 4,
        label: '4 (2427 MHz)'
    },
    {
        value: 5,
        label: '5 (2432 MHz)'
    },
    {
        value: 6,
        label: '6 (2437 MHz)'
    },
    {
        value: 7,
        label: '7 (2442 MHz)'
    },
    {
        value: 8,
        label: '8 (2447 MHz)'
    },
    {
        value: 9,
        label: '9 (2452 MHz)'
    },
    {
        value: 10,
        label: '10 (2457 MHz)'
    },
    {
        value: 11,
        label: '11 (2462 MHz)'
    },
    {
        value: 12,
        label: '12 (2467 MHz)'
    },
    {
        value: 13,
        label: '13 (2472 MHz)'
    }
]

const channel58 = [
    {
        value: 0,
        label: '自动'
    },
    {
        value: 36,
        label: '36 (5180 MHz)'
    },
    {
        value: 40,
        label: '40 (5200 MHz)'
    },
    {
        value: 44,
        label: '44 (5220 MHz)'
    },
    {
        value: 48,
        label: '48 (5240 MHz)'
    },
    {
        value: 52,
        label: '52 (5260 MHz)'
    },
    {
        value: 56,
        label: '56 (5280 MHz)'
    },
    {
        value: 60,
        label: '60 (5300 MHz)'
    },
    {
        value: 64,
        label: '64 (5320 MHz)'
    },
    {
        value: 149,
        label: '149 (5745 MHz)'
    },
    {
        value: 153,
        label: '153 (5765 MHz)'
    },
    {
        value: 157,
        label: '157 (5785 MHz)'
    },
    {
        value: 161,
        label: '161 (5805 MHz)'
    },
    {
        value: 165,
        label: '165 (5825 MHz)'
    }
]

const htmode24 = [
    {
        value: 'HT20',
        label: '20 MHz'
    },
    {
        value: 'HT40',
        label: '40 MHz'
    }
]

const htmode58 = [
    {
        value: 'HT20',
        label: '20 MHz'
    },
    {
        value: 'HT40',
        label: '40 MHz'
    },
    {
        value: 'HT80',
        label: '80 MHz'
    },
    {
        value: 'VHT160',
        label: '160 MHz'
    }
]

// 发射功率
const txpowerMarks24 ={
  1: '1%',
  5.25: '25%',
  10.5: '50%',
  15.75: '75%',
  21:'100%'
}

const txpowerMarks58 ={
  1: '1%',
  6.75:'25%',
  13.5:'50%',
  20.25:'75%',
  27: '100%',
}

//加密方式
const ency = [
  {value:'none', label:'无密码'},
  {value:'mixd-psk2-ccmp', label:'WPA/WPA2-PSK'},
  {value:'psk2-ccmp', label:'WPA2-PSK'},
  {value:'psk-ccmp', label:'WPA-PSK'}
]

export {
  txpowerMarks24,
  txpowerMarks58,
  channel24,
  channel58,
  htmode24,
  htmode58,
  ency
}
