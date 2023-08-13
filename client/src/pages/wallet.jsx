import { useState } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import Abi from "../../ABI.json"
const Wallet = ({ saveState }) => {
    const [walletStatus, setWalletStatus] = useState(false);
    const navigateTo = useNavigate();

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                const contractAddress = "0x565bf6e1733f420e3141e74fa74e872a8167b2da";
                const contract = new web3.eth.Contract(Abi, contractAddress)
                saveState(web3,accounts[0],contract)
                navigateTo('viewTasks')

                if (accounts.length > 0) {
                    setWalletStatus(true);
                }

                console.log(web3, accounts);
            } else {
                alert('Please install Metamask first!');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button onClick={connectWallet}>
            {walletStatus ? 'Connected' : 'Connect Wallet'}
        </button>
    );
};

Wallet.propTypes = {
    saveState: PropTypes.func,
};


export default Wallet;
