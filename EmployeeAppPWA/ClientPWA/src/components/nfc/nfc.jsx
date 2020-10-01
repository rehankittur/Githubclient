import React, { useState } from "react";
import Nfc from 'nfc-react-web';

function NfcScan() {
  const [nfcRead, setNfcRead] = useState(null);
  return (
    <div>
      <h1>Near Field Communications reader (NFC)</h1>
      <Nfc
        read={data => {
          setNfcRead(`Data read from tag: ${JSON.stringify(data)}`);
          //alert(`Data read from tag: ${JSON.stringify(data)}`);
        }}
        timeout={15} // time to keep trying to read tags, in seconds
      />
      <p>Read: {nfcRead}</p>
    </div>
  )
}

export default NfcScan; 