import  { useState } from 'react'; 
import Web3 from 'web3';

const Wallet = () => {
    const [walletStatus, setWalletStatus] = useState(false);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

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

export default Wallet;
