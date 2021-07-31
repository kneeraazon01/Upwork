import React from "react";
import btdmdLogoSmall from "../../img/btdmd-logo-small.svg";
import promoImg from "../../img/bg/promo.webp";
import aboutImg from "../../img/bg/about.webp";
import CommonButton from "../../common/CommonButton";
import MissionCard from "./MissionCard";
import InfoBlockCard from "./InfoBlockCard";
import Container from "../../components/Container";

const missions = [
  {
    title: "Engage",
    info: "Deliver innovative and engaging applications",
    missionId: "firstMissionItem",
    key: "firstMissionItem",
  },
  {
    title: "Expand",
    info: "Broaden the reach of BitDiamond, adding dapps and tokens",
    missionId: "secondMissionItem",
    key: "secondMissionItem",
  },
  {
    title: "Educate",
    info: "Explain the less understood aspects of crypto and decentralised finance",
    missionId: "thirdMissionItem",
    key: "thirdMissionItem",
  },
];

const tokenBlocks = [
  [
    [
      {
        isComingSoon: false,
        subTittle: "BitDiamond BTDMD",
        cardId: "1block",
        content: (
          <>
            <br />
            Our main diamond and platform utility token. Non-custodial staking:
            a 4% tax is taken from all trasactions and distribu ted to holders.
            Hold Bit Diamond to get benefits across our Platform.Stake
            BitDiamondto sncrease those benefits.
            <br />
            <br />A BEP-20 token on Binance Smart Chain
          </>
        ),
      },
      {
        isComingSoon: false,
        subTittle: "BitDiamond Community",
        cardId: "2block",
        content: (
          <>
            <br />
            A Collection of seven NFTs issued to our supporters andcommunity
            members. These tokens respesent both rankin our community and also
            deliver benefits across the platform.
            <br />
            <br />A collection of BEP-721 NFTs on Binance Smart Chain
          </>
        ),
      },
    ],
    [
      {
        isComingSoon: false,
        subTittle: "BitDiamond Treasure BTDTRS",
        cardId: "3block",
        content: (
          <>
            <br />
            Unigue NFTs minted in our TreasureHunt game. Collect all nine
            Ultimate NFTs to claim the treasure hunt grand prize, 1 000 000
            BTDMD. Bounty prizes to be won every day.
            <br />
            <br />A BEP-721 NFT on Binance Smart Chain
          </>
        ),
      },
      {
        isComingSoon: false,
        subTittle: "BitDiamondART BTDART",
        cardId: "4block",
        content: (
          <>
            <br />
            Our very own NFT for people tu use in minting their own works of
            art. Minting yuor own NFTs on BitDiamond is completely free, all you
            pay the gas.
            <br />
            <br />A BEP-721 NFTs on Binance Smart Chain
          </>
        ),
      },
    ],
  ],
  [
    [
      {
        isComingSoon: false,
        subTittle: "BitDiamondClime BTDCLM",
        cardId: "5block",
        content: (
          <>
            <br />
            A very special token indeed! You can only mint a claim token when
            you are eligible for a grand prize, like BitDiamondTrove. This token
            confirms your claime in the best way possible - in the immutable
            blockchain!
            <br />
            <br />A BEP-721 NFT on Binance Smart Chain
          </>
        ),
      },
      {
        isComingSoon: false,
        subTittle: "BitDiamondBounty BTDBNT",
        cardId: "6block",
        content: (
          <>
            <br />
            These tokens control the daily bounty prizes offered in our treasure
            hunt game. If you have a truasure token that matches you are able to
            clime your prize through our fully avtonomous Bounty dapp.
            <br />
            <br />A BEP-721 NFT on Binance Smart Chain
          </>
        ),
      },
    ],
    [
      {
        isComingSoon: false,
        subTittle: "BitDiamondTrove BTDTRV",
        cardId: "7block",
        content: (
          <>
            <br />
            These tokens control the Trove, our grand prize for the treasure
            hunt blockchain game. If you have a treasure tokens that matches you
            are to submit a claim for the Trove.
            <br />
            <br />A BEP-20 NFT on Binance Smart Chain
          </>
        ),
      },
      {
        isComingSoon: false,
        subTittle: "BitDiamondRewards",
        cardId: "8block",
        content: (
          <>
            <br />
            Periodic standalone NFT rewards like the genesls token BTDGEN.
            <br />
            <br />A BEP-721 NFT on Binance Smart Chain
          </>
        ),
      },
    ],
  ],
];

