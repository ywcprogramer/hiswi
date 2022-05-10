const selectBintval = [
    {
        value: '100',
        label: '100 ms'
    },
    {
        value: '200',
        label: '200 ms'
    },
    {
        value: '400',
        label: '400 ms'
    },
]

const selectEncryption = [
    {
        value: 'mixed-psk2-ccmp',
        label: 'WPA/WPA2-PSK'
    },
    {
        value: 'psk2-ccmp',
        label: 'WPA2-PSK'
    }, 
    {
        value: 'psk-ccmp',
        label: 'WPA-PSK'
    }, 
    {
        value: 'none',
        label: '无密码'
    },     
]

export {
    selectBintval,
    selectEncryption,
}