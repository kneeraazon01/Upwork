import React, { useState, useEffect, createContext } from 'react';
import "web3/dist/web3.min.js"
import Moralis from 'moralis/dist/moralis.js';

const mockItems = [{
  category: 'CSADSA',
    image:'Community/BTDPRO_0',
      "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
      "tokenId": "6",
      "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
      "symbol": "BTDBNT",
      "tokenData": {
          "name": "BitDiamond Treasure",
          "description": "Magical, Crown, Red, Round, 1, A",
          "image": "https://treasure.btdmd.com/MCRR1A.png",
          "class": "MCRR1A",
          "Power": "Magical",
          "Setting": "Crown",
          "Color": "Red",
          "Cut": "Round",
          "Carat": "1",
          "Clarity": "A",
          "Prize": "2BNB",
          "Label": "MCRR1A - 2BNB"
      }
  
},
{
category: 'CSADSA',
  image:'Community/BTDPRO_0',
    "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
    "tokenId": "6",
    "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
    "symbol": "BTDBNT",
    "tokenData": {
        "name": "BitDiamond Treasure",
        "description": "Magical, Crown, Red, Round, 1, A",
        "image": "https://treasure.btdmd.com/MCRR1A.png",
        "class": "MCRR1A",
        "Power": "Magical",
        "Setting": "Crown",
        "Color": "Red",
        "Cut": "Round",
        "Carat": "1",
        "Clarity": "A",
        "Prize": "2BNB",
        "Label": "MCRR1A - 2BNB"
    }

},
{
category: 'CSADSA',
image:'Community/BTDPRO_0',
  "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
  "tokenId": "6",
  "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
  "symbol": "BTDBNT",
  "tokenData": {
      "name": "BitDiamond Treasure",
      "description": "Magical, Crown, Red, Round, 1, A",
      "image": "https://treasure.btdmd.com/MCRR1A.png",
      "class": "MCRR1A",
      "Power": "Magical",
      "Setting": "Crown",
      "Color": "Red",
      "Cut": "Round",
      "Carat": "1",
      "Clarity": "A",
      "Prize": "2BNB",
      "Label": "MCRR1A - 2BNB"
  }

},
{
category: 'CSADSA',
image:'Community/BTDPRO_0',
  "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
  "tokenId": "6",
  "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
  "symbol": "BTDBNT",
  "tokenData": {
      "name": "BitDiamond Treasure",
      "description": "Magical, Crown, Red, Round, 1, A",
      "image": "https://treasure.btdmd.com/MCRR1A.png",
      "class": "MCRR1A",
      "Power": "Magical",
      "Setting": "Crown",
      "Color": "Red",
      "Cut": "Round",
      "Carat": "1",
      "Clarity": "A",
      "Prize": "2BNB",
      "Label": "MCRR1A - 2BNB"
  }

},
{
category: 'CSADSA',
image:'Community/BTDPRO_0',
  "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
  "tokenId": "6",
  "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
  "symbol": "BTDBNT",
  "tokenData": {
      "name": "BitDiamond Treasure",
      "description": "Magical, Crown, Red, Round, 1, A",
      "image": "https://treasure.btdmd.com/MCRR1A.png",
      "class": "MCRR1A",
      "Power": "Magical",
      "Setting": "Crown",
      "Color": "Red",
      "Cut": "Round",
      "Carat": "1",
      "Clarity": "A",
      "Prize": "2BNB",
      "Label": "MCRR1A - 2BNB"
  }

},
{
category: 'CSADSA',
image:'Community/BTDPRO_0',
  "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
  "tokenId": "6",
  "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
  "symbol": "BTDBNT",
  "tokenData": {
      "name": "BitDiamond Treasure",
      "description": "Magical, Crown, Red, Round, 1, A",
      "image": "https://treasure.btdmd.com/MCRR1A.png",
      "class": "MCRR1A",
      "Power": "Magical",
      "Setting": "Crown",
      "Color": "Red",
      "Cut": "Round",
      "Carat": "1",
      "Clarity": "A",
      "Prize": "2BNB",
      "Label": "MCRR1A - 2BNB"
  }

},{
category: 'CSADSA',
image:'Community/BTDPRO_0',
  "tokenObjectId": "Wor3FlkZ1gRC62Ay8OZeTUHs",
  "tokenId": "6",
  "tokenAddress": "0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b",
  "symbol": "BTDBNT",
  "tokenData": {
      "name": "BitDiamond Treasure",
      "description": "Magical, Crown, Red, Round, 1, A",
      "image": "https://treasure.btdmd.com/MCRR1A.png",
      "class": "MCRR1A",
      "Power": "Magical",
      "Setting": "Crown",
      "Color": "Red",
      "Cut": "Round",
      "Carat": "1",
      "Clarity": "A",
      "Prize": "2BNB",
      "Label": "MCRR1A - 2BNB"
  }

}
]

export const MoralisContext = createContext();

export const MoralisProvider = props => {
    const [moralis, setMoralis] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [userAvatar, setUserAvatar] = useState(undefined);
    const [loggingIn, setLoggingIn] = useState(false);
    const [modifierItems, setModifierItems] = useState([]);
    const [fetchingModifier, setFetchingModifier] = useState(true);

    useEffect(async () => {
        const moralisURL = 'https://txrxagiqjwro.moralis.io:2053/server';
        const moralisAppId = '3WhVH6HQBJGupqboem3Pr6q9oHDagjYGo3LfDLJs';
        Moralis.initialize(moralisAppId);
        Moralis.serverURL = moralisURL
        const user = Moralis.User.current();
        if (user) {
          const avatar = user.get('avatar');
          if (avatar) {
            setUserAvatar(avatar.url());
          }
          setUser(user);
        }
        setMoralis(Moralis);
    }, [])

    const fetchModifierItems = async() => {
        try {
            const response = await moralis.Cloud.run("getModifierItems")
            // setModifierItems(mockItems)
            setModifierItems(response)
        } catch (error) {
          console.log(error);
        } finally {
            setFetchingModifier(false)
        }
    }

    useEffect(async () => {
        if (!moralis) return

        fetchModifierItems();
        return fetchModifierItems
    }, [moralis])

    return (
        <MoralisContext.Provider value={{moralis, user, userAvatar, setUser, loggingIn, setLoggingIn, modifierItems, fetchingModifier, fetchModifierItems}}>
            {props.children}
        </MoralisContext.Provider>
    );
}
