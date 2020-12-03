import * as React from 'react';
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import styles from "./QRCodeComponent.module.scss";
import { IQRCodeComponentProps } from './IQRCodeComponentProps';

const QRCodeComponent:React.FunctionComponent<IQRCodeComponentProps> = (props) => {
    return (
        <div className={styles.qRCodeComponent}>
           <h1>QR Code Generator</h1>
           <div>{props.url}</div>
           <DefaultButton text="Close" onClick={props.close} />
        </div>
    );
}

export default QRCodeComponent;