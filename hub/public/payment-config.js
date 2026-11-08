/* ONE shared payment config. Fill the TODO placeholders, then deploy.
   Served publicly at https://mohammad-abujalboush.com/payment-config.js and loaded by every
   page that takes manual orders (currently E-Book). This file is PUBLIC: never put secrets here. */
window.PAYMENT_CONFIG = {
  whatsapp: "962776110639",                       // digits only, with country code
  cliq: {
    alias: "MOEBASIL1",                     // TODO: CliQ alias or mobile number
    accountName: "Mohammad Abu Jalboush",    // TODO
    note: "Send the exact amount and keep the transfer screenshot."
  },
  bank: {
    bankName: "YOUR_BANK_NAME",                   // TODO
    accountName: "YOUR_ACCOUNT_HOLDER_NAME",      // TODO
    iban: "YOUR_IBAN",                            // TODO
    swift: "YOUR_SWIFT_BIC",                      // TODO (optional, may be empty)
    note: "Use your order reference as the transfer description."
  },
  cash: {
    note: "YOUR_CASH_NOTE"                        // TODO e.g. cash in Amman, place and time arranged on WhatsApp
  }
};
