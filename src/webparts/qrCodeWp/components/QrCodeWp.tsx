import * as React from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import styles from './QrCodeWp.module.scss';
import { IQrCodeWpProps } from './IQrCodeWpProps';
import { IQrCodeWPState } from './IQrCodeWPState';
import { IDocument } from '../../../models/IDocument';
import QRCodeDialog from '../../../extensions/qrCode/components/QRCodeDialog';

export default class QrCodeWp extends React.Component<IQrCodeWpProps, IQrCodeWPState> {
  private spClient: SPHttpClient;
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }
  public componentDidMount() {
    this.spClient = this.props.serviceScope.consume(SPHttpClient.serviceKey);
    this.loadDocuments();
  }
  private loadDocuments() {
    const requestUrl = `${this.props.siteUrl}/_api/web/lists/GetByTitle('Dokumente')/items?$select=ID,FileLeafRef,EncodedAbsUrl`;
    this.spClient.get(requestUrl, SPHttpClient.configurations.v1)
    .then((response) => {
      return response.json()
        .then((jsonResponse) => {
          let documents: IDocument[] = [];
          jsonResponse.value.forEach((v) => {
            documents.push({ title: v.FileLeafRef, url: v.EncodedAbsUrl });
          });
          this.setState({            
            documents: documents            
          });
        });
    });
  }
  private openQRCode(url: string) {
    const dialog: QRCodeDialog = new QRCodeDialog();
    dialog.url = url;
    dialog.show();
  }
  public render(): React.ReactElement<IQrCodeWpProps> {
    const docs = this.state.documents.map((doc) => {
      return (
        <li className={styles.li} onClick={() => { this.openQRCode(doc.url); }}><span>{doc.title}</span></li>
      );
    });
    return (
      <div className={ styles.qrCodeWp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            {docs}
          </div>
        </div>
      </div>
    );
  }
}
