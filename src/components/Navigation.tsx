import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { withTranslation } from 'react-i18next';
// import i18n from '../i18n';

export class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { city: 'pink', i18n: this.props.i18n }
        this.logout = this.logout.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    public logout() {
        localStorage.removeItem("access_token")
        this.setState({ true: true });
    }

    private changeLanguage(languageCode: string) {
        this.state.i18n.changeLanguage(languageCode);
    }

    public render() {
        return (
            <div>
                <Formik
                    initialValues={this.state}
                    enableReinitialize={true}
                    onSubmit={this.logout.bind(this.props)}
                    render={() =>
                        <Navbar bg="dark" expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                                        {this.state.i18n.t('HOME.HEADER_MENU.HOME')}
                                    </NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/customer">{this.state.i18n.t('HOME.HEADER_MENU.CUSTOMER')}</NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/employee">{this.state.i18n.t('HOME.HEADER_MENU.EMPLOYEE')}</NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/accordion">{this.state.i18n.t('HOME.HEADER_MENU.ACCORDION')}</NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/tabs">{this.state.i18n.t('HOME.HEADER_MENU.TABS')}</NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/custom-validation">{this.state.i18n.t('HOME.HEADER_MENU.CUSTOM_VALIDATION')}</NavLink>
                                </Nav>
                            </Navbar.Collapse>
                            <Button className="mr-3" onClick={this.changeLanguage.bind(this, 'en')}>EN</Button>
                            <Button className="mr-3" onClick={this.changeLanguage.bind(this, 'fr')}>FR</Button>
                            <Button variant="secondary" type="submit" hidden={localStorage.getItem("access_token") ? false : true} onClick={this.logout.bind(this)}>Log Out</Button>
                        </Navbar>}
                />

            </div>
        );
    }
}


export default withTranslation('home')(Navigation);
