import { ServiceScope } from "@microsoft/sp-core-library";

export interface IQrCodeWpProps {
  siteUrl: string;
  siteID: string;
  serviceScope: ServiceScope;
  useMicrosoftGraph: boolean;
}
