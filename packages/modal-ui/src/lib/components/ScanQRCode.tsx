import React from "react";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";
import { ModalHeader } from "./ModalHeader";
import { CopyIcon } from "./CopyIcon";

interface ScanQRCodeProps {
  uri?: string;
  onCloseModal: () => void;
  handleOpenDefaultModal?: () => void;
}

async function formatQRCodeImage(data: string) {
  return await QRCode.toString(data, { margin: 0, type: "svg" });
}

export const ScanQRCode: React.FC<ScanQRCodeProps> = ({
  uri,
  onCloseModal,
  handleOpenDefaultModal,
}) => {
  const [notification, setNotification] = React.useState("");
  const [svg, setSvg] = React.useState("");

  const copyToClipboard = () => {
    if (!uri) {
      return;
    }
    const success = copy(uri);
    if (success) {
      setNotification("Copied to clipboard");
      setTimeout(() => setNotification(""), 1200);
    } else {
      setNotification("Failed to copy to clipboard");
      setTimeout(() => setNotification(""), 1200);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (uri) {
        setSvg(await formatQRCodeImage(uri));
      }
    })();
  }, [uri]);

  return (
    <section className="scan-qr-code">
      <ModalHeader
        title="Scan with Your Mobile Device"
        onCloseModal={onCloseModal}
      />

      <section className="qr-code">
        <div dangerouslySetInnerHTML={{ __html: svg }}></div>
        {notification ? (
          <div className="notification">{notification}</div>
        ) : (
          <div className="copy-btn" onClick={copyToClipboard}>
            <CopyIcon />
            Copy to clipboard
          </div>
        )}
      </section>
      <footer className="footer">
        <p>Prefer the official WalletConnect dialogue?</p>
        <button className="btn" onClick={handleOpenDefaultModal}>
          Open
        </button>
      </footer>
    </section>
  );
};
