const { Offer } = require('../models');

const {
  serializeOffer
} = require('./serialization');

module.exports = (linnia) => {

  const {
    LinniaOfferMade
  } = linnia.events;

  syncNewOffer(LinniaOfferMade, linnia);
};

const watchEvent = (event, callback) => {
  event.watch(callback);
};

const syncNewOffer = (offerEvent, linnia) => {
  watchEvent(offerEvent, (event) => {
    args = event.returnValues;
    linnia.getRecord(args.dataHash)
      .then(record => {
        return Offer.findOrCreate({
            where: serializeOffer({args}, record)
          })
      });
  });
};
