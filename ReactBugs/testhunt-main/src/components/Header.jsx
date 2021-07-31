import React, { useContext, useEffect, useState, useRef } from "react";
import { BitDiamondLogo, BitDiamondLogoSmall } from "./SVGCollection";
import UserPortrait from "./UserPortrait";
import CommonButton from "../common/CommonButton";
import HeaderSliderButton from "./HeaderSliderButton";
import HeaderSliderMobileButton from "./HeaderSliderMobileButton";
import { MoralisContext } from "../context/MoralisContext";
import * as Gems from "../utils/gemsintegration";
import PopupModal from "../common/PopupModal";
import Moralis from "moralis/dist/moralis.js";

function readURL(input, setImg) {
  if (input?.files && input?.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      setImg(e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

const UserInfoModal = ({
  isActive,
  onClose = () => {},
  onLogout = () => {},
  setUserInfo = () => {},
  user,
  userInfo = {},
}) => {
  const userAvatarInputRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [userName, setUserName] = useState(userInfo.username || "");
  const [userEmail, setUserEmail] = useState(userInfo.email || "");

  async function saveUserInfo() {
    user.set("email", userEmail);
    user.set("username", userName);

    let avatar;
    if (userAvatarInputRef.current.files.length > 0) {
      avatar = new Moralis.File(
        "avatar1.jpg",
        userAvatarInputRef.current.files[0]
      );
      user.set("avatar", avatar);
    }

    if (avatarSrc) {
      setUserInfo("userAvatarImg", avatarSrc);
    }

    onClose();
    await user.save();
    alert("User info saved successfully!");
  }

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <PopupModal
      isActive={isActive}
      onClose={onClose}
      footerContent={
        <>
          <CommonButton onClick={handleLogout}>Log out</CommonButton>
          <CommonButton onClick={saveUserInfo}>Save</CommonButton>
        </>
      }
    >
      <div className="newd__modal__container__header">
        <h5 className="modal-title">User Profile</h5>
        <div className="newd__modal__container__header__form_group">
          <label htmlFor="txtUsername">Username</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.currentTarget.value)}
            value={userName}
            className="form-control"
            id="txtUsername"
            required
            // placeholder='Enter username'
          />
        </div>

        <div className="newd__modal__container__header__form_group">
          <label htmlFor="txtEmail">Email address</label>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.currentTarget.value)}
            type="email"
            className="form-control"
            id="txtEmail"
            aria-describedby="emailHelp"
            // placeholder='Enter email'
          />
        </div>
        <div className="newd__modal__container__header__form_group">
          {avatarSrc || userInfo.userAvatarImg ? (
            <img
              width="50"
              height="50"
              src={avatarSrc || userInfo.userAvatarImg}
              id="imgAvatar"
              alt="User Avatar"
            />
          ) : (
            <UserPortrait />
          )}

          <label htmlFor="fileAvatar" className="custom-file-upload">
            Select Avatar
          </label>
          <input
            ref={userAvatarInputRef}
            type="file"
            size="60"
            className="form-control-file"
            id="fileAvatar"
            onChange={(e) => readURL(e.currentTarget, setAvatarSrc)}
          />
        </div>
      </div>
    </PopupModal>
  );
};

