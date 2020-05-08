import React, { Component } from 'react';
import FileCard from './filecard';
import { API_URL, NETWORK } from '../config'
import axios from 'axios'
import bnc from 'bnc-assist'

//update image here to give buyers a "sneaky" preview -> put image in media folder first
import file1Preview from "../media/smiling-face.png";

import Web3 from 'web3'
const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/T1YIsUqqHW568dijGClq'
)

class FileCards extends Component {
    //update fileName, fileprice and filepreview here
    //As soon as a complete object is added -> a new filecard will be created
    //Update Enzypt fileUrl to sell your files.
    //fileCards.id increment by 1 for each added fileCard
    state = {
        fileCards: [
            {id:1, fileName:"fileName1", filePrice: 0, filePreview: file1Preview, 
            fileUrl:"https://enzypt.io/EYBizx1ZJZUO1H92ANiLa4PJRGcIiK4g/XvTQPT4lGqiy771u2vZiQe9-1T0TK2ZNTlbkFs0HRzY"},
            
            {id:2, fileName:"fileName2", filePrice: 0.2, filePreview: file1Preview, 
            fileUrl:"https://enzypt.io/yQoUSuMNqL4S64NYI2D4tMgieRQwBgRC/JpkNdS8arNcBA7k3F_-yWnEUqw8YkOrMk1Z2Ka2XuXk"}
        ],
        name: '....',
        price: '....',
        size: '....',
        sellerEthAddress: '....',
        downloads: '....',
        publicKey: null,
        randomString: null,
        fileUrl: '...',
        dKey: null,
        iv: null,
        metaFileHash: null,
        installMetamask: false,
        wrongNetwork: false,
        paymentReference: '',
        paymentTxReceipt: '',
        downloadPercent: 0,
        color: '#ff71ce',
        zipFileHash: null,
        errorMsg: '',
        assist: null
    }

    handleBuy = async (fileCard) => {
        // if (fileCard === 0) {
        //     console.log("Download", fileCard);
        // } else {
        //     console.log("Purchase", fileCard);
        // }
        // const result = this.setFileUrlAndDkey();

        const urlParts = fileCard.fileUrl.split('/');

        this.setState({fileUrl: urlParts[3], dKey: urlParts[4]}, this.test)
    }

    test = () => {
        this.getMetaFileHash()
    }

    getMetaFileHash = async () => {
        const result = await axios.get(API_URL + '/' + this.state.fileUrl)
    
        this.setState({
          metaFileHash: result.data.metaFileHash,
          iv: result.data.iv,
          downloads: result.data.downloads
        })
    
        // now that we have the meta file hash we can go get it and decrypt it
        const decrypted = await this.getAndDecryptFile(
          this.state.metaFileHash,
          'meta'
        )
        const textDecoder = new TextDecoder('utf-8')
        const decoded = textDecoder.decode(decrypted)
        const fileMeta = JSON.parse(decoded)
        this.setState({
          name: fileMeta.name,
          price: fileMeta.price,
          size: fileMeta.totalFileSize,
          sellerEthAddress: fileMeta.sellerEthAddress,
          files: fileMeta.files
        })
        if (result.data.zipFileHash) {
          this.setState({
            paymentReference: true,
            paymentTxHash: true,
            paymentTxReceipt: true,
            zipFileHash: result.data.zipFileHash
          })
        } else {
          this.getMetamaskAccount()
          this.checkIfMainnet()
        }
        console.log(this.state.zipFileHash)
    }

    getMetamaskAccount = async () => {
        const assist = bnc.init({
          dappId: '61db946a-6060-4cdc-b9a2-8718de184eec',
          networkId: NETWORK,
          web3: web3,
          style: {
            darkMode: true
          }
        })
    
        this.setState({
          assist: assist
        })
    
        try {
          await assist.onboard()
        } catch (e) {
          console.log(e)
        }
    
        let accounts
        if (window.ethereum) {
          accounts = await window.ethereum.enable()
        }
    
        if (window.web3 && web3.currentProvider) {
          accounts = await web3.eth.getAccounts()
        }
    
        if (accounts[0]) {
          this.setState(
            {
              installMetamask: false,
              publicKey: accounts[0].toLowerCase()
            },
            () => this.getRandomString(this.state.publicKey)
          )
          return
        } else {
          this.setState({ installMetamask: true })
        }
    
        setTimeout(this.getMetamaskAccount, 500)
    }

    getRandomString = async _ethAddress => {
        const randomString = await axios.post(API_URL + '/rand', {
          publicKey: _ethAddress
        })
        this.setState({ randomString: randomString.data })
    }
    
    checkIfMainnet = async () => {
        const { wrongNetwork } = this.state
        if (web3.eth && web3.eth.net.getId) {
          const networkId = await web3.eth.net.getId()
          if (networkId !== NETWORK) {
            this.setState({
              wrongNetwork: true
            })
          } else if (wrongNetwork) {
            this.setState({ wrongNetwork: false })
          }
        }
        setTimeout(this.checkIfMainnet, 5000)
    }
    
    getAndDecryptFile = async (_fileHash, meta) => {
        // go get it from IPFS
        const result = await axios({
          method: 'get',
          url: 'https://ipfs.enzypt.io/ipfs/' + _fileHash,
          responseType: 'arraybuffer',
          onDownloadProgress: meta
            ? null
            : event => {
                let percentCompleted = Math.floor(
                  event.loaded / (event.total / 100)
                )
                if (percentCompleted === 99) {
                  percentCompleted = 100
                }
                this.setState({
                  downloadPercent: percentCompleted
                })
              }
        })
        let decrypted = await this.decryptFile(result.data)
        return decrypted
    }
    
    decryptFile = async _encryptedData => {
        // decrypt any file given the data
        const fileBuffer = new Buffer(_encryptedData)
        const dKey = {
          alg: 'A256CBC',
          ext: true,
          k: this.state.dKey,
          key_ops: ['encrypt', 'decrypt'],
          kty: 'oct'
        }
        const iv = new Uint8Array(16)
        for (let index in this.state.iv) {
          iv[index] = this.state.iv[index]
        }
        const algo = { name: 'AES-CBC', iv: iv }
        try {
          const key = await crypto.subtle.importKey('jwk', dKey, algo, true, [
            'encrypt',
            'decrypt'
          ])
          let decrypted = await crypto.subtle.decrypt(algo, key, fileBuffer)
          return decrypted
        } catch (e) {
          alert(e.toString())
        }
    }

    render() { 
        return (
            <div>
                {this.state.fileCards.map(fileCard => (
                    <FileCard
                    key={fileCard.id}
                    fileCard={fileCard}
                    onBuy={this.handleBuy}
                    />
                ))}
            </div>
        );
    }
    
}
 
export default FileCards;