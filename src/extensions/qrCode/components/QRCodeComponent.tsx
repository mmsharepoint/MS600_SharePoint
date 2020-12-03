import * as React from 'react';
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { QRCanvas } from "qrcanvas-react";
import styles from "./QRCodeComponent.module.scss";
import { IQRCodeComponentProps } from './IQRCodeComponentProps';

const QRCodeComponent:React.FunctionComponent<IQRCodeComponentProps> = (props) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const image = new Image();
    image.src = "https://pbs.twimg.com/profile_images/1283075628334370816/4P5an4TK_bigger.png";
    image.onload = () => {
        setImageLoaded(true);
    };
    return (
        <div className={styles.qRCodeComponent}>
           <h1>QR Code Generator</h1>
           <div>{props.url}</div>
           <div className={styles.qrCanvas}>
               <QRCanvas options={{data: props.url, logo:{image: imageLoaded ? image : null }}} />
            </div>
           <DefaultButton text="Close" onClick={props.close} />
        </div>
    );
};

export default QRCodeComponent;