const dappsBlocks = [
  [
    {
      isComingSoon: false,
      subTittle: "Treasure",
      cardId: "",
      content: (
        <>
          <br />
          Take part in the BitDiamond TreasureHunt. Mint unique NFTs with castom
          made art. Each NFT will have set of characteristics withs over 12 000
          possible combinations. Match an item in today s bounty for an instant
          BNB prize.
        </>
      ),
    },
    {
      isComingSoon: false,
      subTittle: "Bounty",
      cardId: "",
      content: (
        <>
          <br />
          Match an item in your treasure bax to a bounty item to win an instant
          BNB prize. There will be five bounty items every day, check daily for
          your chance to win.
        </>
      ),
    },
    {
      isComingSoon: true,
      subTittle: "Staking",
      cardId: "",
      content: (
        <>
          <br />
          Stake your BitDiamond in the mine to earn increased benefits on the
          platforms.
        </>
      ),
    },
  ],
  [
    {
      isComingSoon: false,
      subTittle: "Trove",
      cardId: "",
      content: (
        <>
          <br />
          Match all the items in the Trove to win our grand prize. If you have
          all nine Ultimate BitDiamonds submit your claim!
        </>
      ),
    },
    {
      isComingSoon: false,
      subTittle: "Gems",
      cardId: "",
      content: (
        <>
          <br />
          Mint your own NFTs and view any NFTs you already own, including
          community tokens, rewards and treasure items.
        </>
      ),
    },
    {
      isComingSoon: true,
      subTittle: "MarketPlace",
      cardId: "",
      content: (
        <>
          <br />
          Put your own NFTs up for sale, trade items with other embers ( useful
          if you are looking to claime the Trove ) and also purchasepower ups
          for use in the Treasure dapp.
        </>
      ),
    },
  ],
];

const webAppItems = [
  {
    isComingSoon: false,
    subTittle: "Website",
    cardId: "",
    content: (
      <>
        <br />
        btdmd.com
        <br />
        Access every part of the BitDiamond Universe
      </>
    ),
  },
  {
    isComingSoon: false,
    subTittle: "Merch",
    cardId: "",
    content: (
      <>
        <br />
        merch.btdmd.com
        <br />
        Load up on BitDiamond gear for you and your whole family
      </>
    ),
  },
  {
    isComingSoon: false,
    subTittle: "Blog",
    cardId: "",
    content: (
      <>
        <br />
        blog.btdmd.com
        <br />
        Keep up with the latest developments
      </>
    ),
  },
];

const MainPage = () => {
  return (
    <>
      <div className="promo">
        <div className="promo__info">
          <h1 className="promo__title">
            BitDiam <img src={btdmdLogoSmall} alt="logo" /> nd
          </h1>
          <div className="info">
            Revolutionary ecosystem of TOKENS and DAPPS on Binance Smart Chain
          </div>
          <CommonButton
            className="btn"
            onClick={() =>
              window.open(
                "https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x669288ada63ed65eb3770f1c9eeb8956dedaaa47",
                "_blank"
              )
            }
          >
            Buy
          </CommonButton>
        </div>

        <div className="promo__img">
          <img src={promoImg} alt="#" />
        </div>
      </div>

      <div className="mission">
        <div className="mission__title anim-items">BitDiamond mission</div>
        <div className="mission__items">
          {missions.map((mission) => (
            <MissionCard {...mission} />
          ))}
        </div>
      </div>

      <div className="about">
        <div className="about__img">
          <img src={aboutImg} alt="#" className="img" />
        </div>
        <div className="about__info">
          <div>
            <div className="title anim-items">About BitDiamond</div>
            <div className="info anim-items one-time-animation">
              The BitDiamond team is development led. We are a team of builders
              and will keep expanding the reach of our platform. Our ecosystem
              currently encompasses one BEP-20 token, nine BEP-721 NFTs, three
              dapps, our website, merch store and blog. And we have more in the
              pipeline.
              <br />
              <br />
              Please take some time to explore our ecosystem, and also engage
              with our community on telegram, twitter and discord. It’s great to
              have you here with us. If you have any questions please reach out,
              we are always happy to talk.
            </div>
          </div>
        </div>
      </div>

      <div className="facts">
        <div className="facts__title anim-items">BitDiamond Universe</div>
        <div className="facts__subtitle anim-items">Tokens</div>
        <div className="facts__blocks">
          {tokenBlocks.map((block, i) => (
            <div className="block" key={i}>
              {block.map((items, i) => (
                <div className="items" key={i}>
                  {items.map(({ content, ...rest }) => (
                    <InfoBlockCard {...rest} key={rest.subTittle}>
                      {content}
                    </InfoBlockCard>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="dapps">
        <div className="dapps__title anim-items">dapps</div>
        <div className="dapps__blocks">
          {dappsBlocks.map((block, i) => (
            <div className="block" key={i}>
              {block.map(({ content, ...rest }) => (
                <InfoBlockCard {...rest} key={rest.subTittle}>
                  {content}
                </InfoBlockCard>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="web-apps">
        <div className="web-apps__title anim-items">WEB APPS</div>
        <div className="web-apps__items">
          {webAppItems.map(({ content, ...rest }) => (
            <InfoBlockCard {...rest} key={rest.subTittle}>
              {content}
            </InfoBlockCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
