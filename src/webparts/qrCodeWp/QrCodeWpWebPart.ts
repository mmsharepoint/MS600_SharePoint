import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QrCodeWpWebPartStrings';
import QrCodeWp from './components/QrCodeWp';
import { IQrCodeWpProps } from './components/IQrCodeWpProps';

export interface IQrCodeWpWebPartProps {
  useMicrosoftGraph: boolean;
}

export default class QrCodeWpWebPart extends BaseClientSideWebPart<IQrCodeWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQrCodeWpProps> = React.createElement(
      QrCodeWp,
      {
        serviceScope: this.context.serviceScope,
        siteUrl: this.context.pageContext.site.absoluteUrl,
        useMicrosoftGraph: this.properties.useMicrosoftGraph,
        siteID: `${window.location.hostname},${this.context.pageContext.site.id},${this.context.pageContext.web.id}`
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('useMicrosoftGraph', {
                  label: strings.UseGraphFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