const CreateItemModal = ({
  isActive,
  onClose = () => {},
  user,
  userInfo = {},
}) => {
  const itemImageInputRef = useRef(null);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");

  const createItemFile = itemImageInputRef.current;

  const canCreate = createItemFile?.files?.length && itemName.length;

  async function createItem() {
    if (createItemFile.files.length == 0) {
      alert("Please select a file!");
      return;
    } else if (itemName.length == 0) {
      alert("Please give the item a name!");
      return;
    }

    const nftFile = new Moralis.File("nftFile.jpg", createItemFile.files[0]);
    await nftFile.saveIPFS();

    const nftFilePath = nftFile.ipfs();

    const metadata = {
      name: itemName,
      description: itemDescription,
      image: nftFilePath,
    };

    const nftFileMetadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await nftFileMetadataFile.saveIPFS();

    const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();

    const nftId = await Gems.mintNft(nftFileMetadataFilePath, Moralis);

    const user = await Moralis.User.current();
    const userAddress = user.get("ethAddress");

    alert("Minting call made! Your NFT will appear in your items shortly.");

    setItemName("");
    setItemDescription("");
  }

  return (
    <PopupModal
      isActive={isActive}
      onClose={onClose}
      footerContent={
        <>
          <CommonButton onClick={createItem} disabled={!canCreate}>
            Create!
          </CommonButton>
        </>
      }
    >
      <div className="newd__modal__container__header">
        <h5 className="modal-title">Create Item</h5>
        <div className="newd__modal__container__header__form_group">
          <label htmlFor="txtUsername">Name</label>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.currentTarget.value)}
            type="text"
            className="form-control"
            id="txtCreateItemName"
            required
            // placeholder='Enter name'
          />
        </div>

        <div className="newd__modal__container__header__form_group">
          <label htmlFor="txtCreateItemDescription">Description</label>
          <textarea
            value={itemDescription}
            onChange={(e) => setItemDescription(e.currentTarget.value)}
            className="form-control"
            id="txtCreateItemDescription"
            cols="25"
            rows="5"
            // placeholder='Enter description'
          ></textarea>
        </div>
        <div className="newd__modal__container__header__form_group">
          {avatarSrc ? (
            <img
              width="50"
              height="50"
              src={avatarSrc}
              id="imgAvatar"
              alt="User Avatar"
            />
          ) : (
            "Item Image"
          )}
          <label htmlFor="fileCreateItemFile" className="custom-file-upload">
            Select file
          </label>
          <input
            ref={itemImageInputRef}
            type="file"
            onChange={(e) => readURL(e.currentTarget, setAvatarSrc)}
            size="60"
            className="form-control-file"
            id="fileCreateItemFile"
          />
        </div>
      </div>
    </PopupModal>
  );
};

const UserItem = ({
  item,
  isItemForSale = false,
  handleBuyItem = () => {},
}) => {
  return (
    <div className="newd___user_item__container">
      {isItemForSale && item.sellerAvatar && (
        <img
          width="50"
          height="50"
          src={item.sellerAvatar.url()}
          alt={item.sellerUsername}
        />
      )}
      <img width="50" height="50" src={item.image} alt={item.name} />
      <h5>{item.name}</h5>
      <p>{item.description}</p>
      {isItemForSale && (
        <CommonButton onClick={() => handleBuyItem(item)}>
          {`Buy htmlFor ${item.askingPrice}`}
        </CommonButton>
      )}
    </div>
  );
};

const UserItemsModal = ({
  isActive,
  onClose = () => {},
  user,
  userInfo = {},
}) => {
  const [items, setItems] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);

  const getItemData = async (item) => {
    try {
      const res = await fetch(item.tokenUri);
      const { data } = res.json();

      return data;
    } catch (error) {
      alert(error);
    }
  };
  async function reloadItems() {
    try {
      const items = await Moralis.Cloud.run("getItems");
      const ownedItems = await Moralis.Cloud.run("getUserItems");

      const itemsReq = await Promise.all(items.map((itm) => getItemData(itm)));
      const ownedItemsReq = await Promise.all(
        ownedItems.map((itm) => getItemData(itm))
      );

      setItems(itemsReq);
      setOwnedItems(ownedItemsReq);
    } catch (error) {
      alert(error);
    }
  }

  const handleBuyItem = async (item) => {
    await Gems.buyItem(item, Moralis);
    await reloadItems();
  };

  useEffect(() => {
    async function loadItems() {
      try {
        const items = await Moralis.Cloud.run("getItems");
        const ownedItems = await Moralis.Cloud.run("getUserItems");

        const itemsReq = await Promise.all(
          items.map((itm) => getItemData(itm))
        );
        const ownedItemsReq = await Promise.all(
          ownedItems.map((itm) => getItemData(itm))
        );

        setItems(itemsReq);
        setOwnedItems(ownedItemsReq);
      } catch (error) {
        alert(error);
      }
    }

    loadItems();

    return loadItems;
  }, []);

  return (
    <PopupModal isActive={isActive} onClose={onClose} okLabel={"Close"}>
      <div className="newd__modal__container__header">
        <h5 className="modal-title">My Items</h5>
        <div
          className="modal-body row row-cols-1 row-cols-md-4 mt-5"
          id="userItemsList"
        >
          {items.map((item) => (
            <UserItem
              item={item}
              key={`item-${item.uid}`}
              isItemForSale={true}
              handleBuyItem={handleBuyItem}
            />
          ))}
          {ownedItems.map((item) => (
            <UserItem item={item} key={`item-${item.uid}`} />
          ))}
        </div>
      </div>
    </PopupModal>
  );
};

