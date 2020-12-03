import * as React from 'react';
import styles from './QrCodeWp.module.scss';
import { IQrCodeWpProps } from './IQrCodeWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class QrCodeWp extends React.Component<IQrCodeWpProps, {}> {
  public render(): React.ReactElement<IQrCodeWpProps> {
    return (
      <div className={ styles.qrCodeWp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
