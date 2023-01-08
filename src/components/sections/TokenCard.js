import React from "react";
import '../css/style.css'
const TokenCard = ({ item, onClick, onCollect }) => {
  if (item.token_id > 21) {
    return (
      <center>
        <div className="ui fluid card" style={{ width: '400px', minWidth: '100px', display: 'flex', margin: '20px', height: '430px' }}>
          <div className="image">
            <img
              // onClick={onClick}
              style={{ maxHeight: "200px", objectFit: "cover" }}
              src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
              alt={item.description}
            />
          </div>
          <div className="content">
            <div className="header">{item.name}</div>
            <div className="right floated">
              Price:
              <div style={{ color: "black" }}>{item.amount}</div>
            </div>
            <div className="meta">{item.symbol}</div>
            <div className="description">
              {item.description.length > 15
                ? item.description.slice(0, 15) + "..."
                : item.description}
            </div>
          </div>

          <div className="extra content" style={{ marginBottom: '10px' }}>
            <span>
              Token ID:
              <div style={{ color: "black" }}>{item.token_id}</div>
            </span>
            <span className="right floated">
              <button className="ui basic button" onClick={onCollect}>
                {item.collectable ? "Buy" : "Sold Out"}
              </button>
            </span>
            <span>
              Upvotes :
              <div>hi</div>
            </span>

          </div>
        </div>
      </center>
    );
  }
};

export default TokenCard;
