import React from "react";
import { Tabs, Tab } from "react-bootstrap";

export default class TabsComponent extends React.Component<any, any>{
    render() {
        return (
            <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                <Tab eventKey="home" title="Home">
                    <div className="app__content">
                        <p className="app__text">
                            ReactJS collapsible component using CSS transition.<br />
                            <br />Can be reversed before it completes. Try to double click the
                            toggle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                         ut aliquip ex ea commodo consequat.{" "}
                        </p>

                    </div>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <div className="app__content">

                        <img
                            className="app__image"
                            alt="random"
                            src="https://source.unsplash.com/user/erondu/600x200"
                        />
                    </div>
                </Tab>
                <Tab eventKey="contact" title="Contact" >
                    <div className="app__content">
                        <p className="app__text">
                            ReactJS collapsible component using CSS transition.<br />
                            <br />Can be reversed before it completes. Try to double click the
                            toggle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                         ut aliquip ex ea commodo consequat.{" "}
                        </p>
                        <img
                            className="app__image"
                            alt="random"
                            src="https://source.unsplash.com/user/erondu/600x200"
                        />
                    </div>
                </Tab>
            </Tabs>

        )
    }
}
