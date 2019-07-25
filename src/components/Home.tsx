import React, { Component } from 'react';
import { Trans, withTranslation } from 'react-i18next';

export class Home extends Component<any, any> {
    render() {
        return (
            <div className="mat-5 d-flex justify-content-left">
                <h3>
                    <Trans>HOME.WELCOME_MESSAGE</Trans>
                </h3>
            </div>
        )
    }
}

withTranslation('translations')(Home);
