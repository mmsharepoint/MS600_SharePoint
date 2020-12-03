import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import QRCodeComponent from './QRCodeComponent';

export default class QRCodeDialog extends BaseDialog {
    public url: string;
    public render(): void {
        ReactDOM.render(<QRCodeComponent
            url={this.url}
            close={this.close}
        />, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }

    protected onAfterClose = (): void => {
        super.onAfterClose();
        // Clean up the element for the next dialog
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}