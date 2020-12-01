import * as React from 'react';
import styles from "./QRCodeComponent.module.scss";
import { IQRCodeComponentProps } from './IQRCodeComponentProps';

const QRCodeComponent:React.FunctionComponent<IQRCodeComponentProps> = (props) => {
    return (
        <div className={styles.qRCodeComponent}>
            
        </div>
    );
}

export default QRCodeComponent;