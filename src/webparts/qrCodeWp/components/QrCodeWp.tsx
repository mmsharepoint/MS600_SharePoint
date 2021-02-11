import * as React from 'react';
import { SPHttpClient, MSGraphClient, MSGraphClientFactory } from "@microsoft/sp-http";
import styles from './QrCodeWp.module.scss';
import { IQrCodeWpProps } from './IQrCodeWpProps';
import { IQrCodeWPState } from './IQrCodeWPState';
import { IDocument } from '../../../models/IDocument';
import QRCodeDialog from '../../../extensions/qrCode/components/QRCodeDialog';

export default class QrCodeWp extends React.Component<IQrCodeWpProps, IQrCodeWPState> {
  private spClient: SPHttpClient;
  private graphClient: MSGraphClient;
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }
  public componentDidMount() {
    if (this.props.useMicrosoftGraph) {
      this.props.serviceScope.consume(MSGraphClientFactory.serviceKey).getClient().then((client) => {
        this.graphClient = client;
        this.loadDocumentsWithGraph();
      });
    }
    else {
      this.spClient = this.props.serviceScope.consume(SPHttpClient.serviceKey);
      this.loadDocuments();
    } 
  }
  private loadDocuments() {
    const requestUrl = `${this.props.siteUrl}/_api/web/lists/GetByTitle('Dokumente')/items?$select=ID,FileLeafRef,EncodedAbsUrl`;
    this.spClient.get(requestUrl, SPHttpClient.configurations.v1)
    .then((response) => {
      response.json()
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
  private loadDocumentsWithGraph() {
    const requestUrl = `/sites/${this.props.siteID}/lists/54cb589a-f9fb-4890-b073-d034bc8b8029/items?$expand=fields`;
    this.graphClient
          .api(requestUrl)
          .get()
          .then((response) => {
            let documents: IDocument[] = [];
            response.value.forEach((v) => {
              documents.push({ title: v.fields.FileLeafRef, url: v.webUrl });
            });
            this.setState({            
              documents: documents            
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
            <ul>
              {docs}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
