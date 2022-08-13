import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';

import Container from 'react-bootstrap/Container';
import logo from './assets/images/logo.png';
import staked from './assets/images/staked_nft.png';
import unstaked from './assets/images/unstaked_nft.png';
import walletButton from './assets/images/select_wallet.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const App: FC = () => {
    return (
        <Context>
            <div className="App">
                <Container fluid className='gx-0'>
                    <Row className='gx-0 grad h-25'>
                    <Col className="logo">
                        <img src={logo} className="img-fluid" alt="Logo" />
                    </Col>
                    </Row>
                    <Row className='gx-0 p-5'>
                    <Col className="farmButtons">
                        <img src={staked} alt="staked" />
                        <img src={unstaked} alt="unstaked" />
                    </Col>
                    </Row>
                    <Row className='gx-0'>
                    <Col className="button">
                        <WalletMultiButton className='buds' />
                    </Col>
                    </Row>
                </Container>
            </div>
        </Context>
    );
};

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Select the wallets you wish to support, by instantiating wallet adapters here.
             *
             * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
             * That package supports tree shaking and lazy loading -- only the wallets you import
             * will be compiled into your application, and only the dependencies of wallets that
             * your users connect to will be loaded.
             */
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
