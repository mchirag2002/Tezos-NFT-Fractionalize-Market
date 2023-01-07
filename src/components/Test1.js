import React, { useState, useEffect } from 'react';
import Test from './Test'
import { useSelector, useDispatch } from 'react-redux';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
    NetworkType,
    BeaconEvent,
    defaultEventCallbacks,
    ColorMode
} from "@airgap/beacon-sdk";

import { fetchData, fetchContractData, _walletConfig } from "../actions";

export const Test1 = () => {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const [Tezos, setTezos] = useState(
        new TezosToolkit("https://ghostnet.smartpy.io/")
    );
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        (async () => {
            const wallet_instance = new BeaconWallet({
                name: "NFT Marketplace",
                preferredNetwork: NetworkType.GHOSTNET,
                colorMode: ColorMode.LIGHT,
                disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
                eventHandlers: {
                    // To keep the pairing alert, we have to add the following default event handlers back
                    [BeaconEvent.PAIR_INIT]: {
                        handler: defaultEventCallbacks.PAIR_INIT
                    },
                    [BeaconEvent.PAIR_SUCCESS]: {
                        handler: data => { return (data.publicKey); }
                    }
                }
            });
            Tezos.setWalletProvider(wallet_instance);
            const activeAccount = await wallet_instance.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet_instance.getPKH();
                const balance = await Tezos.tz.getBalance(userAddress);
                dispatch(_walletConfig(
                    {
                        userAddress: userAddress,
                        balance: balance.toNumber()
                    }));
            }
            setWallet(wallet_instance);
        })();
    }, [Tezos, dispatch]);


    useEffect(() => {
        dispatch(fetchData({ Tezos }));
    }, [Tezos, dispatch]);

    return (
        <div className="ui container">
            <Test Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
        </div>
    )
};
export default Test1;
