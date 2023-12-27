import CryptoJS from 'crypto-js'
const iv= CryptoJS.lib.WordArray.random(16)
export const encryptData = (data, encryptionKey) =>{
    const jsonString = JSON.stringify(data)
    return CryptoJS.AES.encrypt(jsonString,encryptionKey,{iv}).toString();
}

export const decryptData = (encryptedData,encryptionKey) =>{
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData,encryptionKey,{iv})
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedString)
}
