declare interface IQrCodeCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'QrCodeCommandSetStrings' {
  const strings: IQrCodeCommandSetStrings;
  export = strings;
}
