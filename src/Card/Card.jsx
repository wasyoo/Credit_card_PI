import React from 'react';
import styles from './card.module.css';


function Card({ cardNumber, validThru, name }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>CREDIT CARD</div>
      <img className={styles.chip} src="/assets/images/chip.png" alt="chip" />
      <div className={styles.card_content}>
        <div className={styles.card_info}>
          <div className={styles.card_number}>{cardNumber}</div>
          <div className={styles.expiration_date}>
            <div>{validThru}</div>
          </div>
          <div className={styles.card_holder}>{name}</div>
        </div>
        <div className={styles.payment_network} />
      </div>
  </div>
  )
}

Card.defaultProps = {
  cardNumber: ".... .... .... ....", 
  validThru: "12/23", 
  name: "Mohamed Ali"
}

export default Card;