const Header = () => {
  const { moralis, user, userAvatar, setUser, setLoggingIn } =
    useContext(MoralisContext);

  const [isShowUserInfoModal, setIsShowUserInfoModal] = useState(false);
  const [isShowCreateItemModal, setIsShowCreateItemModal] = useState(false);
  const [isShowUserItemsModal, setIsShowUserItemsModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleOpenUserInfoModal = () =>
    setIsShowUserInfoModal(!isShowUserInfoModal);
  const handleOpenCreateItemModal = () =>
    setIsShowCreateItemModal(!isShowCreateItemModal);
  const handleOpenUserItemsModal = () =>
    setIsShowUserItemsModal(!isShowUserItemsModal);

  const handleUserInfo = (key, value) =>
    setUserInfo((prevState) => ({ ...prevState, [key]: value }));

  useEffect(() => {}, [user]);

  const handleLogin = async () => {
    try {
      setLoggingIn(true);
      moralis.Web3.getSigningData = () =>
        "BitDiamond Authentication - Sign to use our dapps.";
      const user = await moralis.Web3.authenticate();
      setUser(user);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await moralis.User.logOut();
    setUser(undefined);
  };

  return (
    <header className="header">
      <div className="container">
        <BitDiamondLogo className="header__logo" />
        <BitDiamondLogoSmall className="header__logo0" />
        <div className="header__rest">
          {(userInfo.userAvatarImg || userAvatar) && user ? (
            <img
              onClick={() =>
                Gems.openUserInfo(user, handleOpenUserInfoModal, handleUserInfo)
              }
              className="user-portrait"
              width="50"
              height="50"
              src={userInfo.userAvatarImg || userAvatar}
              id="imgAvatar"
              alt="User Avatar"
            />
          ) : (
            <UserPortrait
              onClick={() =>
                Gems.openUserInfo(user, handleOpenUserInfoModal, handleUserInfo)
              }
            />
          )}
          {user ? (
            <CommonButton className="header__btn" onClick={handleLogin}>
              Connect
            </CommonButton>
          ) : (
            <>
              <CommonButton
                className="header__btn"
                onClick={handleOpenUserItemsModal}
              >
                My items
              </CommonButton>
              <CommonButton
                className="header__btn"
                onClick={handleOpenCreateItemModal}
              >
                Create
              </CommonButton>
            </>
          )}
        </div>
        <HeaderSliderMobileButton />
        <HeaderSliderMobileButton second />
        <HeaderSliderButton />
        <HeaderSliderButton second />
      </div>
      {isShowUserInfoModal && (
        <UserInfoModal
          user={user}
          userInfo={userInfo}
          setUserInfo={handleUserInfo}
          isActive={isShowUserInfoModal}
          onClose={handleOpenUserInfoModal}
          onLogout={handleLogout}
        />
      )}
      {isShowCreateItemModal && (
        <CreateItemModal
          user={user}
          userInfo={userInfo}
          isActive={isShowCreateItemModal}
          onClose={handleOpenCreateItemModal}
        />
      )}
      {isShowUserItemsModal && (
        <UserItemsModal
          user={user}
          userInfo={userInfo}
          isActive={isShowUserItemsModal}
          onClose={handleOpenUserItemsModal}
        />
      )}
    </header>
  );
};

export default Header;
