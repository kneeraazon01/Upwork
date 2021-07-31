import React, { useState, useEffect } from "react";
import LoadingCards from '../../common/LoadingCards';
import CommonButton from '../../common/CommonButton';
import TokenCard from "../../components/TokenCard";

export default ({ selected, items, loading }) => {
    const [selectedInItems, setSelectedInItems] = useState(true);

    useEffect(() => {
        const sel = selected ? items.find(data => data.tokenData.class === selected.class) : false;
        setSelectedInItems(sel)
    }, [items, selected])

    return (
        <>
            { loading ? (
                <div className="card-list-flex treasure-box-list my-3">
                    <LoadingCards length={3}/> 
                </div>
            ): (
                <>
                <div className="card-list-flex treasure-box-list my-3">
                    {items.map((data, key) => (
                        <TokenCard
                            key={key} data={data} isShowPrize={true}
                            selected={selected ? selected.class === data.tokenData.class: false}/>
                    ))}

                </div>
                <div className="card-list-flex treasure-box-list my-3">
                    <div className="card-list-flex-item card-button-item">
                        <CommonButton disabled={!selectedInItems}>Claim Bounty</CommonButton>
                    </div>
                </div>
                </>
            )}
        </>
    )
}
