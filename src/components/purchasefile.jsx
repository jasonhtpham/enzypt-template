import React, { Component } from 'react';
import { API_URL, NETWORK } from '../config'
import axios from 'axios'
import bnc from 'bnc-assist'

import Web3 from 'web3'
const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/T1YIsUqqHW568dijGClq'
)

class PurchaseFile extends Component {
    state = {
        name: '....',
        price: '....',
        size: '....',
        sellerEthAddress: '....',
        downloads: '....',
        publicKey: null,
        randomString: null,
        fileUrl: this.props.fileUrl,
        dKey: this.props.dKey,
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

    componentDidMount = () => {
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

    purchaseFile = async () => {
        const txObject = {
          value: web3.utils.toWei(this.state.price, 'ether'),
          to: this.state.sellerEthAddress,
          from: this.state.publicKey,
          data: this.state.paymentReference,
          gas: 25000
        }
    
        const { txPromise } = await this.state.assist.Transaction(txObject, null, {
          txRequest: () => `Please confirm the transaction`,
          txSent: () => `Sending transaction`,
          txPending: () =>
            `Purchasing ${this.state.name} for ${this.state.price} ETH`,
          txConfirmed: () => {
            this.setState({ paymentTxReceipt: true })
            return `Purchase complete`
          }
        })
    
        txPromise
          .once('transactionHash', hash => {
            this.setState({ paymentTxHash: hash })
          })
          .once('receipt', receipt => {
            this.setState({ paymentTxReceipt: receipt })
          })
          .on('error', e => this.setState({ errorMsg: 'Payment was rejected' }))
      }

    render() {
        return (
            <div>
                {this.props.filePrice !== 0
                    ?
                    <div>
                        <form className="confirmPurchase">
                            <h3>Do you wish to purchase this file for {this.props.filePrice} ETH? </h3>
                            <input type="button" value="Yes" onClick={() => this.purchaseFile()}/>
                        </form>
                    </div>
                    :
                    <div>
                        <h3> This file is FREE </h3>
                        <input type="button" value="Download" onClick={}/>
                    </div>
                }
            </div>
        );
    }
}
 
export default PurchaseFile;